// DOM Elements
const ipInput = document.getElementById('ipInput');
const lookupButton = document.getElementById('lookupButton');
const clearButton = document.getElementById('clearButton');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');

// Result sections
const basicInfo = document.getElementById('basicInfo');
const subnetInfo = document.getElementById('subnetInfo');
const binaryInfo = document.getElementById('binaryInfo');
const additionalInfo = document.getElementById('additionalInfo');

// Result content areas
const basicInfoContent = document.getElementById('basicInfoContent');
const subnetInfoContent = document.getElementById('subnetInfoContent');
const binaryInfoContent = document.getElementById('binaryInfoContent');
const additionalInfoContent = document.getElementById('additionalInfoContent');

// Event listeners
lookupButton.addEventListener('click', performLookup);
clearButton.addEventListener('click', clearResults);
ipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performLookup();
    }
});

// Main lookup function
function performLookup() {
    const input = ipInput.value.trim();
    
    if (!input) {
        showError('Please enter an IP address or CIDR notation');
        return;
    }

    // Check if input contains CIDR notation
    const hasCIDR = input.includes('/');
    
    if (hasCIDR) {
        processCIDR(input);
    } else {
        processIP(input);
    }
}

// Process single IP address
function processIP(ip) {
    if (!isValidIPv4(ip)) {
        showError('Invalid IPv4 address format');
        return;
    }

    hideError();
    showResults();

    const ipType = getIPType(ip);
    const ipBinary = ipToBinary(ip);
    const ipDecimal = ipToDecimal(ip);

    // Display basic information
    displayBasicInfo(ip, ipType, ipDecimal);
    
    // Display binary representation
    displayBinaryInfo(ip, ipBinary);

    // Display additional information based on IP type
    displayAdditionalInfo(ip, ipType);

    // Hide subnet info for single IP
    subnetInfo.style.display = 'none';

    // Fetch geolocation for public IPs
    if (ipType.type === 'Public') {
        fetchGeolocation(ip);
    } else {
        // Hide geolocation section for non-public IPs
        const geolocationInfo = document.getElementById('geolocationInfo');
        if (geolocationInfo) {
            geolocationInfo.style.display = 'none';
        }
    }
}

// Process CIDR notation
function processCIDR(cidr) {
    const parts = cidr.split('/');
    const ip = parts[0];
    const prefix = parseInt(parts[1]);

    if (!isValidIPv4(ip)) {
        showError('Invalid IPv4 address in CIDR notation');
        return;
    }

    if (isNaN(prefix) || prefix < 0 || prefix > 32) {
        showError('Invalid CIDR prefix (must be 0-32)');
        return;
    }

    hideError();
    showResults();

    const ipType = getIPType(ip);
    const ipDecimal = ipToDecimal(ip);
    const subnetMask = cidrToSubnetMask(prefix);
    const subnetDetails = calculateSubnet(ip, prefix);

    // Display all information
    displayBasicInfo(ip, ipType, ipDecimal, prefix);
    displaySubnetInfo(subnetDetails, subnetMask, prefix);
    displayBinaryInfo(ip, ipToBinary(ip), subnetMask, ipToBinary(subnetMask));
    displayAdditionalInfo(ip, ipType);
}

// Validate IPv4 address
function isValidIPv4(ip) {
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(ipv4Regex);
    
    if (!match) return false;
    
    for (let i = 1; i <= 4; i++) {
        const octet = parseInt(match[i]);
        if (octet < 0 || octet > 255) return false;
    }
    
    return true;
}

// Convert IP to binary
function ipToBinary(ip) {
    return ip.split('.')
        .map(octet => parseInt(octet).toString(2).padStart(8, '0'))
        .join('.');
}

// Convert IP to decimal
function ipToDecimal(ip) {
    return ip.split('.')
        .reduce((acc, octet, index) => {
            return acc + (parseInt(octet) * Math.pow(256, 3 - index));
        }, 0);
}

// Convert decimal to IP
function decimalToIP(decimal) {
    return [
        (decimal >>> 24) & 255,
        (decimal >>> 16) & 255,
        (decimal >>> 8) & 255,
        decimal & 255
    ].join('.');
}

// Convert CIDR prefix to subnet mask
function cidrToSubnetMask(prefix) {
    const mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
    return decimalToIP(mask);
}

// Determine IP type
function getIPType(ip) {
    const octets = ip.split('.').map(Number);
    const firstOctet = octets[0];
    const secondOctet = octets[1];

    // Loopback
    if (firstOctet === 127) {
        return { type: 'Loopback', subtype: 'Reserved for loopback addresses', isPrivate: false };
    }

    // Private IP ranges (RFC 1918)
    if (firstOctet === 10) {
        return { type: 'Private', subtype: 'Class A Private (10.0.0.0/8)', isPrivate: true };
    }
    if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
        return { type: 'Private', subtype: 'Class B Private (172.16.0.0/12)', isPrivate: true };
    }
    if (firstOctet === 192 && secondOctet === 168) {
        return { type: 'Private', subtype: 'Class C Private (192.168.0.0/16)', isPrivate: true };
    }

    // Link-local
    if (firstOctet === 169 && secondOctet === 254) {
        return { type: 'Link-Local', subtype: 'APIPA (169.254.0.0/16)', isPrivate: false };
    }

    // Multicast
    if (firstOctet >= 224 && firstOctet <= 239) {
        return { type: 'Multicast', subtype: 'Reserved for multicast (224.0.0.0/4)', isPrivate: false };
    }

    // Reserved/Experimental
    if (firstOctet >= 240) {
        return { type: 'Reserved', subtype: 'Reserved for future use (240.0.0.0/4)', isPrivate: false };
    }

    // Broadcast
    if (ip === '255.255.255.255') {
        return { type: 'Broadcast', subtype: 'Limited broadcast address', isPrivate: false };
    }

    // Public IP
    return { type: 'Public', subtype: 'Routable on the internet', isPrivate: false };
}

// Calculate subnet details
function calculateSubnet(ip, prefix) {
    const ipDecimal = ipToDecimal(ip);
    const mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
    
    const networkDecimal = (ipDecimal & mask) >>> 0;
    const broadcastDecimal = (networkDecimal | ~mask) >>> 0;
    
    const firstHostDecimal = networkDecimal + 1;
    const lastHostDecimal = broadcastDecimal - 1;
    
    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = prefix === 31 ? 2 : (prefix === 32 ? 1 : totalHosts - 2);

    return {
        network: decimalToIP(networkDecimal),
        broadcast: decimalToIP(broadcastDecimal),
        firstHost: decimalToIP(firstHostDecimal),
        lastHost: decimalToIP(lastHostDecimal),
        totalHosts: totalHosts,
        usableHosts: usableHosts
    };
}

// Fetch geolocation data for public IPs
async function fetchGeolocation(ip) {
    const geolocationInfo = document.getElementById('geolocationInfo');
    const geolocationContent = document.getElementById('geolocationInfoContent');
    
    // Show loading state
    geolocationInfo.style.display = 'block';
    geolocationContent.innerHTML = '<p class="loading-text">Loading geolocation data...</p>';
    
    try {
        const response = await fetch(`https://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch geolocation data');
        }
        
        const data = await response.json();
        
        if (data.status === 'fail') {
            geolocationContent.innerHTML = `<p class="info-note">⚠ Geolocation lookup failed: ${data.message || 'Unknown error'}</p>`;
            return;
        }
        
        displayGeolocationInfo(data);
        
    } catch (error) {
        console.error('Geolocation error:', error);
        geolocationContent.innerHTML = '<p class="info-note">⚠ Unable to fetch geolocation data. This may be due to rate limiting or network issues.</p>';
    }
}

// Display functions
function displayBasicInfo(ip, ipType, ipDecimal, prefix = null) {
    let html = `
        <div class="result-item">
            <span class="result-label">IP Address:</span>
            <span class="result-value">${ip}</span>
        </div>
        <div class="result-item">
            <span class="result-label">IP Version:</span>
            <span class="result-value">IPv4</span>
        </div>
        <div class="result-item">
            <span class="result-label">Type:</span>
            <span class="result-value result-highlight">${ipType.type}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Classification:</span>
            <span class="result-value">${ipType.subtype}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Decimal:</span>
            <span class="result-value">${ipDecimal.toLocaleString()}</span>
        </div>
    `;

    if (prefix !== null) {
        html += `
            <div class="result-item">
                <span class="result-label">CIDR Notation:</span>
                <span class="result-value">${ip}/${prefix}</span>
            </div>
        `;
    }

    basicInfoContent.innerHTML = html;
    basicInfo.style.display = 'block';
}

function displaySubnetInfo(details, mask, prefix) {
    const html = `
        <div class="result-item">
            <span class="result-label">Network Address:</span>
            <span class="result-value">${details.network}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Broadcast Address:</span>
            <span class="result-value">${details.broadcast}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Subnet Mask:</span>
            <span class="result-value">${mask}</span>
        </div>
        <div class="result-item">
            <span class="result-label">First Usable Host:</span>
            <span class="result-value">${details.firstHost}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Last Usable Host:</span>
            <span class="result-value">${details.lastHost}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Addresses:</span>
            <span class="result-value">${details.totalHosts.toLocaleString()}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Usable Hosts:</span>
            <span class="result-value result-highlight">${details.usableHosts.toLocaleString()}</span>
        </div>
    `;

    subnetInfoContent.innerHTML = html;
    subnetInfo.style.display = 'block';
}

function displayBinaryInfo(ip, ipBinary, mask = null, maskBinary = null) {
    let html = `
        <div class="result-item">
            <span class="result-label">IP Binary:</span>
            <span class="result-value binary-value">${ipBinary}</span>
        </div>
    `;

    if (mask && maskBinary) {
        html += `
            <div class="result-item">
                <span class="result-label">Mask Binary:</span>
                <span class="result-value binary-value">${maskBinary}</span>
            </div>
        `;
    }

    binaryInfoContent.innerHTML = html;
    binaryInfo.style.display = 'block';
}

function displayAdditionalInfo(ip, ipType) {
    let additionalDetails = '';

    if (ipType.isPrivate) {
        additionalDetails = '<p class="info-note">✓ This is a private IP address. It cannot be routed on the public internet and is used for internal networks only.</p>';
    } else if (ipType.type === 'Public') {
        additionalDetails = '<p class="info-note">✓ This is a public IP address. It is routable on the internet.</p>';
    } else if (ipType.type === 'Loopback') {
        additionalDetails = '<p class="info-note">ℹ This is the loopback address used to test network software without physically transmitting packets.</p>';
    } else if (ipType.type === 'Link-Local') {
        additionalDetails = '<p class="info-note">ℹ This is an APIPA (Automatic Private IP Addressing) address, typically assigned when DHCP fails.</p>';
    } else if (ipType.type === 'Multicast') {
        additionalDetails = '<p class="info-note">ℹ This is a multicast address used for one-to-many communication.</p>';
    } else {
        additionalDetails = '<p class="info-note">⚠ This address is in a reserved or experimental range.</p>';
    }

    additionalInfoContent.innerHTML = additionalDetails;
    additionalInfo.style.display = 'block';
}

function displayGeolocationInfo(data) {
    const geolocationContent = document.getElementById('geolocationInfoContent');
    
    let html = '';
    
    if (data.country) {
        html += `
            <div class="result-item">
                <span class="result-label">Country:</span>
                <span class="result-value">${data.country} (${data.countryCode || 'N/A'})</span>
            </div>
        `;
    }
    
    if (data.regionName) {
        html += `
            <div class="result-item">
                <span class="result-label">Region:</span>
                <span class="result-value">${data.regionName}</span>
            </div>
        `;
    }
    
    if (data.city) {
        html += `
            <div class="result-item">
                <span class="result-label">City:</span>
                <span class="result-value">${data.city}</span>
            </div>
        `;
    }
    
    if (data.zip) {
        html += `
            <div class="result-item">
                <span class="result-label">Postal Code:</span>
                <span class="result-value">${data.zip}</span>
            </div>
        `;
    }
    
    if (data.isp) {
        html += `
            <div class="result-item">
                <span class="result-label">ISP:</span>
                <span class="result-value">${data.isp}</span>
            </div>
        `;
    }
    
    if (data.org) {
        html += `
            <div class="result-item">
                <span class="result-label">Organization:</span>
                <span class="result-value">${data.org}</span>
            </div>
        `;
    }
    
    if (data.as) {
        html += `
            <div class="result-item">
                <span class="result-label">AS Number:</span>
                <span class="result-value">${data.as}</span>
            </div>
        `;
    }
    
    if (data.timezone) {
        html += `
            <div class="result-item">
                <span class="result-label">Timezone:</span>
                <span class="result-value">${data.timezone}</span>
            </div>
        `;
    }
    
    if (data.lat !== undefined && data.lon !== undefined) {
        html += `
            <div class="result-item">
                <span class="result-label">Coordinates:</span>
                <span class="result-value">${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}</span>
            </div>
        `;
    }
    
    if (html === '') {
        html = '<p class="info-note">No geolocation data available for this IP address.</p>';
    }
    
    geolocationContent.innerHTML = html;
}

// Utility functions
function showResults() {
    resultsSection.style.display = 'block';
}

function hideError() {
    errorSection.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
    resultsSection.style.display = 'none';
}

function clearResults() {
    ipInput.value = '';
    resultsSection.style.display = 'none';
    errorSection.style.display = 'none';
    ipInput.focus();
}
