// DOM Elements
const textModeBtn = document.getElementById('textModeBtn');
const fileModeBtn = document.getElementById('fileModeBtn');
const textInputMode = document.getElementById('textInputMode');
const fileInputMode = document.getElementById('fileInputMode');
const textInput = document.getElementById('textInput');
const fileInput = document.getElementById('fileInput');
const generateTextHashBtn = document.getElementById('generateTextHashBtn');
const generateFileHashBtn = document.getElementById('generateFileHashBtn');
const selectedFileInfo = document.getElementById('selectedFileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeFileBtn = document.getElementById('removeFileBtn');
const hashResults = document.getElementById('hashResults');
const processingMessage = document.getElementById('processingMessage');

// Hash result elements
const md5Hash = document.getElementById('md5Hash');
const sha1Hash = document.getElementById('sha1Hash');
const sha256Hash = document.getElementById('sha256Hash');
const sha384Hash = document.getElementById('sha384Hash');
const sha512Hash = document.getElementById('sha512Hash');

// Current file
let currentFile = null;

// Event listeners
textModeBtn.addEventListener('click', switchToTextMode);
fileModeBtn.addEventListener('click', switchToFileMode);
generateTextHashBtn.addEventListener('click', generateTextHashes);
generateFileHashBtn.addEventListener('click', generateFileHashes);
fileInput.addEventListener('change', handleFileSelect);
removeFileBtn.addEventListener('click', removeFile);

// Copy buttons
document.querySelectorAll('.copy-hash-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const hashType = this.getAttribute('data-hash');
        copyHashToClipboard(hashType);
    });
});

// Drag and drop
const fileUploadLabel = document.querySelector('.file-upload-label');
fileUploadLabel.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadLabel.style.borderColor = '#2563EB';
    fileUploadLabel.style.background = '#F0F9FF';
});

fileUploadLabel.addEventListener('dragleave', (e) => {
    e.preventDefault();
    fileUploadLabel.style.borderColor = '#06B6D4';
    fileUploadLabel.style.background = 'white';
});

fileUploadLabel.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadLabel.style.borderColor = '#06B6D4';
    fileUploadLabel.style.background = 'white';
    
    if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect();
    }
});

// Switch between text and file mode
function switchToTextMode() {
    textModeBtn.classList.add('active');
    fileModeBtn.classList.remove('active');
    textInputMode.style.display = 'block';
    fileInputMode.style.display = 'none';
    hashResults.style.display = 'none';
}

function switchToFileMode() {
    fileModeBtn.classList.add('active');
    textModeBtn.classList.remove('active');
    fileInputMode.style.display = 'block';
    textInputMode.style.display = 'none';
    hashResults.style.display = 'none';
}

// Handle file selection
function handleFileSelect() {
    const file = fileInput.files[0];
    
    if (!file) {
        return;
    }
    
    // Check file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
        alert('File is too large. Maximum file size is 100MB.');
        fileInput.value = '';
        return;
    }
    
    currentFile = file;
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    selectedFileInfo.style.display = 'block';
    generateFileHashBtn.style.display = 'block';
    hashResults.style.display = 'none';
}

// Remove selected file
function removeFile() {
    currentFile = null;
    fileInput.value = '';
    selectedFileInfo.style.display = 'none';
    generateFileHashBtn.style.display = 'none';
    hashResults.style.display = 'none';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Generate hashes for text
async function generateTextHashes() {
    const text = textInput.value;
    
    if (!text) {
        alert('Please enter some text to hash');
        return;
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    await generateHashes(data);
}

// Generate hashes for file
async function generateFileHashes() {
    if (!currentFile) {
        alert('Please select a file first');
        return;
    }
    
    processingMessage.style.display = 'block';
    hashResults.style.display = 'none';
    
    try {
        const arrayBuffer = await currentFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await generateHashes(uint8Array);
    } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file. Please try again.');
    } finally {
        processingMessage.style.display = 'none';
    }
}

// Generate all hashes
async function generateHashes(data) {
    try {
        // MD5 (using crypto-js would be needed, but for browser we'll use SubtleCrypto for SHA only)
        // MD5 is not available in Web Crypto API, so we'll calculate it differently
        md5Hash.textContent = await calculateMD5(data);
        
        // SHA-1
        const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
        sha1Hash.textContent = bufferToHex(sha1Buffer);
        
        // SHA-256
        const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
        sha256Hash.textContent = bufferToHex(sha256Buffer);
        
        // SHA-384
        const sha384Buffer = await crypto.subtle.digest('SHA-384', data);
        sha384Hash.textContent = bufferToHex(sha384Buffer);
        
        // SHA-512
        const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
        sha512Hash.textContent = bufferToHex(sha512Buffer);
        
        hashResults.style.display = 'block';
    } catch (error) {
        console.error('Error generating hashes:', error);
        alert('Error generating hashes. Please try again.');
    }
}

// MD5 implementation (simplified)
async function calculateMD5(data) {
    // Simple MD5 implementation for browser
    // This is a basic implementation - in production you'd use crypto-js library
    
    function rotateLeft(n, s) {
        return (n << s) | (n >>> (32 - s));
    }
    
    function addUnsigned(x, y) {
        return (x + y) >>> 0;
    }
    
    function F(x, y, z) { return (x & y) | (~x & z); }
    function G(x, y, z) { return (x & z) | (y & ~z); }
    function H(x, y, z) { return x ^ y ^ z; }
    function I(x, y, z) { return y ^ (x | ~z); }
    
    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    const S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    
    let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
    
    // Padding
    const msgLen = data.length;
    const numBlocks = ((msgLen + 8) >>> 6) + 1;
    const totalLen = numBlocks * 64;
    const msg = new Uint8Array(totalLen);
    msg.set(data);
    msg[msgLen] = 0x80;
    
    const bitLen = msgLen * 8;
    msg[totalLen - 8] = bitLen & 0xFF;
    msg[totalLen - 7] = (bitLen >>> 8) & 0xFF;
    msg[totalLen - 6] = (bitLen >>> 16) & 0xFF;
    msg[totalLen - 5] = (bitLen >>> 24) & 0xFF;
    
    // Process blocks
    for (let i = 0; i < numBlocks; i++) {
        const offset = i * 64;
        const x = new Uint32Array(16);
        
        for (let j = 0; j < 16; j++) {
            x[j] = msg[offset + j * 4] |
                   (msg[offset + j * 4 + 1] << 8) |
                   (msg[offset + j * 4 + 2] << 16) |
                   (msg[offset + j * 4 + 3] << 24);
        }
        
        let aa = a, bb = b, cc = c, dd = d;
        
        a = FF(a, b, c, d, x[0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[15], S14, 0x49B40821);
        
        a = GG(a, b, c, d, x[1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[10], S22, 0x02441453);
        c = GG(c, d, a, b, x[15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[12], S24, 0x8D2A4C8A);
        
        a = HH(a, b, c, d, x[5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[6], S34, 0x04881D05);
        a = HH(a, b, c, d, x[9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[2], S34, 0xC4AC5665);
        
        a = II(a, b, c, d, x[0], S41, 0xF4292244);
        d = II(d, a, b, c, x[7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[6], S43, 0xA3014314);
        b = II(b, c, d, a, x[13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[9], S44, 0xEB86D391);
        
        a = addUnsigned(a, aa);
        b = addUnsigned(b, bb);
        c = addUnsigned(c, cc);
        d = addUnsigned(d, dd);
    }
    
    const result = new Uint32Array([a, b, c, d]);
    return Array.from(new Uint8Array(result.buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Convert ArrayBuffer to hex string
function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Copy hash to clipboard
function copyHashToClipboard(hashType) {
    let hashValue;
    
    switch(hashType) {
        case 'md5':
            hashValue = md5Hash.textContent;
            break;
        case 'sha1':
            hashValue = sha1Hash.textContent;
            break;
        case 'sha256':
            hashValue = sha256Hash.textContent;
            break;
        case 'sha384':
            hashValue = sha384Hash.textContent;
            break;
        case 'sha512':
            hashValue = sha512Hash.textContent;
            break;
        default:
            return;
    }
    
    if (hashValue === '-') {
        alert('Generate a hash first');
        return;
    }
    
    navigator.clipboard.writeText(hashValue).then(() => {
        const btn = document.querySelector(`[data-hash="${hashType}"]`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy hash');
        console.error('Copy failed:', err);
    });
}
