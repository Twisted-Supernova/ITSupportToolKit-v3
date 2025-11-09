// Character sets for password generation
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Ambiguous characters to exclude
const ambiguousChars = '0Ol1I5S8B';

// DOM Elements
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const excludeAmbiguous = document.getElementById('excludeAmbiguous');
const generateButton = document.getElementById('generateButton');
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Update length display
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

// Generate password function
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let characterPool = '';
    
    // Build character pool based on selections
    if (includeUppercase.checked) {
        characterPool += charSets.uppercase;
    }
    if (includeLowercase.checked) {
        characterPool += charSets.lowercase;
    }
    if (includeNumbers.checked) {
        characterPool += charSets.numbers;
    }
    if (includeSymbols.checked) {
        characterPool += charSets.symbols;
    }
    
    // Check if at least one option is selected
    if (characterPool === '') {
        alert('Please select at least one character type');
        return;
    }
    
    // Remove ambiguous characters if option is checked
    if (excludeAmbiguous.checked) {
        characterPool = characterPool.split('').filter(char => 
            !ambiguousChars.includes(char)
        ).join('');
    }
    
    // Generate password
    let password = '';
    const poolLength = characterPool.length;
    
    // Use crypto.getRandomValues for secure random generation
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
        const randomIndex = randomValues[i] % poolLength;
        password += characterPool[randomIndex];
    }
    
    // Ensure password meets selected criteria (at least one of each type)
    if (!validatePassword(password)) {
        // Regenerate if validation fails
        return generatePassword();
    }
    
    // Display password
    passwordOutput.value = password;
    
    // Calculate and display strength
    calculateStrength(password);
}

// Validate password contains at least one character from each selected type
function validatePassword(password) {
    if (includeUppercase.checked && !/[A-Z]/.test(password)) {
        return false;
    }
    if (includeLowercase.checked && !/[a-z]/.test(password)) {
        return false;
    }
    if (includeNumbers.checked && !/[0-9]/.test(password)) {
        return false;
    }
    if (includeSymbols.checked && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
        return false;
    }
    return true;
}

// Calculate password strength
function calculateStrength(password) {
    let strength = 0;
    let strengthLabel = '';
    
    // Length-based scoring
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    
    // Character variety scoring
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    // Determine strength level
    if (strength <= 3) {
        strengthBar.className = 'strength-fill weak';
        strengthLabel = 'Weak';
    } else if (strength <= 5) {
        strengthBar.className = 'strength-fill medium';
        strengthLabel = 'Medium';
    } else {
        strengthBar.className = 'strength-fill strong';
        strengthLabel = 'Strong';
    }
    
    strengthText.textContent = `Password Strength: ${strengthLabel}`;
}

// Copy to clipboard
function copyPassword() {
    const password = passwordOutput.value;
    
    if (!password) {
        alert('Generate a password first');
        return;
    }
    
    navigator.clipboard.writeText(password).then(() => {
        // Visual feedback
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy password');
        console.error('Copy failed:', err);
    });
}

// Event listeners
generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyPassword);

// Generate initial password on page load
window.addEventListener('load', generatePassword);
