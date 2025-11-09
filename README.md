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

## Files Structure

```
├── index.html              # Landing page
├── password-generator.html # Password generator tool
├── ip-lookup.html          # IP lookup tool
├── styles.css              # Shared styles
├── script.js               # Burger menu functionality
├── password-script.js      # Password generator logic
├── ip-lookup-script.js     # IP lookup logic
└── README.md              # This file
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

## Color Schemes

- Primary: #780000
- Secondary: #C1121F
- Light: #FDF0D5
- Dark: #003049
- Accent: #669BBC
