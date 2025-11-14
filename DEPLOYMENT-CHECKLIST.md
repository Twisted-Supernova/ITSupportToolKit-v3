# Security Deployment Checklist

## Pre-Deployment Checklist

### ✓ Files to Add/Commit
- [ ] netlify.toml (security headers and caching)
- [ ] 404.html (custom error page)
- [ ] _redirects (Netlify redirects configuration)
- [ ] .gitignore (prevent committing sensitive files)
- [ ] SECURITY.md (security documentation)

### ✓ Code Review
- [ ] Remove any console.log() with sensitive data
- [ ] Remove any commented-out API keys or credentials
- [ ] Check for any TODO comments with security implications
- [ ] Verify all external API calls use HTTPS
- [ ] Confirm no eval() or Function() constructors used

### ✓ Testing Locally
- [ ] All tools work correctly
- [ ] Navigation functions properly
- [ ] Mobile responsive on all pages
- [ ] Copy-to-clipboard works
- [ ] External APIs return data correctly

## Deployment Steps

### 1. Commit Security Files
```bash
cd /path/to/ITSupportToolKit-v3

# Add all security files
git add netlify.toml
git add 404.html
git add _redirects
git add .gitignore
git add SECURITY.md

# Commit
git commit -m "Added security configuration: headers, 404 page, redirects"

# Push to GitHub
git push origin main
```

### 2. Netlify Configuration
After deployment, verify in Netlify dashboard:

**Domain Settings:**
- [ ] Custom domain configured (if applicable)
- [ ] DNS settings correct
- [ ] SSL certificate provisioned (automatic)
- [ ] Force HTTPS enabled: Settings → Domain management → HTTPS

**Build Settings:**
- [ ] Build command: (leave empty or "echo 'Static site'")
- [ ] Publish directory: . (root)
- [ ] Deploy previews enabled

**Asset Optimization (Optional):**
- [ ] Settings → Build & deploy → Post processing
- [ ] Enable: Bundle CSS, Minify CSS, Minify JS
- [ ] Enable: Pretty URLs (remove .html extensions)

## Post-Deployment Verification

### 3. Security Testing

**Test Security Headers:**
```bash
# Replace with your actual domain
curl -I https://your-site.netlify.app
```

Expected headers:
- `strict-transport-security: max-age=31536000`
- `x-frame-options: DENY`
- `x-content-type-options: nosniff`
- `x-xss-protection: 1; mode=block`
- `content-security-policy: ...`
- `permissions-policy: ...`

**Automated Security Scans:**
- [ ] https://securityheaders.com - Target: A+
- [ ] https://www.ssllabs.com/ssltest/ - Target: A+
- [ ] https://observatory.mozilla.org - Target: A+

### 4. Functional Testing

Test each tool:
- [ ] Password Generator - generates and copies
- [ ] Username Generator - generates correctly
- [ ] IP Lookup - returns geolocation data
- [ ] Port Reference - search works
- [ ] MAC Lookup - identifies vendor
- [ ] DNS Lookup - returns DNS records
- [ ] WHOIS Lookup - returns domain info
- [ ] Hash Generator - generates all hash types
- [ ] JSON Formatter - validates and formats
- [ ] Encoder/Decoder - encodes/decodes correctly
- [ ] Timestamp Converter - converts timestamps
- [ ] Error Lookup - finds Windows errors
- [ ] NTFS Permissions - generates icacls commands
- [ ] Firewall Builder - generates netsh/ufw commands
- [ ] AD Group Simulator - calculates memberships

### 5. Cross-Browser Testing
Test on:
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Edge (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (iOS)

### 6. Performance Testing
- [ ] Lighthouse score > 90 (run in Chrome DevTools)
- [ ] PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Load time < 2 seconds on 3G

## Monitoring Setup

### 7. Optional Monitoring
If you want analytics:

**Netlify Analytics (Paid):**
- Settings → Analytics → Enable

**Google Analytics (Free):**
Add to all HTML files before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Update CSP in netlify.toml:
```toml
connect-src 'self' https://www.google-analytics.com https://dns.google ...
```

## Maintenance Schedule

### Weekly
- [ ] Check Netlify deploy status
- [ ] Review any error logs

### Monthly
- [ ] Re-run security header tests
- [ ] Check API rate limits not exceeded
- [ ] Review analytics (if enabled)
- [ ] Update SECURITY.md if needed

### Quarterly
- [ ] Full security audit
- [ ] Review and update CSP if needed
- [ ] Check for broken external links
- [ ] Test all tools thoroughly

## Rollback Plan

If issues after deployment:

**Immediate Rollback:**
```bash
# In Netlify dashboard:
Deploys → [Previous successful deploy] → Publish deploy
```

**Fix and Redeploy:**
```bash
# Fix locally
git add [fixed-files]
git commit -m "Fixed [issue]"
git push origin main
```

## Success Criteria

Deployment is successful when:
- [ ] All security tests pass (A+ grades)
- [ ] All 17 tools function correctly
- [ ] Mobile responsive works on all pages
- [ ] Navigation dropdowns work
- [ ] 404 page displays correctly
- [ ] External API calls succeed
- [ ] No console errors
- [ ] HTTPS certificate valid
- [ ] Load time < 2 seconds

## Support

If issues arise:
1. Check Netlify deploy logs
2. Review browser console for errors
3. Test with curl to verify headers
4. Check SECURITY.md for troubleshooting

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Netlify URL:** _______________
**Custom Domain:** _______________
**Security Test Results:**
- Security Headers: _______________
- SSL Labs: _______________
- Mozilla Observatory: _______________
