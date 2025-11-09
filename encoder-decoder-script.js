// DOM Elements - Base64
const base64Input = document.getElementById('base64Input');
const base64Output = document.getElementById('base64Output');
const base64Status = document.getElementById('base64Status');
const base64EncodeBtn = document.getElementById('base64EncodeBtn');
const base64DecodeBtn = document.getElementById('base64DecodeBtn');
const copyBase64Btn = document.getElementById('copyBase64Btn');
const clearBase64Btn = document.getElementById('clearBase64Btn');

// DOM Elements - URL
const urlInput = document.getElementById('urlInput');
const urlOutput = document.getElementById('urlOutput');
const urlStatus = document.getElementById('urlStatus');
const urlEncodeBtn = document.getElementById('urlEncodeBtn');
const urlDecodeBtn = document.getElementById('urlDecodeBtn');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const clearUrlBtn = document.getElementById('clearUrlBtn');

// Base64 Event Listeners
base64EncodeBtn.addEventListener('click', encodeBase64);
base64DecodeBtn.addEventListener('click', decodeBase64);
copyBase64Btn.addEventListener('click', () => copyOutput(base64Output, base64Status));
clearBase64Btn.addEventListener('click', () => clearSection(base64Input, base64Output, base64Status));

// URL Event Listeners
urlEncodeBtn.addEventListener('click', encodeURL);
urlDecodeBtn.addEventListener('click', decodeURL);
copyUrlBtn.addEventListener('click', () => copyOutput(urlOutput, urlStatus));
clearUrlBtn.addEventListener('click', () => clearSection(urlInput, urlOutput, urlStatus));

// Base64 Encode
function encodeBase64() {
    const input = base64Input.value;
    
    if (!input) {
        showStatus(base64Status, 'Please enter text to encode', 'error');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        base64Output.value = encoded;
        showStatus(base64Status, '✓ Text encoded to Base64', 'success');
    } catch (error) {
        base64Output.value = '';
        showStatus(base64Status, `✗ Encoding failed: ${error.message}`, 'error');
    }
}

// Base64 Decode
function decodeBase64() {
    const input = base64Input.value.trim();
    
    if (!input) {
        showStatus(base64Status, 'Please enter Base64 string to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        base64Output.value = decoded;
        showStatus(base64Status, '✓ Base64 decoded to text', 'success');
    } catch (error) {
        base64Output.value = '';
        showStatus(base64Status, '✗ Invalid Base64 string - decoding failed', 'error');
    }
}

// URL Encode
function encodeURL() {
    const input = urlInput.value;
    
    if (!input) {
        showStatus(urlStatus, 'Please enter text or URL to encode', 'error');
        return;
    }
    
    try {
        const encoded = encodeURIComponent(input);
        urlOutput.value = encoded;
        showStatus(urlStatus, '✓ Text/URL encoded', 'success');
    } catch (error) {
        urlOutput.value = '';
        showStatus(urlStatus, `✗ Encoding failed: ${error.message}`, 'error');
    }
}

// URL Decode
function decodeURL() {
    const input = urlInput.value.trim();
    
    if (!input) {
        showStatus(urlStatus, 'Please enter encoded URL to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(input);
        urlOutput.value = decoded;
        showStatus(urlStatus, '✓ URL decoded', 'success');
    } catch (error) {
        urlOutput.value = '';
        showStatus(urlStatus, `✗ Decoding failed: ${error.message}`, 'error');
    }
}

// Copy output to clipboard
function copyOutput(outputElement, statusElement) {
    const output = outputElement.value;
    
    if (!output) {
        showStatus(statusElement, 'Nothing to copy - encode/decode first', 'error');
        return;
    }
    
    navigator.clipboard.writeText(output).then(() => {
        showStatus(statusElement, '✓ Copied to clipboard', 'success');
    }).catch(err => {
        showStatus(statusElement, 'Failed to copy to clipboard', 'error');
        console.error('Copy failed:', err);
    });
}

// Clear section
function clearSection(inputElement, outputElement, statusElement) {
    inputElement.value = '';
    outputElement.value = '';
    statusElement.textContent = '';
    statusElement.className = 'encoder-status';
    inputElement.focus();
}

// Show status message
function showStatus(element, message, type) {
    element.textContent = message;
    element.className = `encoder-status encoder-status-${type}`;
}

// Focus first input on load
window.addEventListener('load', () => {
    base64Input.focus();
});
