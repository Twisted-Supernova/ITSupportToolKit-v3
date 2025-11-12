// DOM Elements
const targetPath = document.getElementById('targetPath');
const userGroup = document.getElementById('userGroup');
const permissionType = document.getElementById('permissionType');
const basicPermissions = document.getElementById('basicPermissions');
const advancedPermissions = document.getElementById('advancedPermissions');
const actionType = document.getElementById('actionType');
const inheritanceFlag = document.getElementById('inheritanceFlag');
const inheritanceType = document.getElementById('inheritanceType');
const generateCommand = document.getElementById('generateCommand');
const clearNtfsForm = document.getElementById('clearNtfsForm');
const commandOutput = document.getElementById('commandOutput');
const generatedCommand = document.getElementById('generatedCommand');
const copyCommand = document.getElementById('copyCommand');
const commandExplanation = document.getElementById('commandExplanation');

// Event listeners
permissionType.addEventListener('change', togglePermissionType);
generateCommand.addEventListener('click', buildCommand);
clearNtfsForm.addEventListener('click', clearForm);
copyCommand.addEventListener('click', copyToClipboard);

// Toggle between basic and advanced permissions
function togglePermissionType() {
    if (permissionType.value === 'basic') {
        basicPermissions.style.display = 'block';
        advancedPermissions.style.display = 'none';
    } else {
        basicPermissions.style.display = 'none';
        advancedPermissions.style.display = 'block';
    }
}

// Build icacls command
function buildCommand() {
    const path = targetPath.value.trim();
    const user = userGroup.value.trim();
    
    // Validation
    if (!path) {
        alert('Please enter a file or folder path');
        targetPath.focus();
        return;
    }
    
    if (!user) {
        alert('Please enter a user or group name');
        userGroup.focus();
        return;
    }
    
    // Get permissions
    let permissions = '';
    if (permissionType.value === 'basic') {
        const selected = document.querySelector('input[name="basicPerm"]:checked');
        permissions = selected ? selected.value : 'R';
    } else {
        const selected = Array.from(document.querySelectorAll('.adv-perm:checked'))
            .map(cb => cb.value);
        if (selected.length === 0) {
            alert('Please select at least one advanced permission');
            return;
        }
        permissions = selected.join(',');
    }
    
    // Build command
    let command = 'icacls';
    
    // Add path (with quotes if it contains spaces or already has quotes)
    const quotedPath = path.includes(' ') && !path.startsWith('"') ? `"${path}"` : path;
    command += ` ${quotedPath}`;
    
    // Add action
    const action = actionType.value;
    command += ` ${action}`;
    
    // Add user/group and permissions (except for /remove)
    if (action !== '/remove') {
        // Add inheritance if enabled
        let permString = '';
        if (inheritanceFlag.checked) {
            permString = `${user}:(${inheritanceType.value})(${permissions})`;
        } else {
            permString = `${user}:(${permissions})`;
        }
        command += ` ${permString}`;
    } else {
        command += ` ${user}`;
    }
    
    // Add /t flag for recursive if inheritance is enabled
    if (inheritanceFlag.checked && action !== '/remove') {
        command += ' /t';
    }
    
    // Display command
    generatedCommand.textContent = command;
    commandOutput.style.display = 'block';
    
    // Generate explanation
    generateExplanation(action, permissions, user, inheritanceFlag.checked, inheritanceType.value);
    
    // Scroll to output
    commandOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Generate command explanation
function generateExplanation(action, permissions, user, hasInheritance, inheritType) {
    let explanation = '<ul>';
    
    // Action explanation
    const actionExplanations = {
        '/grant': 'Grants permissions (adds to existing)',
        '/grant:r': 'Grants permissions (replaces all existing permissions)',
        '/deny': 'Explicitly denies permissions (overrides allow)',
        '/remove': 'Removes all permissions for the specified user/group'
    };
    explanation += `<li><strong>Action:</strong> ${actionExplanations[action]}</li>`;
    
    // User/group
    explanation += `<li><strong>Target:</strong> ${user}</li>`;
    
    // Permissions
    if (action !== '/remove') {
        const permExplanations = {
            'F': 'Full Control - All permissions',
            'M': 'Modify - Read, write, delete',
            'RX': 'Read & Execute - View and run files',
            'R': 'Read - View files only',
            'W': 'Write - Create and modify files',
            'D': 'Delete',
            'RC': 'Read Control - Read security info',
            'WDAC': 'Write DAC - Change permissions',
            'WO': 'Write Owner - Take ownership',
            'S': 'Synchronize - Use for multithreading',
            'RD': 'Read Data - View file contents',
            'WD': 'Write Data - Modify file contents',
            'AD': 'Append Data - Add to files',
            'REA': 'Read Attributes - View file attributes',
            'WEA': 'Write Attributes - Change file attributes',
            'X': 'Execute - Run programs',
            'DC': 'Delete Child - Delete subfolders/files'
        };
        
        const permList = permissions.split(',');
        explanation += '<li><strong>Permissions:</strong><ul>';
        permList.forEach(perm => {
            if (permExplanations[perm]) {
                explanation += `<li>${permExplanations[perm]}</li>`;
            }
        });
        explanation += '</ul></li>';
        
        // Inheritance
        if (hasInheritance) {
            const inheritExplanations = {
                'OI,CI': 'Applied to this folder, all subfolders, and files',
                'OI': 'Applied to this folder and files only',
                'CI': 'Applied to this folder and subfolders only',
                'IO,OI,CI': 'Applied to subfolders and files only (not this folder)',
                'IO,CI': 'Applied to subfolders only',
                'IO,OI': 'Applied to files only'
            };
            explanation += `<li><strong>Inheritance:</strong> ${inheritExplanations[inheritType]}</li>`;
        } else {
            explanation += '<li><strong>Inheritance:</strong> Not applied (this folder only)</li>';
        }
    }
    
    explanation += '</ul>';
    commandExplanation.innerHTML = explanation;
}

// Copy command to clipboard
function copyToClipboard() {
    const command = generatedCommand.textContent;
    
    navigator.clipboard.writeText(command).then(() => {
        const originalText = copyCommand.textContent;
        copyCommand.textContent = 'Copied!';
        copyCommand.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            copyCommand.textContent = originalText;
            copyCommand.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy command');
        console.error('Copy failed:', err);
    });
}

// Clear form
function clearForm() {
    targetPath.value = '';
    userGroup.value = '';
    permissionType.value = 'basic';
    actionType.value = '/grant';
    inheritanceFlag.checked = false;
    inheritanceType.value = 'OI,CI';
    
    // Reset basic permissions
    const firstBasic = document.querySelector('input[name="basicPerm"]');
    if (firstBasic) firstBasic.checked = true;
    
    // Uncheck all advanced permissions
    document.querySelectorAll('.adv-perm').forEach(cb => cb.checked = false);
    
    // Show basic permissions
    togglePermissionType();
    
    commandOutput.style.display = 'none';
    targetPath.focus();
}

// Focus first input on load
window.addEventListener('load', () => {
    targetPath.focus();
});
