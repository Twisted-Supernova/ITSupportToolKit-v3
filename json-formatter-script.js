// DOM Elements
const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const jsonStatus = document.getElementById('jsonStatus');
const formatJsonBtn = document.getElementById('formatJsonBtn');
const minifyJsonBtn = document.getElementById('minifyJsonBtn');
const validateJsonBtn = document.getElementById('validateJsonBtn');
const copyJsonBtn = document.getElementById('copyJsonBtn');
const clearJsonBtn = document.getElementById('clearJsonBtn');

// Event listeners
formatJsonBtn.addEventListener('click', formatJSON);
minifyJsonBtn.addEventListener('click', minifyJSON);
validateJsonBtn.addEventListener('click', validateJSON);
copyJsonBtn.addEventListener('click', copyOutput);
clearJsonBtn.addEventListener('click', clearAll);

// Format JSON
function formatJSON() {
    const input = jsonInput.value.trim();
    
    if (!input) {
        showStatus('Please enter some JSON to format', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        jsonOutput.value = formatted;
        showStatus('✓ Valid JSON - Formatted successfully', 'success');
    } catch (error) {
        jsonOutput.value = '';
        showStatus(`✗ Invalid JSON: ${error.message}`, 'error');
    }
}

// Minify JSON
function minifyJSON() {
    const input = jsonInput.value.trim();
    
    if (!input) {
        showStatus('Please enter some JSON to minify', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        jsonOutput.value = minified;
        showStatus(`✓ Valid JSON - Minified (${minified.length} characters)`, 'success');
    } catch (error) {
        jsonOutput.value = '';
        showStatus(`✗ Invalid JSON: ${error.message}`, 'error');
    }
}

// Validate JSON only
function validateJSON() {
    const input = jsonInput.value.trim();
    
    if (!input) {
        showStatus('Please enter some JSON to validate', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const type = Array.isArray(parsed) ? 'Array' : typeof parsed === 'object' ? 'Object' : typeof parsed;
        const size = JSON.stringify(parsed).length;
        showStatus(`✓ Valid JSON - Type: ${type}, Size: ${size} characters`, 'success');
    } catch (error) {
        showStatus(`✗ Invalid JSON: ${error.message}`, 'error');
    }
}

// Copy output to clipboard
function copyOutput() {
    const output = jsonOutput.value;
    
    if (!output) {
        showStatus('Nothing to copy - process JSON first', 'error');
        return;
    }
    
    navigator.clipboard.writeText(output).then(() => {
        showStatus('✓ Copied to clipboard', 'success');
    }).catch(err => {
        showStatus('Failed to copy to clipboard', 'error');
        console.error('Copy failed:', err);
    });
}

// Clear all
function clearAll() {
    jsonInput.value = '';
    jsonOutput.value = '';
    jsonStatus.textContent = '';
    jsonStatus.className = 'json-status';
    jsonInput.focus();
}

// Show status message
function showStatus(message, type) {
    jsonStatus.textContent = message;
    jsonStatus.className = `json-status json-status-${type}`;
}

// Focus input on load
window.addEventListener('load', () => {
    jsonInput.focus();
});
