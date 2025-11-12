// DOM Elements
const pathInput = document.getElementById('pathInput');
const userInput = document.getElementById('userInput');
const permissionType = document.getElementById('permissionType');
const permissionLevel = document.getElementById('permissionLevel');
const inheritanceOption = document.getElementById('inheritanceOption');
const resetInheritance = document.getElementById('resetInheritance');
const protectInheritance = document.getElementById('protectInheritance');
const generateCommand = document.getElementById('generateCommand');
const clearBuilder = document.getElementById('clearBuilder');
const commandOutput = document.getElementById('commandOutput');
const generatedCommand = document.getElementById('generatedCommand');
const copyCommand = document.getElementById('copyCommand');

// Event listeners
generateCommand.addEventListener('click', buildCommand);
clearBuilder.addEventListener('click', clearForm);
copyCommand.addEventListener('click', copyToClipboard);

// Build icacls command
function buildCommand() {
    const path = pathInput.value.trim();
    const user = userInput.value.trim();
    
    // Validation
    if (!path) {
        alert('Please enter a file or folder path');
        pathInput.focus();
        return;
    }
    
    if (!user) {
        alert('Please enter a user or group name');
        userInput.focus();
        return;
    }
    
    // Build command parts
    let command = 'icacls ';
    
    // Add path (with quotes if it contains spaces or already has quotes)
    if (path.includes(' ') && !path.startsWith('"')) {
        command += `"${path}"`;
    } else {
        command += path;
    }
    
    // Add permission modification
    const permType = permissionType.value;
    const permLevel = permissionLevel.value;
    const inheritance = inheritanceOption.value;
    
    if (permType === 'grant') {
        command += ` /grant "${user}:${inheritance ? inheritance : '(OI)(CI)'}${permLevel}"`;
    } else if (permType === 'deny') {
        command += ` /deny "${user}:${inheritance ? inheritance : '(OI)(CI)'}${permLevel}"`;
    } else if (permType === 'remove') {
        command += ` /remove "${user}"`;
    }
    
    // Add inheritance options
    if (resetInheritance.checked) {
        command += ' /reset';
    }
    
    if (protectInheritance.checked) {
        command += ' /inheritance:r';
    }
    
    // Add /T flag if selected (for recursive)
    if (inheritance === '/T') {
        command += ' /T';
    }
    
    // Display command
    generatedCommand.textContent = command;
    commandOutput.style.display = 'block';
    
    // Scroll to output
    commandOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
    pathInput.value = '';
    userInput.value = '';
    permissionType.value = 'grant';
    permissionLevel.value = 'F';
    inheritanceOption.value = '';
    resetInheritance.checked = false;
    protectInheritance.checked = false;
    commandOutput.style.display = 'none';
    pathInput.focus();
}

// Focus on load
window.addEventListener('load', () => {
    pathInput.focus();
});
