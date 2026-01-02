// DOM Elements
const unixInput = document.getElementById('unixInput');
const convertUnixBtn = document.getElementById('convertUnixBtn');
const unixResult = document.getElementById('unixResult');
const dateTimeInput = document.getElementById('dateTimeInput');
const convertDateBtn = document.getElementById('convertDateBtn');
const dateResult = document.getElementById('dateResult');

// Quick action buttons
const currentTimestampBtn = document.getElementById('currentTimestampBtn');
const todayMidnightBtn = document.getElementById('todayMidnightBtn');
const tomorrowMidnightBtn = document.getElementById('tomorrowMidnightBtn');

// Event listeners
convertUnixBtn.addEventListener('click', convertUnixToHuman);
convertDateBtn.addEventListener('click', convertHumanToUnix);
currentTimestampBtn.addEventListener('click', fillCurrentTimestamp);
todayMidnightBtn.addEventListener('click', fillTodayMidnight);
tomorrowMidnightBtn.addEventListener('click', fillTomorrowMidnight);

// Event delegation for dynamically created copy buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('copy-inline-btn')) {
        const textToCopy = e.target.dataset.copyValue;
        copyToClipboard(textToCopy, e.target);
    }
});

// Convert Unix timestamp to human readable
function convertUnixToHuman() {
    const input = unixInput.value.trim();
    
    if (!input) {
        showResult(unixResult, 'Please enter a Unix timestamp', 'error');
        return;
    }
    
    const timestamp = parseInt(input);
    
    if (isNaN(timestamp)) {
        showResult(unixResult, 'Invalid timestamp - must be a number', 'error');
        return;
    }
    
    // Auto-detect if milliseconds or seconds
    const date = timestamp > 10000000000 ? 
        new Date(timestamp) : new Date(timestamp * 1000);
    
    if (isNaN(date.getTime())) {
        showResult(unixResult, 'Invalid timestamp value', 'error');
        return;
    }
    
    const html = `
        <div class="result-success">
            <div class="result-item">
                <strong>Full Date & Time:</strong>
                <code>${date.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'long' })}</code>
            </div>
            <div class="result-item">
                <strong>ISO 8601:</strong>
                <code>${date.toISOString()}</code>
            </div>
            <div class="result-item">
                <strong>UTC:</strong>
                <code>${date.toUTCString()}</code>
            </div>
            <div class="result-item">
                <strong>Date Only:</strong>
                <code>${date.toLocaleDateString('en-GB')}</code>
            </div>
            <div class="result-item">
                <strong>Time Only:</strong>
                <code>${date.toLocaleTimeString('en-GB')}</code>
            </div>
            <div class="result-item">
                <strong>Relative:</strong>
                <code>${getRelativeTime(date)}</code>
            </div>
        </div>
    `;
    
    unixResult.innerHTML = html;
}

// Convert human readable to Unix timestamp
function convertHumanToUnix() {
    const input = dateTimeInput.value;
    
    if (!input) {
        showResult(dateResult, 'Please select a date and time', 'error');
        return;
    }
    
    const date = new Date(input);
    
    if (isNaN(date.getTime())) {
        showResult(dateResult, 'Invalid date', 'error');
        return;
    }
    
    const unixSeconds = Math.floor(date.getTime() / 1000);
    const unixMilliseconds = date.getTime();
    
    const html = `
        <div class="result-success">
            <div class="result-item">
                <strong>Unix Timestamp (seconds):</strong>
                <code>${unixSeconds}</code>
                <button class="copy-inline-btn" data-copy-value="${unixSeconds}">Copy</button>
            </div>
            <div class="result-item">
                <strong>Unix Timestamp (milliseconds):</strong>
                <code>${unixMilliseconds}</code>
                <button class="copy-inline-btn" data-copy-value="${unixMilliseconds}">Copy</button>
            </div>
            <div class="result-item">
                <strong>ISO 8601:</strong>
                <code>${date.toISOString()}</code>
                <button class="copy-inline-btn" data-copy-value="${date.toISOString()}">Copy</button>
            </div>
            <div class="result-item">
                <strong>UTC String:</strong>
                <code>${date.toUTCString()}</code>
            </div>
        </div>
    `;
    
    dateResult.innerHTML = html;
}

// Get relative time
function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSeconds < 60) {
        return diffSeconds === 0 ? 'just now' : `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Quick action: Fill current timestamp
function fillCurrentTimestamp() {
    unixInput.value = Math.floor(Date.now() / 1000);
    convertUnixToHuman();
}

// Quick action: Fill today at midnight
function fillTodayMidnight() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dateTimeInput.value = formatDateTimeLocal(today);
    convertHumanToUnix();
}

// Quick action: Fill tomorrow at midnight
function fillTomorrowMidnight() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    dateTimeInput.value = formatDateTimeLocal(tomorrow);
    convertHumanToUnix();
}

// Format date for datetime-local input
function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Show result message
function showResult(element, message, type) {
    element.innerHTML = `<div class="result-${type}">${message}</div>`;
}

// Copy to clipboard
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}
