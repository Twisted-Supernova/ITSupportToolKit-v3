// DOM Elements
const whoisQuery = document.getElementById('whoisQuery');
const lookupWhoisBtn = document.getElementById('lookupWhoisBtn');
const clearWhoisBtn = document.getElementById('clearWhoisBtn');
const whoisResults = document.getElementById('whoisResults');
const whoisError = document.getElementById('whoisError');
const whoisLoading = document.getElementById('whoisLoading');

// Event listeners
lookupWhoisBtn.addEventListener('click', lookupWHOIS);
clearWhoisBtn.addEventListener('click', clearResults);
whoisQuery.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') lookupWHOIS();
});

// Main WHOIS lookup function
async function lookupWHOIS() {
    let domain = whoisQuery.value.trim();
    
    if (!domain) {
        showError('Please enter a domain name');
        return;
    }
    
    // Clean domain input
    domain = cleanDomain(domain);
    
    if (!isValidDomain(domain)) {
        showError('Please enter a valid domain name (e.g., google.com)');
        return;
    }
    
    hideError();
    showLoading();
    
    try {
        const data = await queryWHOIS(domain);
        displayResults(data, domain);
        hideLoading();
    } catch (error) {
        showError(`WHOIS lookup failed: ${error.message}`);
        hideLoading();
    }
}

// Clean domain input
function cleanDomain(domain) {
    // Remove protocol
    domain = domain.replace(/^https?:\/\//i, '');
    // Remove www
    domain = domain.replace(/^www\./i, '');
    // Remove trailing slash and path
    domain = domain.split('/')[0];
    // Remove port
    domain = domain.split(':')[0];
    
    return domain.toLowerCase();
}

// Validate domain format
function isValidDomain(domain) {
    const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
    return domainRegex.test(domain);
}

// Query WHOIS using whois.freeaiapi.xyz API (free public API)
async function queryWHOIS(domain) {
    // Using a free WHOIS API
    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_free&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`;
    
    // Note: This is a free tier API with limited requests
    // For production, you'd want your own API key from whoisxmlapi.com
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.ErrorMessage) {
            throw new Error(data.ErrorMessage.msg || 'WHOIS lookup failed');
        }
        
        return data.WhoisRecord;
    } catch (error) {
        // Fallback: Show informational message about WHOIS
        throw new Error('WHOIS API unavailable. For full WHOIS data, use command: whois ' + domain);
    }
}

// Display WHOIS results
function displayResults(data, domain) {
    if (!data) {
        showError('No WHOIS data available for this domain');
        return;
    }
    
    const registrar = data.registrarName || 'Not available';
    const createdDate = data.createdDate ? new Date(data.createdDate).toLocaleDateString('en-GB') : 'Not available';
    const updatedDate = data.updatedDate ? new Date(data.updatedDate).toLocaleDateString('en-GB') : 'Not available';
    const expiresDate = data.expiresDate ? new Date(data.expiresDate).toLocaleDateString('en-GB') : 'Not available';
    const status = data.status || ['Not available'];
    const nameServers = data.nameServers?.hostNames || [];
    const registrant = data.registrant || {};
    
    whoisResults.innerHTML = `
        <div class="result-card">
            <h3>Domain Information</h3>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">Domain:</span>
                    <span class="result-value"><strong>${domain}</strong></span>
                </div>
                <div class="result-item">
                    <span class="result-label">Registrar:</span>
                    <span class="result-value">${registrar}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Created Date:</span>
                    <span class="result-value">${createdDate}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Updated Date:</span>
                    <span class="result-value">${updatedDate}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Expires Date:</span>
                    <span class="result-value">${expiresDate}</span>
                </div>
            </div>
        </div>
        
        ${nameServers.length > 0 ? `
        <div class="result-card">
            <h3>Name Servers</h3>
            <div class="whois-list">
                ${nameServers.map(ns => `<div class="whois-list-item"><code>${ns}</code></div>`).join('')}
            </div>
        </div>
        ` : ''}
        
        <div class="result-card">
            <h3>Domain Status</h3>
            <div class="whois-list">
                ${(Array.isArray(status) ? status : [status]).map(s => `<div class="whois-list-item">${s}</div>`).join('')}
            </div>
        </div>
        
        ${registrant.organization || registrant.name ? `
        <div class="result-card">
            <h3>Registrant Information</h3>
            <div class="result-grid">
                ${registrant.organization ? `
                <div class="result-item">
                    <span class="result-label">Organization:</span>
                    <span class="result-value">${registrant.organization}</span>
                </div>
                ` : ''}
                ${registrant.name ? `
                <div class="result-item">
                    <span class="result-label">Name:</span>
                    <span class="result-value">${registrant.name}</span>
                </div>
                ` : ''}
                ${registrant.country ? `
                <div class="result-item">
                    <span class="result-label">Country:</span>
                    <span class="result-value">${registrant.country}</span>
                </div>
                ` : ''}
            </div>
        </div>
        ` : `
        <div class="result-card">
            <h3>Registrant Information</h3>
            <p class="privacy-notice">⚠️ Registrant information is redacted due to privacy protection (GDPR/WHOIS Privacy)</p>
        </div>
        `}
        
        <div class="whois-command-box">
            <h4>Command Line Alternative:</h4>
            <code class="command-line">whois ${domain}</code>
            <p class="command-hint">Run this command in your terminal for complete WHOIS data</p>
        </div>
    `;
    
    whoisResults.style.display = 'block';
}

// Show loading
function showLoading() {
    whoisLoading.style.display = 'block';
    whoisResults.style.display = 'none';
    hideError();
}

// Hide loading
function hideLoading() {
    whoisLoading.style.display = 'none';
}

// Show error
function showError(message) {
    whoisError.textContent = message;
    whoisError.style.display = 'block';
    whoisResults.style.display = 'none';
}

// Hide error
function hideError() {
    whoisError.style.display = 'none';
}

// Clear results
function clearResults() {
    whoisQuery.value = '';
    whoisResults.style.display = 'none';
    hideError();
    hideLoading();
    whoisQuery.focus();
}

// Focus input on load
window.addEventListener('load', () => {
    whoisQuery.focus();
});
