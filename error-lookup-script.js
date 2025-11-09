// Windows Error Code Database
const errorDatabase = [
    // General Windows Errors
    {
        code: "0x80070005",
        decimal: -2147024891,
        name: "ERROR_ACCESS_DENIED",
        category: "security",
        description: "Access is denied",
        causes: ["Insufficient permissions", "File or registry key is in use", "Antivirus blocking access", "User account doesn't have required rights"],
        fixes: ["Run as administrator", "Check file/folder permissions", "Verify user has necessary rights", "Disable antivirus temporarily", "Check if file is locked by another process"]
    },
    {
        code: "0x80070002",
        decimal: -2147024894,
        name: "ERROR_FILE_NOT_FOUND",
        category: "general",
        description: "The system cannot find the file specified",
        causes: ["File has been deleted or moved", "Incorrect file path", "Network path unavailable", "Drive letter changed"],
        fixes: ["Verify file exists at specified location", "Check file path spelling", "Ensure network drives are connected", "Use full path instead of relative path"]
    },
    {
        code: "0x80070003",
        decimal: -2147024893,
        name: "ERROR_PATH_NOT_FOUND",
        category: "general",
        description: "The system cannot find the path specified",
        causes: ["Directory doesn't exist", "Network path unavailable", "Incorrect UNC path", "Drive not mapped"],
        fixes: ["Verify directory path", "Check network connectivity", "Map network drive properly", "Create missing directories"]
    },
    {
        code: "0x8007000E",
        decimal: -2147024882,
        name: "ERROR_OUTOFMEMORY",
        category: "general",
        description: "Not enough storage is available to complete this operation",
        causes: ["Insufficient RAM", "Memory leak in application", "Too many processes running", "Page file too small"],
        fixes: ["Close unnecessary applications", "Restart computer", "Increase page file size", "Add more RAM", "Check for memory leaks in applications"]
    },
    {
        code: "0x80070057",
        decimal: -2147024809,
        name: "ERROR_INVALID_PARAMETER",
        category: "general",
        description: "The parameter is incorrect",
        causes: ["Invalid command syntax", "Corrupted system files", "Incorrect registry values", "Wrong function arguments"],
        fixes: ["Check command syntax", "Run SFC /scannow", "Verify registry entries", "Update drivers", "Reinstall problematic application"]
    },

    // Windows Update Errors
    {
        code: "0x80070643",
        decimal: -2147023293,
        name: "ERROR_INSTALL_FAILURE",
        category: "update",
        description: "Fatal error during installation",
        causes: ["Corrupted update files", "Insufficient disk space", "Conflicting software", "System file corruption"],
        fixes: ["Run Windows Update Troubleshooter", "Clear Windows Update cache", "Check disk space", "Run DISM and SFC", "Disable antivirus temporarily"]
    },
    {
        code: "0x800F0922",
        decimal: -2146498782,
        name: "CBS_E_INSTALLERS_FAILED",
        category: "update",
        description: "Couldn't install update",
        causes: ["Pending restart required", "Corrupted component store", "Update requires previous updates", "Disk space issues"],
        fixes: ["Restart computer", "Run DISM /RestoreHealth", "Install prerequisite updates", "Free up disk space", "Reset Windows Update components"]
    },
    {
        code: "0x80240034",
        decimal: -2145107916,
        name: "WU_E_DOWNLOAD_FAILED",
        category: "update",
        description: "Update failed to download",
        causes: ["Network connectivity issues", "Windows Update service problems", "Corrupted update cache", "Proxy settings"],
        fixes: ["Check internet connection", "Restart Windows Update service", "Clear update cache", "Check proxy settings", "Run network troubleshooter"]
    },
    {
        code: "0x8024402F",
        decimal: -2145107921,
        name: "WU_E_PT_ECP_SUCCEEDED_WITH_ERRORS",
        category: "update",
        description: "External cab file processing completed with errors",
        causes: ["Network timeout", "Corrupted download", "Windows Update service issues"],
        fixes: ["Retry update", "Reset Windows Update components", "Check network stability", "Download update manually"]
    },

    // Network Errors
    {
        code: "0x800704CF",
        decimal: -2147023665,
        name: "ERROR_NETWORK_UNREACHABLE",
        category: "network",
        description: "The network location cannot be reached",
        causes: ["Network adapter disabled", "DNS issues", "Firewall blocking", "Network cable unplugged", "Wi-Fi disconnected"],
        fixes: ["Check network adapter status", "Verify network cable", "Reset TCP/IP stack", "Check DNS settings", "Disable firewall temporarily", "Restart router"]
    },
    {
        code: "0x80070035",
        decimal: -2147024843,
        name: "ERROR_BAD_NETPATH",
        category: "network",
        description: "The network path was not found",
        causes: ["Computer not reachable", "Network discovery disabled", "SMB protocol disabled", "Firewall blocking file sharing"],
        fixes: ["Enable network discovery", "Enable SMB 1.0/2.0/3.0", "Check firewall rules", "Verify computer name", "Restart Server service"]
    },
    {
        code: "0x80070043",
        decimal: -2147024829,
        name: "ERROR_BAD_NET_NAME",
        category: "network",
        description: "The network name cannot be found",
        causes: ["Share doesn't exist", "Incorrect share name", "Network path unavailable", "DNS resolution failure"],
        fixes: ["Verify share name", "Check network connectivity", "Test with IP address instead of hostname", "Flush DNS cache"]
    },

    // Security & Permissions
    {
        code: "0x80070522",
        decimal: -2147023582,
        name: "ERROR_PRIVILEGE_NOT_HELD",
        category: "security",
        description: "A required privilege is not held by the client",
        causes: ["User doesn't have necessary privileges", "UAC blocking operation", "Missing administrator rights"],
        fixes: ["Run as administrator", "Add user to required security group", "Grant necessary privileges via Group Policy", "Check User Rights Assignment"]
    },
    {
        code: "0x80070056",
        decimal: -2147024810,
        name: "ERROR_INVALID_PASSWORD",
        category: "security",
        description: "The password is invalid",
        causes: ["Incorrect password", "Account locked", "Password expired", "Caps Lock enabled"],
        fixes: ["Verify password is correct", "Check Caps Lock", "Reset password", "Unlock account", "Check account expiration"]
    },
    {
        code: "0x8007052E",
        decimal: -2147023570,
        name: "ERROR_LOGON_FAILURE",
        category: "security",
        description: "Logon failure: unknown user name or bad password",
        causes: ["Incorrect credentials", "Account disabled", "Domain controller unreachable", "Time sync issues"],
        fixes: ["Verify username and password", "Check if account is enabled", "Synchronize time with domain", "Check network connectivity to DC"]
    },

    // Active Directory Errors
    {
        code: "0x8007054B",
        decimal: -2147023541,
        name: "ERROR_NO_SUCH_DOMAIN",
        category: "activedirectory",
        description: "The specified domain either does not exist or could not be contacted",
        causes: ["Domain controller unavailable", "DNS misconfiguration", "Network connectivity issues", "Domain trust broken"],
        fixes: ["Verify DNS settings", "Check network connectivity to DC", "Test DC reachability", "Rejoin domain if necessary", "Check domain trust relationships"]
    },
    {
        code: "0x80072EE2",
        decimal: -2147012894,
        name: "ERROR_WINHTTP_TIMEOUT",
        category: "network",
        description: "The operation timed out",
        causes: ["Network latency", "Server not responding", "Firewall blocking", "DNS resolution slow"],
        fixes: ["Check network connectivity", "Verify server is online", "Check firewall rules", "Test DNS resolution", "Increase timeout values"]
    },

    // Group Policy Errors
    {
        code: "0x8007000D",
        decimal: -2147024883,
        name: "ERROR_INVALID_DATA",
        category: "groupolicy",
        description: "The data is invalid",
        causes: ["Corrupted Group Policy", "Invalid registry values", "Malformed XML in policy", "System file corruption"],
        fixes: ["Run gpupdate /force", "Delete and recreate GPO", "Check event logs for details", "Run SFC /scannow", "Verify GPO XML syntax"]
    },
    {
        code: "0x80004005",
        decimal: -2147467259,
        name: "E_FAIL",
        category: "general",
        description: "Unspecified error",
        causes: ["Component registration issue", "Corrupted system files", "Permission problems", "COM+ issues"],
        fixes: ["Re-register affected DLLs", "Run SFC and DISM", "Check permissions", "Reset COM+ catalog", "Check event logs for specific details"]
    },

    // Additional Common Errors
    {
        code: "0x80070490",
        decimal: -2147023728,
        name: "ERROR_NOT_FOUND",
        category: "general",
        description: "Element not found",
        causes: ["Corrupted CBS database", "Missing system files", "Registry corruption", "Component store issues"],
        fixes: ["Run DISM /RestoreHealth", "Run SFC /scannow", "Check Windows Component Store", "Perform in-place upgrade"]
    },
    {
        code: "0x800F081F",
        decimal: -2146498529,
        name: "CBS_E_SOURCE_MISSING",
        category: "update",
        description: "Source files could not be found",
        causes: ["Missing installation media", "Corrupted Windows image", "Network source unavailable"],
        fixes: ["Specify installation media as source", "Run DISM with /Source parameter", "Download required files", "Use Windows installation ISO"]
    },
    {
        code: "0x800F0831",
        decimal: -2146498511,
        name: "CBS_E_STORE_CORRUPTION",
        category: "update",
        description: "CBS store is corrupted",
        causes: ["Component store corruption", "System file damage", "Failed updates"],
        fixes: ["Run DISM /RestoreHealth", "Run SFC /scannow", "Use DISM with /Source", "Perform in-place upgrade if severe"]
    },
    {
        code: "0x80070020",
        decimal: -2147024864,
        name: "ERROR_SHARING_VIOLATION",
        category: "general",
        description: "The process cannot access the file because it is being used by another process",
        causes: ["File locked by another program", "Antivirus scanning file", "System process using file"],
        fixes: ["Close programs using the file", "Use handle.exe to identify locking process", "Restart in Safe Mode", "Disable antivirus temporarily", "Restart computer"]
    },
    {
        code: "0x80070032",
        decimal: -2147024846,
        name: "ERROR_NOT_SUPPORTED",
        category: "general",
        description: "The request is not supported",
        causes: ["Feature not available in Windows version", "Hardware doesn't support feature", "Driver issue"],
        fixes: ["Check Windows version requirements", "Update drivers", "Verify hardware compatibility", "Enable required Windows features"]
    },
    {
        code: "0x800706BA",
        decimal: -2147023174,
        name: "RPC_S_SERVER_UNAVAILABLE",
        category: "network",
        description: "The RPC server is unavailable",
        causes: ["RPC service not running", "Firewall blocking RPC", "Network issues", "Remote computer offline"],
        fixes: ["Start RPC service", "Check firewall RPC ports", "Verify network connectivity", "Restart Remote Procedure Call service", "Check if remote computer is online"]
    },
    {
        code: "0x80070422",
        decimal: -2147023838,
        name: "ERROR_SERVICE_DISABLED",
        category: "general",
        description: "The service cannot be started because it is disabled",
        causes: ["Service manually disabled", "Group Policy disabled service", "Service dependencies disabled"],
        fixes: ["Enable the service in Services.msc", "Check Group Policy settings", "Enable service dependencies", "Set startup type to Automatic"]
    },
];

// DOM Elements
const errorSearchInput = document.getElementById('errorSearchInput');
const clearErrorSearchBtn = document.getElementById('clearErrorSearchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const errorResultsContainer = document.getElementById('errorResultsContainer');
const errorResultsCount = document.getElementById('errorResultsCount');
const noErrorResults = document.getElementById('noErrorResults');

// State
let filteredErrors = [...errorDatabase];

// Event listeners
errorSearchInput.addEventListener('input', filterErrors);
clearErrorSearchBtn.addEventListener('click', clearSearch);
categoryFilter.addEventListener('change', filterErrors);

// Initial display
displayErrors(errorDatabase);
updateResultsCount();

// Filter errors
function filterErrors() {
    const searchTerm = errorSearchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    
    filteredErrors = errorDatabase.filter(error => {
        // Search filter
        const matchesSearch = 
            error.code.toLowerCase().includes(searchTerm) ||
            error.name.toLowerCase().includes(searchTerm) ||
            error.description.toLowerCase().includes(searchTerm) ||
            error.decimal.toString().includes(searchTerm) ||
            error.causes.some(cause => cause.toLowerCase().includes(searchTerm)) ||
            error.fixes.some(fix => fix.toLowerCase().includes(searchTerm));
        
        // Category filter
        const matchesCategory = category === 'all' || error.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayErrors(filteredErrors);
    updateResultsCount();
}

// Display errors
function displayErrors(errors) {
    if (errors.length === 0) {
        errorResultsContainer.innerHTML = '';
        noErrorResults.style.display = 'block';
        return;
    }
    
    noErrorResults.style.display = 'none';
    
    errorResultsContainer.innerHTML = errors.map(error => `
        <div class="error-card">
            <div class="error-card-header">
                <div class="error-codes">
                    <span class="error-code-hex">${error.code}</span>
                    <span class="error-code-decimal">(${error.decimal})</span>
                </div>
                <span class="error-category-badge">${getCategoryLabel(error.category)}</span>
            </div>
            <h3 class="error-name">${error.name}</h3>
            <p class="error-description">${error.description}</p>
            
            <div class="error-details">
                <div class="error-section">
                    <h4>Common Causes:</h4>
                    <ul>
                        ${error.causes.map(cause => `<li>${cause}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="error-section">
                    <h4>Suggested Fixes:</h4>
                    <ol>
                        ${error.fixes.map(fix => `<li>${fix}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        general: 'General',
        update: 'Windows Update',
        network: 'Network',
        security: 'Security',
        activedirectory: 'Active Directory',
        groupolicy: 'Group Policy'
    };
    return labels[category] || category;
}

// Update results count
function updateResultsCount() {
    const total = errorDatabase.length;
    const showing = filteredErrors.length;
    
    if (errorSearchInput.value.trim() === '' && categoryFilter.value === 'all') {
        errorResultsCount.textContent = `Showing all ${total} error codes`;
    } else {
        errorResultsCount.textContent = `Showing ${showing} of ${total} error codes`;
    }
}

// Clear search
function clearSearch() {
    errorSearchInput.value = '';
    categoryFilter.value = 'all';
    filterErrors();
    errorSearchInput.focus();
}
