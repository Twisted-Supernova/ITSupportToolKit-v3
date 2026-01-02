// DOM Elements
const macInput = document.getElementById('macInput');
const lookupMacBtn = document.getElementById('lookupMacBtn');
const clearMacBtn = document.getElementById('clearMacBtn');
const macResults = document.getElementById('macResults');
const macError = document.getElementById('macError');
const vendorInfo = document.getElementById('vendorInfo');
const macFormats = document.getElementById('macFormats');
const technicalDetails = document.getElementById('technicalDetails');

// Event listeners
lookupMacBtn.addEventListener('click', lookupMAC);
clearMacBtn.addEventListener('click', clearAll);
macInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        lookupMAC();
    }
});

// Event delegation for dynamically created copy buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('copy-format-btn')) {
        const textToCopy = e.target.dataset.copyValue;
        copyFormat(textToCopy, e.target);
    }
});

// MAC address lookup
function lookupMAC() {
    const input = macInput.value.trim();
    
    if (!input) {
        showError('Please enter a MAC address');
        return;
    }
    
    // Clean and validate MAC address
    const cleanMAC = input.replace(/[^a-fA-F0-9]/g, '');
    
    if (cleanMAC.length !== 12) {
        showError('Invalid MAC address. Must be 12 hexadecimal characters (e.g., 00:1A:2B:3C:4D:5E)');
        return;
    }
    
    hideError();
    
    // Format MAC address
    const formattedMAC = cleanMAC.match(/.{2}/g).join(':').toUpperCase();
    
    // Get OUI (first 6 characters)
    const oui = cleanMAC.substring(0, 6).toUpperCase();
    
    // Lookup vendor
    const vendor = lookupVendor(oui);
    
    // Analyze MAC address
    const details = analyzeMAC(cleanMAC);
    
    // Display results
    displayResults(formattedMAC, vendor, details);
}

// Lookup vendor from OUI
function lookupVendor(oui) {
    const vendors = {
        '001A2B': 'Cisco Systems',
        '00055D': 'D-Link Corporation',
        '000C29': 'VMware, Inc.',
        '001B63': 'Apple, Inc.',
        '00259C': 'Hewlett Packard',
        '0019E3': 'Netgear',
        '001DD8': 'Microsoft Corporation',
        '001FF3': 'Apple, Inc.',
        '002566': 'Dell Inc.',
        '5C5948': 'Cisco Systems',
        'B4B686': 'Intel Corporate',
        '001CB0': 'ASUS',
        '00146C': 'Netgear',
        '001E8C': 'ASUSTek COMPUTER INC.',
        'F0EE10': 'Samsung Electronics',
        '001E2A': 'The Linksys Group, Inc.',
        '001AA0': 'Dell Inc.',
        '001CF0': 'Intel Corporate',
        '00226B': 'Dell Inc.',
        '002438': 'Intel Corporate'
    };
    
    return vendors[oui] || 'Unknown Vendor';
}

// Analyze MAC address
function analyzeMAC(mac) {
    const firstOctet = parseInt(mac.substring(0, 2), 16);
    
    // Check if multicast (bit 0 of first octet)
    const isMulticast = (firstOctet & 1) === 1;
    
    // Check if locally administered (bit 1 of first octet)
    const isLocallyAdministered = (firstOctet & 2) === 2;
    
    // Check for randomized MAC (common in mobile devices for privacy)
    const isRandomized = isLocallyAdministered;
    
    // Convert to binary
    const binary = mac.split('').map(char => 
        parseInt(char, 16).toString(2).padStart(4, '0')
    ).join(' ');
    
    return {
        addressType: isMulticast ? 'Multicast' : 'Unicast',
        administrationType: isLocallyAdministered ? 'Locally Administered' : 'Globally Unique (IEEE)',
        isRandomized: isRandomized,
        binary: binary
    };
}

// Display results
function displayResults(mac, vendor, details) {
    // Vendor Information
    vendorInfo.innerHTML = `
        <div class="vendor-card">
            <div class="vendor-name">${vendor}</div>
            <div class="mac-address">${mac}</div>
            <div class="oui-prefix">OUI Prefix: ${mac.substring(0, 8)}</div>
        </div>
    `;
    
    // MAC Address Formats
    const formats = [
        { name: 'Colon notation', value: mac },
        { name: 'Hyphen notation', value: mac.replace(/:/g, '-') },
        { name: 'Dot notation (Cisco)', value: mac.replace(/:/g, '').match(/.{4}/g).join('.') },
        { name: 'No separator', value: mac.replace(/:/g, '') },
        { name: 'Space notation', value: mac.replace(/:/g, ' ') }
    ];
    
    macFormats.innerHTML = formats.map(format => `
        <div class="format-item">
            <div class="format-name">${format.name}:</div>
            <div class="format-value-container">
                <code class="format-value">${format.value}</code>
                <button class="copy-format-btn" data-copy-value="${format.value}">Copy</button>
            </div>
        </div>
    `).join('');
    
    // Technical Details
    technicalDetails.innerHTML = `
        <div class="result-item">
            <span class="result-label">Address Type:</span>
            <span class="result-value">${details.addressType}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Administration:</span>
            <span class="result-value">${details.administrationType}</span>
        </div>
        ${details.isRandomized ? `
        <div class="result-item">
            <span class="result-label">Note:</span>
            <span class="result-value warning-text">Likely randomized MAC (privacy address)</span>
        </div>
        ` : ''}
        <div class="result-item">
            <span class="result-label">Binary:</span>
            <span class="result-value"><code class="binary-value">${details.binary}</code></span>
        </div>
    `;
    
    macResults.style.display = 'block';
}

// Copy format to clipboard
function copyFormat(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

// Show error
function showError(message) {
    macError.textContent = message;
    macError.style.display = 'block';
    macResults.style.display = 'none';
}

// Hide error
function hideError() {
    macError.style.display = 'none';
}

// Clear all
function clearAll() {
    macInput.value = '';
    macResults.style.display = 'none';
    hideError();
    macInput.focus();
}

// Focus input on load
window.addEventListener('load', () => {
    macInput.focus();
});
