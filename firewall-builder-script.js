// DOM Elements
const osTypeRadios = document.querySelectorAll('input[name="osType"]');
const ruleName = document.getElementById('ruleName');
const ruleAction = document.getElementById('ruleAction');
const ruleDirection = document.getElementById('ruleDirection');
const ruleProtocol = document.getElementById('ruleProtocol');
const rulePort = document.getElementById('rulePort');
const remoteIP = document.getElementById('remoteIP');
const ruleProfile = document.getElementById('ruleProfile');
const programPath = document.getElementById('programPath');
const portGroup = document.getElementById('portGroup');
const profileGroup = document.getElementById('profileGroup');
const programGroup = document.getElementById('programGroup');
const generateFirewallCommand = document.getElementById('generateFirewallCommand');
const clearFirewallForm = document.getElementById('clearFirewallForm');
const firewallCommandOutput = document.getElementById('firewallCommandOutput');
const generatedFirewallCommand = document.getElementById('generatedFirewallCommand');
const copyFirewallCommand = document.getElementById('copyFirewallCommand');
const firewallCommandExplanation = document.getElementById('firewallCommandExplanation');
const firewallUsageInstructions = document.getElementById('firewallUsageInstructions');
const additionalCommandsList = document.getElementById('additionalCommandsList');

let currentOS = 'windows';

// Event listeners
osTypeRadios.forEach(radio => {
    radio.addEventListener('change', handleOSChange);
});
ruleProtocol.addEventListener('change', handleProtocolChange);
generateFirewallCommand.addEventListener('click', buildFirewallCommand);
clearFirewallForm.addEventListener('click', clearForm);
copyFirewallCommand.addEventListener('click', copyToClipboard);

// Handle OS change
function handleOSChange(e) {
    currentOS = e.target.value;
    
    // Show/hide Windows-specific fields
    if (currentOS === 'windows') {
        profileGroup.style.display = 'block';
        programGroup.style.display = 'block';
    } else {
        profileGroup.style.display = 'none';
        programGroup.style.display = 'none';
    }
    
    // Clear output when switching OS
    firewallCommandOutput.style.display = 'none';
}

// Handle protocol change
function handleProtocolChange() {
    const protocol = ruleProtocol.value;
    
    // Hide port field for ICMP
    if (protocol === 'icmpv4') {
        portGroup.style.display = 'none';
        rulePort.value = '';
    } else {
        portGroup.style.display = 'block';
    }
}

// Build firewall command
function buildFirewallCommand() {
    const name = ruleName.value.trim();
    
    // Validation
    if (!name) {
        alert('Please enter a rule name');
        ruleName.focus();
        return;
    }
    
    let command = '';
    
    if (currentOS === 'windows') {
        command = buildWindowsCommand();
    } else {
        command = buildLinuxCommand();
    }
    
    // Display command
    generatedFirewallCommand.textContent = command;
    firewallCommandOutput.style.display = 'block';
    
    // Generate explanation and instructions
    generateExplanation();
    generateUsageInstructions();
    generateAdditionalCommands();
    
    // Scroll to output
    firewallCommandOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Build Windows netsh command
function buildWindowsCommand() {
    let cmd = 'netsh advfirewall firewall add rule';
    
    // Rule name
    cmd += ` name="${ruleName.value.trim()}"`;
    
    // Direction
    cmd += ` dir=${ruleDirection.value}`;
    
    // Action
    cmd += ` action=${ruleAction.value}`;
    
    // Protocol
    const protocol = ruleProtocol.value;
    if (protocol === 'icmpv4') {
        cmd += ' protocol=icmpv4:8,any';
    } else {
        cmd += ` protocol=${protocol}`;
    }
    
    // Port (if applicable and provided)
    const port = rulePort.value.trim();
    if (port && protocol !== 'icmpv4' && protocol !== 'any') {
        const portType = ruleDirection.value === 'in' ? 'localport' : 'remoteport';
        cmd += ` ${portType}=${port}`;
    }
    
    // Remote IP
    const remoteIPValue = remoteIP.value.trim();
    if (remoteIPValue) {
        const ipParam = ruleDirection.value === 'in' ? 'remoteip' : 'remoteip';
        cmd += ` ${ipParam}=${remoteIPValue}`;
    }
    
    // Profile
    if (ruleProfile.value !== 'any') {
        cmd += ` profile=${ruleProfile.value}`;
    }
    
    // Program path
    const program = programPath.value.trim();
    if (program) {
        cmd += ` program="${program}"`;
    }
    
    return cmd;
}

// Build Linux ufw command
function buildLinuxCommand() {
    let cmd = 'sudo ufw';
    
    // Action
    cmd += ` ${ruleAction.value}`;
    
    // Direction (ufw uses 'in' and 'out')
    if (ruleDirection.value === 'in') {
        cmd += ' in';
    } else {
        cmd += ' out';
    }
    
    // Port and protocol
    const port = rulePort.value.trim();
    const protocol = ruleProtocol.value;
    
    if (protocol === 'icmpv4') {
        cmd += ' proto icmp';
    } else if (port && protocol !== 'any') {
        cmd += ` ${port}/${protocol}`;
    } else if (protocol !== 'any') {
        cmd += ` proto ${protocol}`;
    }
    
    // Remote IP
    const remoteIPValue = remoteIP.value.trim();
    if (remoteIPValue) {
        if (ruleDirection.value === 'in') {
            cmd += ` from ${remoteIPValue}`;
        } else {
            cmd += ` to ${remoteIPValue}`;
        }
    }
    
    // Add comment with rule name
    cmd += ` comment "${ruleName.value.trim()}"`;
    
    return cmd;
}

// Generate explanation
function generateExplanation() {
    let explanation = '<ul>';
    
    explanation += `<li><strong>Operating System:</strong> ${currentOS === 'windows' ? 'Windows' : 'Linux'}</li>`;
    explanation += `<li><strong>Rule Name:</strong> ${ruleName.value.trim()}</li>`;
    explanation += `<li><strong>Action:</strong> ${ruleAction.value === 'allow' ? 'Allow traffic' : 'Block/Deny traffic'}</li>`;
    explanation += `<li><strong>Direction:</strong> ${ruleDirection.value === 'in' ? 'Inbound (incoming)' : 'Outbound (outgoing)'}</li>`;
    
    const protocol = ruleProtocol.value;
    const protocolNames = {
        'tcp': 'TCP',
        'udp': 'UDP',
        'any': 'Any protocol',
        'icmpv4': 'ICMP (ping)'
    };
    explanation += `<li><strong>Protocol:</strong> ${protocolNames[protocol]}</li>`;
    
    const port = rulePort.value.trim();
    if (port && protocol !== 'icmpv4') {
        explanation += `<li><strong>Port(s):</strong> ${port}</li>`;
    }
    
    const remoteIPValue = remoteIP.value.trim();
    if (remoteIPValue) {
        explanation += `<li><strong>Remote IP:</strong> ${remoteIPValue}</li>`;
    } else {
        explanation += `<li><strong>Remote IP:</strong> Any</li>`;
    }
    
    if (currentOS === 'windows') {
        if (ruleProfile.value !== 'any') {
            explanation += `<li><strong>Profile:</strong> ${ruleProfile.value.charAt(0).toUpperCase() + ruleProfile.value.slice(1)}</li>`;
        }
        
        const program = programPath.value.trim();
        if (program) {
            explanation += `<li><strong>Program:</strong> ${program}</li>`;
        }
    }
    
    explanation += '</ul>';
    firewallCommandExplanation.innerHTML = explanation;
}

// Generate usage instructions
function generateUsageInstructions() {
    let instructions = '';
    
    if (currentOS === 'windows') {
        instructions = `
            <ol>
                <li>Open <strong>Command Prompt</strong> or <strong>PowerShell</strong> as Administrator</li>
                <li>Copy and paste the generated command</li>
                <li>Press Enter to create the firewall rule</li>
                <li>Verify with: <code>netsh advfirewall firewall show rule name="${ruleName.value.trim()}"</code></li>
            </ol>
        `;
    } else {
        instructions = `
            <ol>
                <li>Open a terminal</li>
                <li>Copy and paste the generated command (sudo password required)</li>
                <li>Press Enter to create the firewall rule</li>
                <li>Verify with: <code>sudo ufw status numbered</code></li>
            </ol>
        `;
    }
    
    firewallUsageInstructions.innerHTML = instructions;
}

// Generate additional commands
function generateAdditionalCommands() {
    let commands = '';
    
    if (currentOS === 'windows') {
        commands = `
            <div class="additional-command-item">
                <strong>List all firewall rules:</strong>
                <code>netsh advfirewall firewall show rule name=all</code>
            </div>
            <div class="additional-command-item">
                <strong>Delete this rule:</strong>
                <code>netsh advfirewall firewall delete rule name="${ruleName.value.trim()}"</code>
            </div>
            <div class="additional-command-item">
                <strong>Disable firewall:</strong>
                <code>netsh advfirewall set allprofiles state off</code>
            </div>
            <div class="additional-command-item">
                <strong>Enable firewall:</strong>
                <code>netsh advfirewall set allprofiles state on</code>
            </div>
        `;
    } else {
        commands = `
            <div class="additional-command-item">
                <strong>List all rules:</strong>
                <code>sudo ufw status numbered</code>
            </div>
            <div class="additional-command-item">
                <strong>Delete rule by number:</strong>
                <code>sudo ufw delete [rule_number]</code>
            </div>
            <div class="additional-command-item">
                <strong>Enable firewall:</strong>
                <code>sudo ufw enable</code>
            </div>
            <div class="additional-command-item">
                <strong>Disable firewall:</strong>
                <code>sudo ufw disable</code>
            </div>
            <div class="additional-command-item">
                <strong>Reset firewall:</strong>
                <code>sudo ufw reset</code>
            </div>
        `;
    }
    
    additionalCommandsList.innerHTML = commands;
}

// Copy command to clipboard
function copyToClipboard() {
    const command = generatedFirewallCommand.textContent;
    
    navigator.clipboard.writeText(command).then(() => {
        const originalText = copyFirewallCommand.textContent;
        copyFirewallCommand.textContent = 'Copied!';
        copyFirewallCommand.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            copyFirewallCommand.textContent = originalText;
            copyFirewallCommand.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy command');
        console.error('Copy failed:', err);
    });
}

// Clear form
function clearForm() {
    ruleName.value = '';
    ruleAction.value = 'allow';
    ruleDirection.value = 'in';
    ruleProtocol.value = 'tcp';
    rulePort.value = '';
    remoteIP.value = '';
    ruleProfile.value = 'any';
    programPath.value = '';
    
    firewallCommandOutput.style.display = 'none';
    ruleName.focus();
}

// Initialize
window.addEventListener('load', () => {
    handleOSChange({ target: { value: 'windows' } });
    ruleName.focus();
});
