# Just-Peace Organization Website & Ballot Helper Landing

The official landing page for **Just-Peace** ([`www.just-peace.org`](https://www.just-peace.org)), featuring **Pallot** ([`pallot.just-peace.org`](https://pallot.just-peace.org)), an open-source civic technology platform helping voters research candidates and prepare for Election Day.

---

## 🚀 Repository & Deployment

- **Repository**: `git@github.com:Just-Peace/just-peace.github.io.git`
- **Primary Branch**: `develop`
- **Custom Domain**: `www.just-peace.org` (via Cloudflare DNS + GitHub Pages `CNAME`)

```bash
# Push to GitHub
git push -u origin develop
```

---

## 🌐 Cloudflare DNS Configuration for `www.just-peace.org`

To serve `www.just-peace.org` through Cloudflare:

### 1. Add CNAME in Cloudflare Dashboard
Navigate to **Cloudflare Dashboard** &rarr; Select **just-peace.org** &rarr; **DNS** &rarr; **Records**:

| Type | Name | Content / Target | Proxy status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `just-peace.github.io` | **Proxied** (Orange Cloud) | Auto |

### 2. Redirect Apex (`just-peace.org`) to `www.just-peace.org`
In Cloudflare:
- Go to **Rules** &rarr; **Redirect Rules** &rarr; **Create rule**:
  - **Rule name**: `Redirect Apex to WWW`
  - **When incoming requests match**: `Hostname` equals `just-peace.org`
  - **Type**: `Dynamic`
  - **Expression**: `concat("https://www.just-peace.org", http.request.uri.path)`
  - **Status code**: `301 Moved Permanently`

### 3. SSL/TLS Setting
In Cloudflare &rarr; **SSL/TLS**:
- Set encryption mode to **Full** or **Full (strict)**.

### 4. GitHub Pages Settings
1. In `https://github.com/Just-Peace/just-peace.github.io`, open **Settings** &rarr; **Pages**.
2. **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `develop` / `/(root)`
3. **Custom domain**: Ensure `www.just-peace.org` is configured and check **Enforce HTTPS**.

---

## 📁 Repository Structure

```text
just-peace.github.io/
├── CNAME                  # GitHub Pages custom domain (www.just-peace.org)
├── LICENSE                # MIT License
├── README.md              # Documentation and deployment guide
├── robots.txt             # Search engine crawling rules
├── sitemap.xml            # Search engine sitemap
├── settings.txt           # Site and repository configuration metadata
├── .gitignore             # Standard git exclusions
├── index.html             # High-performance, semantic 1-page landing site
└── assets/
    ├── css/
    │   ├── app.css        # Authentic stylesheet shared with Pallot
    │   └── landing.css    # Landing layout and styling components
    ├── js/
    │   ├── theme.js       # Zero-flash dark/light/system theme loader
    │   └── main.js        # Theme toggle, clipboard copy, and animation
    └── img/
        ├── favicon.svg    # Brand emblem (US + Palestine peace icon)
        ├── qr-code.png    # Mobile QR code for pallot.just-peace.org
        └── flyer-preview.png
```

---

## ⚖️ License
Code is released under the [MIT License](LICENSE).
