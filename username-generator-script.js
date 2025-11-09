// DOM Elements
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const middleName = document.getElementById('middleName');
const employeeId = document.getElementById('employeeId');
const suffixNumber = document.getElementById('suffixNumber');
const generateUsernames = document.getElementById('generateUsernames');
const clearForm = document.getElementById('clearForm');
const usernameResults = document.getElementById('usernameResults');
const usernameGrid = document.getElementById('usernameGrid');

// Active Directory username limit
const AD_USERNAME_LIMIT = 20;

// Event listeners
generateUsernames.addEventListener('click', generateAllUsernames);
clearForm.addEventListener('click', resetForm);

// Allow Enter key to generate
[firstName, lastName, middleName, employeeId, suffixNumber].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateAllUsernames();
        }
    });
});

// Generate all username formats
function generateAllUsernames() {
    const first = firstName.value.trim();
    const last = lastName.value.trim();
    const middle = middleName.value.trim();
    const empId = employeeId.value.trim();
    const suffix = suffixNumber.value.trim();
    
    // Validation
    if (!first || !last) {
        alert('Please enter both first and last name');
        return;
    }
    
    // Sanitize inputs (remove special characters, accents, etc.)
    const cleanFirst = sanitizeForAD(first);
    const cleanLast = sanitizeForAD(last);
    const cleanMiddle = middle ? sanitizeForAD(middle) : '';
    
    // Generate username formats
    const formats = [
        {
            name: 'First.Last',
            description: 'Standard format with period separator',
            username: `${cleanFirst.toLowerCase()}.${cleanLast.toLowerCase()}`,
            example: 'john.smith'
        },
        {
            name: 'FirstLast',
            description: 'First and last name concatenated',
            username: `${cleanFirst.toLowerCase()}${cleanLast.toLowerCase()}`,
            example: 'johnsmith'
        },
        {
            name: 'FLast',
            description: 'First initial + last name',
            username: `${cleanFirst[0].toLowerCase()}${cleanLast.toLowerCase()}`,
            example: 'jsmith'
        },
        {
            name: 'FirstL',
            description: 'First name + last initial',
            username: `${cleanFirst.toLowerCase()}${cleanLast[0].toLowerCase()}`,
            example: 'johns'
        },
        {
            name: 'First_Last',
            description: 'Underscore separator',
            username: `${cleanFirst.toLowerCase()}_${cleanLast.toLowerCase()}`,
            example: 'john_smith'
        },
        {
            name: 'LastFirst',
            description: 'Last name + first name',
            username: `${cleanLast.toLowerCase()}${cleanFirst.toLowerCase()}`,
            example: 'smithjohn'
        },
        {
            name: 'Last.First',
            description: 'Last.First format',
            username: `${cleanLast.toLowerCase()}.${cleanFirst.toLowerCase()}`,
            example: 'smith.john'
        },
        {
            name: 'F.Last',
            description: 'First initial with period + last name',
            username: `${cleanFirst[0].toLowerCase()}.${cleanLast.toLowerCase()}`,
            example: 'j.smith'
        }
    ];
    
    // Add middle initial formats if middle name provided
    if (cleanMiddle) {
        formats.push(
            {
                name: 'First.M.Last',
                description: 'First.MiddleInitial.Last',
                username: `${cleanFirst.toLowerCase()}.${cleanMiddle[0].toLowerCase()}.${cleanLast.toLowerCase()}`,
                example: 'john.m.smith'
            },
            {
                name: 'FirstMLast',
                description: 'First + middle initial + last',
                username: `${cleanFirst.toLowerCase()}${cleanMiddle[0].toLowerCase()}${cleanLast.toLowerCase()}`,
                example: 'johnmsmith'
            }
        );
    }
    
    // Add employee ID format if provided
    if (empId) {
        formats.push({
            name: 'FirstLast + ID',
            description: 'First name + employee ID',
            username: `${cleanFirst.toLowerCase()}${empId}`,
            example: 'john12345'
        });
    }
    
    // Add suffix to all usernames if provided
    const suffixNum = suffix ? suffix : '';
    const finalFormats = formats.map(format => ({
        ...format,
        username: format.username + suffixNum
    }));
    
    // Display results
    displayUsernames(finalFormats);
}

// Sanitize string for Active Directory
function sanitizeForAD(str) {
    // Remove accents and special characters
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-zA-Z0-9._-]/g, '') // Only allow letters, numbers, period, underscore, hyphen
        .replace(/\s+/g, ''); // Remove spaces
}

// Display generated usernames
function displayUsernames(formats) {
    usernameGrid.innerHTML = formats.map(format => {
        const length = format.username.length;
        const exceedsLimit = length > AD_USERNAME_LIMIT;
        const statusClass = exceedsLimit ? 'username-invalid' : 'username-valid';
        const statusText = exceedsLimit ? `⚠ Too long (${length} chars)` : `✓ Valid (${length} chars)`;
        
        return `
            <div class="username-card ${statusClass}">
                <div class="username-card-header">
                    <h4>${format.name}</h4>
                    <span class="username-status">${statusText}</span>
                </div>
                <p class="username-description">${format.description}</p>
                <div class="username-value-container">
                    <code class="username-value">${format.username}</code>
                    <button class="copy-username-btn" data-username="${format.username}">Copy</button>
                </div>
                ${exceedsLimit ? '<p class="username-warning">Exceeds AD 20-character limit</p>' : ''}
            </div>
        `;
    }).join('');
    
    // Add copy functionality to buttons
    document.querySelectorAll('.copy-username-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            copyToClipboard(username, this);
        });
    });
    
    usernameResults.style.display = 'block';
}

// Copy username to clipboard
function copyToClipboard(username, button) {
    navigator.clipboard.writeText(username).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy username');
        console.error('Copy failed:', err);
    });
}

// Reset form
function resetForm() {
    firstName.value = '';
    lastName.value = '';
    middleName.value = '';
    employeeId.value = '';
    suffixNumber.value = '';
    usernameResults.style.display = 'none';
    firstName.focus();
}

// Focus first name on load
window.addEventListener('load', () => {
    firstName.focus();
});
