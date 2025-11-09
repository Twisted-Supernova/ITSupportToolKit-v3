// Comprehensive port database
const portsDatabase = [
    // Well-known ports (0-1023)
    { port: 20, service: "FTP-Data", protocol: "TCP", description: "File Transfer Protocol - Data transfer" },
    { port: 21, service: "FTP", protocol: "TCP", description: "File Transfer Protocol - Control" },
    { port: 22, service: "SSH", protocol: "TCP", description: "Secure Shell - Remote login and command execution" },
    { port: 23, service: "Telnet", protocol: "TCP", description: "Telnet - Unencrypted text communications" },
    { port: 25, service: "SMTP", protocol: "TCP", description: "Simple Mail Transfer Protocol - Email transmission" },
    { port: 53, service: "DNS", protocol: "Both", description: "Domain Name System - Name resolution" },
    { port: 67, service: "DHCP Server", protocol: "UDP", description: "Dynamic Host Configuration Protocol - Server" },
    { port: 68, service: "DHCP Client", protocol: "UDP", description: "Dynamic Host Configuration Protocol - Client" },
    { port: 69, service: "TFTP", protocol: "UDP", description: "Trivial File Transfer Protocol" },
    { port: 80, service: "HTTP", protocol: "TCP", description: "Hypertext Transfer Protocol - Web traffic" },
    { port: 88, service: "Kerberos", protocol: "Both", description: "Kerberos authentication service" },
    { port: 110, service: "POP3", protocol: "TCP", description: "Post Office Protocol v3 - Email retrieval" },
    { port: 119, service: "NNTP", protocol: "TCP", description: "Network News Transfer Protocol" },
    { port: 123, service: "NTP", protocol: "UDP", description: "Network Time Protocol - Time synchronization" },
    { port: 135, service: "RPC", protocol: "TCP", description: "Remote Procedure Call - Windows RPC endpoint mapper" },
    { port: 137, service: "NetBIOS-NS", protocol: "UDP", description: "NetBIOS Name Service" },
    { port: 138, service: "NetBIOS-DGM", protocol: "UDP", description: "NetBIOS Datagram Service" },
    { port: 139, service: "NetBIOS-SSN", protocol: "TCP", description: "NetBIOS Session Service - SMB over NetBIOS" },
    { port: 143, service: "IMAP", protocol: "TCP", description: "Internet Message Access Protocol - Email retrieval" },
    { port: 161, service: "SNMP", protocol: "UDP", description: "Simple Network Management Protocol" },
    { port: 162, service: "SNMP Trap", protocol: "UDP", description: "SNMP Trap - Network management notifications" },
    { port: 389, service: "LDAP", protocol: "Both", description: "Lightweight Directory Access Protocol" },
    { port: 443, service: "HTTPS", protocol: "TCP", description: "HTTP Secure - Encrypted web traffic" },
    { port: 445, service: "SMB", protocol: "TCP", description: "Server Message Block - Windows file sharing" },
    { port: 465, service: "SMTPS", protocol: "TCP", description: "SMTP Secure - Encrypted email transmission" },
    { port: 514, service: "Syslog", protocol: "UDP", description: "System logging protocol" },
    { port: 587, service: "SMTP Submission", protocol: "TCP", description: "Email message submission" },
    { port: 636, service: "LDAPS", protocol: "TCP", description: "LDAP over SSL/TLS - Secure directory access" },
    { port: 993, service: "IMAPS", protocol: "TCP", description: "IMAP over SSL/TLS - Secure email retrieval" },
    { port: 995, service: "POP3S", protocol: "TCP", description: "POP3 over SSL/TLS - Secure email retrieval" },
    
    // Registered ports (1024-49151)
    { port: 1433, service: "MS SQL Server", protocol: "TCP", description: "Microsoft SQL Server database" },
    { port: 1434, service: "MS SQL Monitor", protocol: "UDP", description: "Microsoft SQL Server monitoring" },
    { port: 1521, service: "Oracle DB", protocol: "TCP", description: "Oracle database listener" },
    { port: 1723, service: "PPTP", protocol: "TCP", description: "Point-to-Point Tunneling Protocol - VPN" },
    { port: 3306, service: "MySQL", protocol: "TCP", description: "MySQL database server" },
    { port: 3389, service: "RDP", protocol: "TCP", description: "Remote Desktop Protocol - Windows remote access" },
    { port: 5060, service: "SIP", protocol: "Both", description: "Session Initiation Protocol - VoIP signaling" },
    { port: 5061, service: "SIP-TLS", protocol: "TCP", description: "SIP over TLS - Secure VoIP signaling" },
    { port: 5432, service: "PostgreSQL", protocol: "TCP", description: "PostgreSQL database server" },
    { port: 5985, service: "WinRM HTTP", protocol: "TCP", description: "Windows Remote Management over HTTP" },
    { port: 5986, service: "WinRM HTTPS", protocol: "TCP", description: "Windows Remote Management over HTTPS" },
    { port: 6379, service: "Redis", protocol: "TCP", description: "Redis in-memory database" },
    { port: 8080, service: "HTTP Alt", protocol: "TCP", description: "Alternative HTTP port - Web proxy/development" },
    { port: 8443, service: "HTTPS Alt", protocol: "TCP", description: "Alternative HTTPS port - Web proxy" },
    { port: 27017, service: "MongoDB", protocol: "TCP", description: "MongoDB database server" },
    
    // Microsoft-specific ports
    { port: 464, service: "Kerberos Password", protocol: "Both", description: "Kerberos change/set password" },
    { port: 593, service: "HTTP RPC", protocol: "Both", description: "HTTP RPC endpoint mapper" },
    { port: 3268, service: "Global Catalog", protocol: "TCP", description: "Active Directory Global Catalog" },
    { port: 3269, service: "Global Catalog SSL", protocol: "TCP", description: "Active Directory Global Catalog over SSL" },
    { port: 9389, service: "AD Web Services", protocol: "TCP", description: "Active Directory Web Services" },
    
    // Exchange Server
    { port: 25, service: "SMTP (Exchange)", protocol: "TCP", description: "Exchange mail submission" },
    { port: 110, service: "POP3 (Exchange)", protocol: "TCP", description: "Exchange POP3" },
    { port: 143, service: "IMAP (Exchange)", protocol: "TCP", description: "Exchange IMAP" },
    { port: 443, service: "OWA/ECP", protocol: "TCP", description: "Outlook Web Access / Exchange Control Panel" },
    { port: 587, service: "SMTP (Exchange)", protocol: "TCP", description: "Exchange authenticated SMTP submission" },
    
    // Common application ports
    { port: 21, service: "FTP", protocol: "TCP", description: "File transfer" },
    { port: 22, service: "SFTP", protocol: "TCP", description: "SSH File Transfer Protocol" },
    { port: 990, service: "FTPS", protocol: "TCP", description: "FTP over SSL/TLS" },
    { port: 3690, service: "SVN", protocol: "TCP", description: "Subversion version control" },
    { port: 5900, service: "VNC", protocol: "TCP", description: "Virtual Network Computing - Remote desktop" },
    { port: 8000, service: "HTTP Dev", protocol: "TCP", description: "Common development web server" },
    { port: 9090, service: "Web Admin", protocol: "TCP", description: "Common web admin interface" },
    
    // Gaming and streaming
    { port: 25565, service: "Minecraft", protocol: "TCP", description: "Minecraft game server" },
    { port: 27015, service: "Steam", protocol: "Both", description: "Steam game server" },
    
    // Monitoring and management
    { port: 161, service: "SNMP", protocol: "UDP", description: "Network device monitoring" },
    { port: 10050, service: "Zabbix Agent", protocol: "TCP", description: "Zabbix monitoring agent" },
    { port: 10051, service: "Zabbix Server", protocol: "TCP", description: "Zabbix monitoring server" },
    
    // Web services
    { port: 8008, service: "HTTP Alt", protocol: "TCP", description: "Alternative HTTP - IBM HTTP Server" },
    { port: 8888, service: "HTTP Alt", protocol: "TCP", description: "Alternative HTTP - Development" },
    
    // VPN
    { port: 500, service: "IKE", protocol: "UDP", description: "Internet Key Exchange - IPsec VPN" },
    { port: 1194, service: "OpenVPN", protocol: "Both", description: "OpenVPN" },
    { port: 1701, service: "L2TP", protocol: "UDP", description: "Layer 2 Tunneling Protocol" },
    { port: 4500, service: "IPsec NAT-T", protocol: "UDP", description: "IPsec NAT Traversal" },
    
    // Docker and containers
    { port: 2375, service: "Docker", protocol: "TCP", description: "Docker REST API (unencrypted)" },
    { port: 2376, service: "Docker TLS", protocol: "TCP", description: "Docker REST API (TLS)" },
    { port: 2377, service: "Docker Swarm", protocol: "TCP", description: "Docker Swarm cluster management" },
    
    // Message queues
    { port: 5672, service: "AMQP", protocol: "TCP", description: "Advanced Message Queuing Protocol - RabbitMQ" },
    { port: 9092, service: "Kafka", protocol: "TCP", description: "Apache Kafka message broker" },
    
    // Elasticsearch
    { port: 9200, service: "Elasticsearch", protocol: "TCP", description: "Elasticsearch HTTP API" },
    { port: 9300, service: "Elasticsearch Transport", protocol: "TCP", description: "Elasticsearch internal node communication" },
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearchButton = document.getElementById('clearSearchButton');
const protocolFilter = document.getElementById('protocolFilter');
const portsTableBody = document.getElementById('portsTableBody');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

// Initialize
let filteredPorts = [...portsDatabase];

// Event listeners
searchInput.addEventListener('input', filterPorts);
clearSearchButton.addEventListener('click', clearSearch);
protocolFilter.addEventListener('change', filterPorts);

// Initial display
displayPorts(portsDatabase);

// Filter ports based on search and protocol
function filterPorts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const protocol = protocolFilter.value;
    
    filteredPorts = portsDatabase.filter(port => {
        // Search filter
        const matchesSearch = 
            port.port.toString().includes(searchTerm) ||
            port.service.toLowerCase().includes(searchTerm) ||
            port.description.toLowerCase().includes(searchTerm);
        
        // Protocol filter
        const matchesProtocol = 
            protocol === 'all' ||
            port.protocol.toLowerCase() === protocol ||
            (protocol === 'both' && port.protocol === 'Both');
        
        return matchesSearch && matchesProtocol;
    });
    
    displayPorts(filteredPorts);
    updateResultsCount();
}

// Display ports in table
function displayPorts(ports) {
    if (ports.length === 0) {
        portsTableBody.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Sort by port number
    const sortedPorts = [...ports].sort((a, b) => a.port - b.port);
    
    portsTableBody.innerHTML = sortedPorts.map(port => `
        <tr>
            <td class="port-number">${port.port}</td>
            <td class="service-name">${port.service}</td>
            <td class="protocol-badge protocol-${port.protocol.toLowerCase()}">${port.protocol}</td>
            <td class="description">${port.description}</td>
        </tr>
    `).join('');
}

// Update results count
function updateResultsCount() {
    const total = portsDatabase.length;
    const showing = filteredPorts.length;
    
    if (searchInput.value.trim() === '' && protocolFilter.value === 'all') {
        resultsCount.textContent = `Showing all ${total} ports`;
    } else {
        resultsCount.textContent = `Showing ${showing} of ${total} ports`;
    }
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    protocolFilter.value = 'all';
    filterPorts();
    searchInput.focus();
}

// Initialize results count
updateResultsCount();
