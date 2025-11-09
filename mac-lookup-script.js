// OUI Database - Common vendors (first 6 hex digits identify manufacturer)
const ouiDatabase = {
    '00:00:0C': 'Cisco Systems',
    '00:00:5E': 'IANA (Internet Assigned Numbers Authority)',
    '00:01:42': 'Cisco Systems',
    '00:01:43': 'Cisco Systems',
    '00:03:6B': 'Cisco Systems',
    '00:05:73': 'Cisco Systems',
    '00:0A:41': 'Cisco Systems',
    '00:0A:B7': 'Cisco Systems',
    '00:0C:29': 'VMware, Inc.',
    '00:0D:3A': 'Microsoft Corporation',
    '00:0F:1F': 'Dell Inc.',
    '00:11:22': 'Ciena Corporation',
    '00:12:79': 'Cisco-Linksys',
    '00:13:72': 'Dell Inc.',
    '00:14:22': 'Dell Inc.',
    '00:15:5D': 'Microsoft Corporation',
    '00:16:3E': 'Xensource, Inc.',
    '00:17:A4': 'D-Link Corporation',
    '00:19:5B': 'Hewlett Packard',
    '00:1A:4D': 'Hewlett Packard',
    '00:1A:A0': 'Dell Inc.',
    '00:1B:21': 'Intel Corporate',
    '00:1C:23': 'Cisco Systems',
    '00:1D:09': 'Cisco-Linksys',
    '00:1E:58': 'Apple, Inc.',
    '00:1F:5B': 'Apple, Inc.',
    '00:21:5C': 'Hewlett Packard',
    '00:22:19': 'Cisco Systems',
    '00:23:24': 'Apple, Inc.',
    '00:24:D7': 'Intel Corporate',
    '00:25:00': 'Apple, Inc.',
    '00:25:90': 'Super Micro Computer',
    '00:26:08': 'Apple, Inc.',
    '00:50:56': 'VMware, Inc.',
    '00:50:C2': 'IEEE 802.1 Committee',
    '00:80:48': 'Compex',
    '00:A0:C9': 'Intel Corporation',
    '00:C0:9F': 'Quanta Computer Inc.',
    '00:D0:2D': 'Intel Corporation',
    '00:E0:4C': 'Realtek Semiconductor Corp.',
    '08:00:27': 'PCS Systemtechnik GmbH (Oracle VirtualBox)',
    '08:00:30': 'Royal Melbourne Inst of Tech',
    '0C:9D:92': 'Hewlett Packard',
    '10:00:5A': 'IBM Corp',
    '10:62:E5': 'Hewlett Packard',
    '14:10:9F': 'Hewlett Packard',
    '18:03:73': 'Cisco Systems',
    '18:A9:05': 'Hewlett Packard',
    '1C:6F:65': 'Cisco Systems',
    '20:4C:03': 'Hewlett Packard',
    '28:92:4A': 'Hewlett Packard',
    '2C:27:D7': 'Cisco Systems',
    '30:B5:C2': 'Hewlett Packard',
    '34:64:A9': 'Hewlett Packard',
    '3C:D9:2B': 'Hewlett Packard',
    '40:A8:F0': 'Hewlett Packard',
    '44:1E:A1': 'Cisco Systems',
    '48:DF:37': 'Hewlett Packard',
    '4C:D9:8F': 'Hewlett Packard',
    '50:46:5D': 'AzureWave Technology Inc.',
    '54:75:D0': 'Cisco Systems',
    '58:20:B1': 'Cisco Systems',
    '5C:5E:AB': 'Cisco Systems',
    '60:73:5C': 'Cisco Systems',
    '64:00:6A': 'Cisco Systems',
    '68:05:CA': 'Cisco Systems',
    '6C:41:6A': 'Cisco Systems',
    '70:CA:9B': 'Cisco Systems',
    '74:A0:2F': 'Cisco Systems',
    '78:2B:CB': 'Hewlett Packard',
    '78:DA:6E': 'Dell Inc.',
    '7C:0E:CE': 'Cisco Systems',
    '80:1F:12': 'Cisco Systems',
    '84:78:AC': 'Cisco Systems',
    '88:53:2E': 'Cisco Systems',
    '8C:60:4F': 'Cisco Systems',
    '90:E2:BA': 'Hewlett Packard',
    '94:57:A5': 'Cisco Systems',
    '98:4B:E1': 'Cisco Systems',
    '9C:37:F4': 'Cisco Systems',
    'A0:36:BC': 'Apple, Inc.',
    'A0:F8:49': 'Dell Inc.',
    'A4:5E:60': 'Cisco Systems',
    'A8:20:66': 'Cisco Systems',
    'AC:4A:67': 'Cisco Systems',
    'B0:7D:64': 'Cisco Systems',
    'B4:A9:5A': 'Cisco Systems',
    'B8:27:EB': 'Raspberry Pi Foundation',
    'B8:BE:BF': 'Cisco Systems',
    'BC:16:65': 'Cisco Systems',
    'C0:62:6B': 'Cisco Systems',
    'C4:71:54': 'Cisco Systems',
    'C8:00:84': 'Cisco Systems',
    'C8:4C:75': 'Cisco Systems',
    'CC:D5:39': 'Cisco Systems',
    'D0:57:4C': 'Cisco Systems',
    'D4:A9:28': 'Cisco Systems',
    'D8:24:BD': 'Cisco Systems',
    'DC:7B:94': 'Cisco Systems',
    'E0:2F:6D': 'Cisco Systems',
    'E4:C7:22': 'Cisco Systems',
    'E8:04:62': 'Hewlett Packard',
    'E8:B7:48': 'Cisco Systems',
    'EC:1D:8B': 'Cisco Systems',
    'F0:29:29': 'Cisco Systems',
    'F4:4E:05': 'Cisco Systems',
    'F8:72:EA': 'Cisco Systems',
    'FC:5B:39': 'Cisco Systems'
};

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
    if (e.key === 'Enter') lookupMAC();
});

// Main lookup function
function lookupMAC() {
    const input = macInput.value.trim();
    
    if (!input) {
        showError('Please enter a MAC address');
        return;
    }
    
    // Parse and validate MAC address
    const mac = parseMAC(input);
    
    if (!mac) {
        showError('Invalid MAC address format. Please use AA:BB:CC:DD:EE:FF, AA-BB-CC-DD-EE-FF, or AABBCCDDEEFF');
        return;
    }
    
    // Get OUI (first 3 bytes)
    const oui = mac.substring(0, 8).toUpperCase();
    
    // Lookup vendor
    const vendor = lookupVendor(oui);
    
    // Get technical details
    const details = getMACDetails(mac);
    
    // Display results
    displayResults(mac, oui, vendor, details);
}

// Parse MAC address from various formats
function parseMAC(input) {
    // Remove all separators and whitespace
    let cleaned = input.replace(/[:\-\s\.]/g, '').toUpperCase();
    
    // Check if valid hex and correct length
    if (!/^[0-9A-F]{12}$/.test(cleaned)) {
        return null;
    }
    
    // Format as colon-separated
    return cleaned.match(/.{1,2}/g).join(':');
}

// Lookup vendor from OUI database
function lookupVendor(oui) {
    // Check exact match
    if (ouiDatabase[oui]) {
        return ouiDatabase[oui];
    }
    
    // Check if it's a locally administered address
    const firstByte = parseInt(oui.substring(0, 2), 16);
    if (firstByte & 0x02) {
        return 'Locally Administered (No vendor assigned)';
    }
    
    return 'Unknown Vendor (not in database)';
}

// Get technical details about MAC address
function getMACDetails(mac) {
    const firstByte = parseInt(mac.substring(0, 2), 16);
    
    // Check multicast bit (bit 0 of first byte)
    const isMulticast = (firstByte & 0x01) !== 0;
    
    // Check local/universal bit (bit 1 of first byte)
    const isLocal = (firstByte & 0x02) !== 0;
    
    // Check if likely randomized (common in privacy features)
    const isRandomized = isLocal && mac !== '02:00:00:00:00:00';
    
    return {
        addressType: isMulticast ? 'Multicast' : 'Unicast',
        administrationType: isLocal ? 'Locally Administered (LAA)' : 'Universally Administered (UAA)',
        isRandomized: isRandomized,
        binary: macToBinary(mac)
    };
}

// Convert MAC to binary representation
function macToBinary(mac) {
    return mac.split(':')
        .map(byte => parseInt(byte, 16).toString(2).padStart(8, '0'))
        .join(' ');
}

// Display results
function displayResults(mac, oui, vendor, details) {
    hideError();
    
    // Vendor Information
    vendorInfo.innerHTML = `
        <div class="result-item">
            <span class="result-label">OUI Prefix:</span>
            <span class="result-value"><code>${oui}</code></span>
        </div>
        <div class="result-item">
            <span class="result-label">Vendor/Manufacturer:</span>
            <span class="result-value vendor-name">${vendor}</span>
        </div>
    `;
    
    // MAC Address Formats
    const formats = [
        { name: 'Colon notation', value: mac },
        { name: 'Hyphen notation', value: mac.replace(/:/g, '-') },
        { name: 'No separator', value: mac.replace(/:/g, '') },
        { name: 'Dot notation (Cisco)', value: mac.replace(/:/g, '').match(/.{1,4}/g).join('.') },
        { name: 'Space notation', value: mac.replace(/:/g, ' ') }
    ];
    
    macFormats.innerHTML = formats.map(format => `
        <div class="format-item">
            <div class="format-name">${format.name}:</div>
            <div class="format-value-container">
                <code class="format-value">${format.value}</code>
                <button class="copy-format-btn" onclick="copyFormat('${format.value}', this)">Copy</button>
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
