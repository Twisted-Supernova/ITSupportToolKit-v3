// DOM Elements
const currentUnix = document.getElementById('currentUnix');
const currentDateTime = document.getElementById('currentDateTime');
const currentISO = document.getElementById('currentISO');
const unixInput = document.getElementById('unixInput');
const convertUnixBtn = document.getElementById('convertUnixBtn');
const unixResult = document.getElementById('unixResult');
const dateTimeInput = document.getElementById('dateTimeInput');
const convertDateBtn = document.getElementById('convertDateBtn');
const dateResult = document.getElementById('dateResult');
const nowTimestamp = document.getElementById('nowTimestamp');
const todayMidnight = document.getElementById('todayMidnight');
const tomorrowMidnight = document.getElementById('tomorrowMidnight');

// Update current time every second
function updateCurrentTime() {
    const now = new Date();
    const unixSeconds = Math.floor(now.getTime() / 1000);
    
    currentUnix.textContent = unixSeconds;
    currentDateTime.textContent = now.toLocaleString('en-GB', { 
        dateStyle: 'full', 
        timeStyle: 'long' 
    });
    currentISO.textContent = now.toISOString();
}

// Start updating current time
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// Event listeners
convertUnixBtn.addEventListener('click', convertUnixToHuman);
convertDateBtn.addEventListener('click', convertHumanToUnix);
nowTimestamp.addEventListener('click', fillCurrentTimestamp);
todayMidnight.addEventListener('click', fillTodayMidnight);
tomorrowMidnight.addEventListener('click', fillTomorrowMidnight);

unixInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertUnixToHuman();
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
    
    // Handle both seconds and milliseconds
    const date = timestamp > 10000000000 ? new Date(timestamp) : new Date(timestamp * 1000);
    
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
                <button class="copy-inline-btn" onclick="copyToClipboard('${unixSeconds}', this)">Copy</button>
            </div>
            <div class="result-item">
                <strong>Unix Timestamp (milliseconds):</strong>
                <code>${unixMilliseconds}</code>
                <button class="copy-inline-btn" onclick="copyToClipboard('${unixMilliseconds}', this)">Copy</button>
            </div>
            <div class="result-item">
                <strong>ISO 8601:</strong>
                <code>${date.toISOString()}</code>
                <button class="copy-inline-btn" onclick="copyToClipboard('${date.toISOString()}', this)">Copy</button>
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
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

// Set default datetime to now
window.addEventListener('load', () => {
    dateTimeInput.value = formatDateTimeLocal(new Date());
});
