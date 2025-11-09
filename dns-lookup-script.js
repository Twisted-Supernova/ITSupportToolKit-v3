// DOM Elements
const dnsQuery = document.getElementById('dnsQuery');
const recordType = document.getElementById('recordType');
const lookupDnsBtn = document.getElementById('lookupDnsBtn');
const lookupAllBtn = document.getElementById('lookupAllBtn');
const clearDnsBtn = document.getElementById('clearDnsBtn');
const dnsResults = document.getElementById('dnsResults');
const dnsError = document.getElementById('dnsError');
const dnsLoading = document.getElementById('dnsLoading');

// DNS record type codes
const DNS_TYPES = {
    'A': 1,
    'AAAA': 28,
    'MX': 15,
    'TXT': 16,
    'CNAME': 5,
    'NS': 2,
    'SOA': 6,
    'PTR': 12
};

// Event listeners
lookupDnsBtn.addEventListener('click', () => lookupDNS(false));
lookupAllBtn.addEventListener('click', () => lookupDNS(true));
clearDnsBtn.addEventListener('click', clearResults);
dnsQuery.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') lookupDNS(false);
});

// Main DNS lookup function
async function lookupDNS(lookupAll = false) {
    const query = dnsQuery.value.trim();
    
    if (!query) {
        showError('Please enter a domain name or IP address');
        return;
    }
    
    hideError();
    showLoading();
    
    try {
        if (lookupAll) {
            await lookupAllRecords(query);
        } else {
            const type = recordType.value;
            await lookupSingleRecord(query, type);
        }
    } catch (error) {
        showError(`Lookup failed: ${error.message}`);
        hideLoading();
    }
}

// Lookup single record type
async function lookupSingleRecord(domain, type) {
    try {
        const records = await queryDNS(domain, type);
        displayResults([{ type, records, domain }]);
        hideLoading();
    } catch (error) {
        throw error;
    }
}

// Lookup all common record types
async function lookupAllRecords(domain) {
    const types = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS'];
    const results = [];
    
    for (const type of types) {
        try {
            const records = await queryDNS(domain, type);
            if (records.length > 0) {
                results.push({ type, records, domain });
            }
        } catch (error) {
            // Continue with other record types if one fails
            console.error(`Failed to lookup ${type}:`, error);
        }
    }
    
    if (results.length === 0) {
        showError('No DNS records found for this domain');
        hideLoading();
        return;
    }
    
    displayResults(results);
    hideLoading();
}

// Query DNS using DNS-over-HTTPS (Google Public DNS)
async function queryDNS(name, type) {
    const typeCode = DNS_TYPES[type];
    
    // Use Google DNS-over-HTTPS API
    const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${typeCode}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`DNS query failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Status !== 0) {
        // DNS error codes
        const errorMessages = {
            1: 'Format error',
            2: 'Server failure',
            3: 'Name error (domain does not exist)',
            4: 'Not implemented',
            5: 'Refused'
        };
        throw new Error(errorMessages[data.Status] || `DNS error: ${data.Status}`);
    }
    
    if (!data.Answer || data.Answer.length === 0) {
        return [];
    }
    
    return data.Answer;
}

// Display DNS results
function displayResults(results) {
    dnsResults.innerHTML = results.map(result => {
        const recordsHtml = formatRecords(result.records, result.type);
        
        return `
            <div class="result-card">
                <div class="result-card-header">
                    <h3>${result.type} Records</h3>
                    <span class="record-count">${result.records.length} record${result.records.length !== 1 ? 's' : ''}</span>
                </div>
                <div class="dns-records">
                    ${recordsHtml}
                </div>
            </div>
        `;
    }).join('');
    
    dnsResults.style.display = 'block';
}

// Format records based on type
function formatRecords(records, type) {
    return records.map(record => {
        let displayValue = record.data;
        let additionalInfo = '';
        
        switch (type) {
            case 'A':
            case 'AAAA':
                displayValue = `<code class="dns-value">${record.data}</code>`;
                additionalInfo = `<span class="dns-ttl">TTL: ${record.TTL}s</span>`;
                break;
                
            case 'MX':
                // MX records have priority and hostname
                const mxParts = record.data.split(' ');
                const priority = mxParts[0];
                const mailServer = mxParts.slice(1).join(' ');
                displayValue = `<code class="dns-value">${mailServer}</code>`;
                additionalInfo = `<span class="dns-priority">Priority: ${priority}</span><span class="dns-ttl">TTL: ${record.TTL}s</span>`;
                break;
                
            case 'TXT':
                displayValue = `<code class="dns-value dns-txt">${record.data}</code>`;
                additionalInfo = `<span class="dns-ttl">TTL: ${record.TTL}s</span>`;
                break;
                
            case 'CNAME':
            case 'NS':
            case 'PTR':
                displayValue = `<code class="dns-value">${record.data}</code>`;
                additionalInfo = `<span class="dns-ttl">TTL: ${record.TTL}s</span>`;
                break;
                
            case 'SOA':
                displayValue = `<code class="dns-value dns-soa">${record.data}</code>`;
                additionalInfo = `<span class="dns-ttl">TTL: ${record.TTL}s</span>`;
                break;
        }
        
        return `
            <div class="dns-record-item">
                <div class="dns-record-value">${displayValue}</div>
                <div class="dns-record-info">${additionalInfo}</div>
            </div>
        `;
    }).join('');
}

// Show loading
function showLoading() {
    dnsLoading.style.display = 'block';
    dnsResults.style.display = 'none';
    hideError();
}

// Hide loading
function hideLoading() {
    dnsLoading.style.display = 'none';
}

// Show error
function showError(message) {
    dnsError.textContent = message;
    dnsError.style.display = 'block';
    dnsResults.style.display = 'none';
}

// Hide error
function hideError() {
    dnsError.style.display = 'none';
}

// Clear results
function clearResults() {
    dnsQuery.value = '';
    recordType.value = 'A';
    dnsResults.style.display = 'none';
    hideError();
    hideLoading();
    dnsQuery.focus();
}

// Focus input on load
window.addEventListener('load', () => {
    dnsQuery.focus();
});
