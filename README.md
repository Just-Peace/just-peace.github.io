# Just-Peace Organization Website & Ballot Helper Landing

The official landing page for **Just-Peace** (`www.just-peace.org`), directing voters to **Pallot** (`pallot.just-peace.org`), an open-source civic technology platform helping voters research candidates and prepare for Election Day.

---

## 🚀 Quick Setup & Deployment

### 1. Push to GitHub
Create a repository named `just-peace.github.io` in the [Just-Peace](https://github.com/Just-Peace) organization on GitHub, then push from this folder:

```bash
# Inside C:\Users\Fahd Siddiqui\PycharmProjects\just-peace.github.io
git add .
git commit -m "Initial release: Just-Peace landing page and Pallot guide"
git branch -M main
git push -u origin main
```

*(Note: The remote `origin` is already pre-configured to `https://github.com/Just-Peace/just-peace.github.io.git`)*

---

## 🌐 Cloudflare DNS Configuration for `www.just-peace.org`

To point your custom domain `www.just-peace.org` through Cloudflare to GitHub Pages:

### Step 1: Add DNS Record in Cloudflare Dashboard
Navigate to **Cloudflare Dashboard** &rarr; Select domain **just-peace.org** &rarr; **DNS** &rarr; **Records**:

| Type | Name | Content / Target | Proxy status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `just-peace.github.io` | **Proxied** (Orange Cloud) | Auto |

> **Apex Domain (`just-peace.org`):**
> To ensure anyone visiting `just-peace.org` is redirected to `www.just-peace.org`, create a **Redirect Rule** in Cloudflare:
> - Go to **Rules** &rarr; **Redirect Rules** &rarr; **Create rule**
> - **Rule name**: `Redirect Apex to WWW`
> - **Field**: `Hostname` equals `just-peace.org`
> - **Type**: `Dynamic` (or Static)
> - **URL**: `concat("https://www.just-peace.org", http.request.uri.path)`
> - **Status code**: `301 Moved Permanently`

### Step 2: Cloudflare SSL/TLS Setting
In Cloudflare Dashboard &rarr; **SSL/TLS**:
- Set encryption mode to **Full** or **Full (strict)**.
  *(Do not use "Flexible", as it causes a redirect loop with GitHub Pages HTTPS enforcement).*

### Step 3: Verify in GitHub Pages
In your GitHub repo:
1. Go to **Settings** &rarr; **Pages**.
2. **Build and deployment**: Source &rarr; `Deploy from a branch` &rarr; Branch: `main` / `/ (root)`.
3. **Custom domain**: Ensure `www.just-peace.org` is set and save.
4. Check **Enforce HTTPS**.

---

## 📁 Repository Structure

```text
just-peace.github.io/
├── CNAME                  # Custom domain configuration for GitHub Pages (www.just-peace.org)
├── .gitignore             # Standard git exclusions
├── index.html             # High-performance, semantic 1-page landing site
├── assets/
│   ├── css/
│   │   ├── app.css        # Authentic stylesheet shared with Pallot
│   │   └── landing.css    # Landing layout and styling components
│   ├── js/
│   │   ├── theme.js       # Zero-flash dark/light theme loader
│   │   └── main.js        # Theme toggle, clipboard copy, and interactions
│   └── img/
│       ├── favicon.svg    # Brand emblem (US + Palestine peace icon)
│       ├── qr-code.png    # Mobile QR code for pallot.just-peace.org
│       └── flyer-preview.png
└── README.md              # Setup and deployment documentation
```

---

## ⚖️ License
Code is licensed under the [MIT License](https://opensource.org/licenses/MIT).
