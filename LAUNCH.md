# KiriList AI launch guide

This guide is for launching the site on GitHub Pages and connecting it to Google Apps Script.

## 1) Prepare the repository

Recommended repo name for this project:

```text
kirilist-ai
```

From your local project folder:

```bash
git init
git add .
git commit -m "Initial KiriList AI launch"
git branch -M main
```

Then create the GitHub repository in the browser:

- Go to https://github.com
- Click New repository
- Name it: `kirilist-ai`
- Choose Public or Private
- Do not initialize with README if you already have files
- Create repository

Then connect your local repo:

```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/kirilist-ai.git
git push -u origin main
```

Example with a sample username:

```bash
git remote add origin https://github.com/moten/kirilist-ai.git
git push -u origin main
```

If you prefer GitHub CLI:

```bash
gh auth login
gh repo create kirilist-ai --public --source=. --remote=origin --push
```

## 2) Turn on GitHub Pages

In the GitHub repository:

1. Open Settings
2. Open Pages
3. Under Build and deployment, choose Source: Deploy from a branch
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

GitHub will provide a live URL like:

```text
https://<YOUR_USERNAME>.github.io/kirilist-ai/
```

## 3) Deploy the Apps Script backend

1. Open https://script.google.com
2. Create a new project
3. Paste the contents of `apps-script-backend.gs`
4. Save the project
5. Click Deploy → New deployment
6. Choose type: Web app
7. Execute as: Me
8. Who has access: Anyone
9. Click Deploy
10. Copy the Web App URL

Example format:

```text
https://script.google.com/macros/s/AKfycb.../exec
```

## 4) Connect the frontend to the backend

Open `index.html` and replace the placeholder URL:

```html
<script>
  window.KIRILIST_API_URL = 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_WEB_APP_ID/exec';
</script>
```

This is the exact value used by `script.js`:

```js
const API_URL = window.KIRILIST_API_URL || 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_WEB_APP_ID/exec';
```

Important: do not leave the placeholder URL in production.

## 5) Upload the final repo state

After updating the URL, commit and push again:

```bash
git add .
git commit -m "Connect Apps Script and prepare launch"
git push origin main
```

GitHub Pages will rebuild automatically after a few minutes.

## 6) Validate launch

Check these three things:

1. GitHub Pages site loads
   - Example: `https://<YOUR_USERNAME>.github.io/kirilist-ai/`
2. The listing form appears and works
3. A test listing submission writes to the Google Sheet

Open the Google Sheet created or used by the Apps Script backend and verify the new row appears.

## 7) Optional: custom domain

If you want a branded domain:

1. Buy a domain from a registrar
2. In GitHub repo → Settings → Pages, add the domain
3. Add the required DNS records at your registrar
4. Wait for DNS verification
5. Enable HTTPS

Common setup:

- CNAME: `www` → `<YOUR_USERNAME>.github.io`
- or root A records pointing to GitHub Pages IPs

## 8) Production checklist

- [ ] GitHub repo created
- [ ] Site pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Apps Script Web App deployed
- [ ] Frontend API URL updated
- [ ] Google Sheet receives test data
- [ ] HTTPS enabled if using custom domain
- [ ] Final launch URL confirmed

## 9) Recommended launch URL

For the MVP, use:

```text
https://<YOUR_USERNAME>.github.io/kirilist-ai/
```

For a custom domain later:

```text
https://kirilist.ai
```

This setup keeps the frontend cheap and simple while giving you a flexible backend for future AI features, seller dashboards, and saved listings.
