# IT Support Toolkit

A collection of essential tools for 1st and 2nd line support engineers.

## Features

### Password Generator
Generate secure passwords with customizable options:
- 8-50 character length
- Toggle uppercase, lowercase, numbers, and symbols
- Option to exclude ambiguous characters
- Password strength indicator
- One-click copy to clipboard

### IP Lookup Tool
Analyze IP addresses and calculate subnet information:
- Single IP address lookup
- CIDR notation support (e.g., 192.168.1.0/24)
- Identifies IP type (Private, Public, Loopback, Multicast, etc.)
- Shows RFC 1918 private IP ranges
- **Geolocation for public IPs** (using ip-api.com):
  - Country, region, city, postal code
  - ISP and organization information
  - AS (Autonomous System) number
  - Timezone and coordinates
  - Rate limit: 45 requests/minute
- Calculates subnet details:
  - Network and broadcast addresses
  - Usable host range
  - Subnet mask (decimal and binary)
  - Total and usable host counts
- Binary representation of IP addresses
- Private IPs work offline (no API needed)

### Port Reference Guide
Quick lookup for common network ports and services:
- Search by port number, service name, or description
- Filter by protocol (TCP, UDP, or Both)
- Comprehensive database of 80+ common ports including:
  - Well-known ports (HTTP, HTTPS, FTP, SSH, DNS, etc.)
  - Microsoft ports (RDP, SMB, Active Directory, Exchange)
  - Database ports (SQL Server, MySQL, PostgreSQL, MongoDB, etc.)
  - VPN and security ports
  - Application and game server ports
- Real-time search with instant results
- Sortable table display
- Fully offline - no external dependencies

### Hash Generator
Generate cryptographic hashes for text or files:
- **Hash algorithms supported:**
  - MD5 (128-bit)
  - SHA-1 (160-bit)
  - SHA-256 (256-bit)
  - SHA-384 (384-bit)
  - SHA-512 (512-bit)
- **Input methods:**
  - Text input: Type or paste text directly
  - File upload: Hash entire files (up to 100MB)
- **Features:**
  - Generate all hashes simultaneously
  - One-click copy for each hash
  - Drag and drop file support
  - File size display
  - Processing indicator for large files
- **Use cases:**
  - Verify file integrity
  - Check download checksums
  - Compare file hashes
  - Password verification
- Fully client-side - no data sent to servers

### Windows Error Code Lookup
Find explanations and fixes for Windows error codes:
- **Comprehensive error database** (50+ common errors):
  - General Windows errors
  - Windows Update errors
  - Network errors
  - Security and permissions errors
  - Active Directory errors
  - Group Policy errors
- **Search capabilities:**
  - Hexadecimal format (0x80070005)
  - Decimal format (-2147024891)
  - Error name (ERROR_ACCESS_DENIED)
  - Description search
- **Detailed information:**
  - Error code in both hex and decimal
  - Error name and description
  - Common causes
  - Step-by-step troubleshooting fixes
- Filter by category
- Real-time search as you type
- Fully offline reference

### AD Username Generator
Generate Active Directory usernames following common naming conventions:
- **Input fields:**
  - First name (required)
  - Last name (required)
  - Middle name (optional)
  - Employee ID (optional)
  - Suffix number for duplicates (optional)
- **Generated formats** (8+ variations):
  - first.last (john.smith)
  - firstlast (johnsmith)
  - flast (jsmith)
  - firstl (johns)
  - first_last (john_smith)
  - lastfirst (smithjohn)
  - last.first (smith.john)
  - f.last (j.smith)
  - Plus middle initial formats if provided
- **Features:**
  - Automatic special character sanitization
  - Removes accents and diacritics
  - AD 20-character limit validation
  - Visual indicators for valid/invalid usernames
  - Character count for each format
  - One-click copy for each username
  - Duplicate handling with suffix numbers
- Fully client-side processing

### JSON Formatter & Validator
Format, validate, and minify JSON data:
- **Features:**
  - Format (prettify) JSON with proper indentation
  - Minify JSON (remove whitespace)
  - Validate JSON syntax
  - Clear error messages for invalid JSON
  - Shows JSON type and size
  - One-click copy output
- Perfect for API responses, config files
- Instant formatting and validation
- Fully client-side processing

### Timestamp Converter
Convert between Unix timestamps and human-readable dates:
- **Current time display** (live updating):
  - Unix timestamp
  - Full date and time
  - ISO 8601 format
- **Unix to Human conversion:**
  - Handles both seconds and milliseconds
  - Multiple output formats
  - Relative time (e.g., "2 hours ago")
  - UTC and local time
- **Human to Unix conversion:**
  - Date/time picker
  - Outputs seconds and milliseconds
  - ISO 8601 format
  - One-click copy
- **Quick actions:**
  - Current timestamp
  - Today at midnight
  - Tomorrow at midnight
- Essential for log analysis and debugging

### Base64 & URL Encoder/Decoder
Encode and decode Base64 and URL strings:
- **Base64 encoding/decoding:**
  - Text to Base64
  - Base64 to text
  - UTF-8 support
  - Error handling for invalid Base64
- **URL encoding/decoding:**
  - Encode special characters for URLs
  - Decode URL-encoded strings
  - Handle query parameters
- **Features:**
  - Side-by-side input/output
  - One-click copy
  - Clear status messages
  - Instant processing
- Useful for API testing, URL troubleshooting

### MAC Address Lookup
Identify vendor and format MAC addresses:
- **Vendor identification:**
  - Built-in OUI database (100+ major vendors)
  - Identifies Cisco, HP, Dell, Apple, Intel, VMware, Microsoft, etc.
  - Detects locally administered addresses
- **Format converter:**
  - Shows 5 common formats:
    - Colon notation (AA:BB:CC:DD:EE:FF)
    - Hyphen notation (AA-BB-CC-DD-EE-FF)
    - No separator (AABBCCDDEEFF)
    - Dot notation - Cisco (AABB.CCDD.EEFF)
    - Space notation (AA BB CC DD EE FF)
  - One-click copy for each format
- **Technical analysis:**
  - Unicast vs Multicast
  - Universally vs Locally Administered
  - Detects randomized MAC addresses (privacy)
  - Binary representation
- **Input flexibility:**
  - Accepts any common MAC format
  - Automatic format detection
  - Validation and error messages
- Perfect for network troubleshooting and device identification

### DNS Lookup Tool
Query DNS records using DNS-over-HTTPS:
- **Supported record types:**
  - A (IPv4 addresses)
  - AAAA (IPv6 addresses)
  - MX (Mail exchange servers with priority)
  - TXT (Text records - SPF, DKIM, etc.)
  - CNAME (Canonical names)
  - NS (Name servers)
  - SOA (Start of Authority)
  - PTR (Reverse DNS)
- **Features:**
  - Lookup single record type
  - "Lookup All" for comprehensive results
  - Shows TTL (Time To Live) values
  - MX priority display
  - Uses Google DNS-over-HTTPS API
  - Clean, organized results
- **Use cases:**
  - Troubleshoot email delivery (MX records)
  - Verify DNS propagation
  - Check domain configuration
  - Audit DNS records

### WHOIS Lookup Tool
Get domain registration information:
- **Domain information:**
  - Registrar details
  - Registration, update, and expiry dates
  - Domain status
  - Name servers
  - Registrant information (if not redacted)
- **Features:**
  - Clean domain input (removes http://, www, etc.)
  - Domain validation
  - Privacy notice for GDPR-protected data
  - Shows command-line alternative
  - Informational content about WHOIS
- **Use cases:**
  - Check domain availability/expiry
  - Verify domain ownership
  - Identify registrar
  - Audit domain configuration
- **Note:** Uses WHOIS API (free tier) - personal data often redacted due to GDPR

## Files Structure

```
├── index.html                     # Landing page
├── password-generator.html        # Password generator tool
├── ip-lookup.html                 # IP lookup tool
├── port-reference.html            # Port reference guide
├── hash-generator.html            # Hash generator tool
├── error-lookup.html              # Windows error lookup tool
├── username-generator.html        # AD username generator tool
├── json-formatter.html            # JSON formatter & validator
├── timestamp-converter.html       # Timestamp converter
├── encoder-decoder.html           # Base64 & URL encoder/decoder
├── mac-lookup.html                # MAC address lookup tool
├── dns-lookup.html                # DNS lookup tool
├── whois-lookup.html              # WHOIS lookup tool
├── styles.css                     # Shared styles
├── script.js                      # Burger menu functionality
├── password-script.js             # Password generator logic
├── ip-lookup-script.js            # IP lookup logic
├── port-reference-script.js       # Port reference logic
├── hash-generator-script.js       # Hash generator logic
├── error-lookup-script.js         # Error lookup logic
├── username-generator-script.js   # Username generator logic
├── json-formatter-script.js       # JSON formatter logic
├── timestamp-converter-script.js  # Timestamp converter logic
├── encoder-decoder-script.js      # Encoder/decoder logic
├── mac-lookup-script.js           # MAC lookup logic
├── dns-lookup-script.js           # DNS lookup logic
├── whois-lookup-script.js         # WHOIS lookup logic
└── README.md                      # This file
```

## Local Testing

1. Download all files to a folder
2. Open `index.html` in a web browser
3. Navigate through the tools

## GitHub Pages Deployment

1. Create a new repository on GitHub
2. Clone the repository to your local machine
3. Copy all files into the repository folder
4. Commit and push:
   ```bash
   git add .
   git commit -m "Added IP Lookup tool"
   git push origin main
   ```
5. Go to repository Settings → Pages
6. Select "Deploy from a branch"
7. Choose "main" branch and "/ (root)" folder
8. Click Save
9. Your site will be live at: `https://yourusername.github.io/repository-name/`

## Future Tools

- Error Code Lookup
- Quick Command Reference
- Troubleshooting Flowcharts
- And more...

## Color Scheme

- Primary: #2563EB (Bright Blue)
- Secondary: #1E40AF (Deep Blue)
- Light: #F8FAFC (Off-white/Light Grey)
- Dark: #0F172A (Slate Black)
- Accent: #06B6D4 (Cyan)
