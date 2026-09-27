# GitHub Pages + Google Apps Script deployment

This project is designed to be hosted as a static frontend on GitHub Pages while the backend logic is handled by Google Apps Script.

## 1) Frontend on GitHub Pages

1. Create a GitHub repository.
2. Upload the site files (`index.html`, `style.css`, `script.js`, and any assets).
3. In GitHub, open the repository settings.
4. Go to Pages.
5. Select the main branch and the root folder.
6. Save. GitHub will provide a live URL like:
   `https://yourusername.github.io/your-repo-name/`

## 2) Apps Script backend

1. Open https://script.google.com.
2. Create a new project.
3. Paste the contents of `apps-script-backend.gs`.
4. In the script, a Google Sheet named `Listings` will be created automatically when the script runs. You can also create it manually first.
5. Deploy as a Web App:
   - Click Deploy → New deployment
   - Choose Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy
   - Copy the Web App URL when prompted
6. Keep the URL. This is the value you will plug into the frontend.

## 3) Connect the frontend to the backend

Edit the value in `index.html`:

```html
<script>
  window.KIRILIST_API_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
</script>
```

Replace it with your own Apps Script Web App URL.

The script already reads it in `script.js`:

```js
const API_URL = window.KIRILIST_API_URL || 'https://script.google.com/macros/s/AKfycb.../exec';
```

The form submit flow posts this JSON:

```js
fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productName: productInput.value,
    category: categoryInput.value,
    condition: conditionInput.value,
    location: locationInput.value,
    targetPrice: targetPriceInput.value,
    age: ageInput.value,
    delivery: deliveryInput.value,
    notes: notesInput.value,
    listingTitle: listingTitle.textContent,
    listingDescription: listingDescription.textContent,
    suggestedPrice: suggestedPrice.textContent,
    marketStatus: marketPulse.textContent,
  })
});
```

## 4) Final production checklist

- Push updates to GitHub.
- Enable GitHub Pages in the repo settings.
- Confirm the site loads correctly.
- Submit a test listing from the front end.
- Open the connected Google Sheet and confirm the row is saved.

## 5) Custom domain for GitHub Pages

If you want a custom domain like `marketplace.ki` or `kirilist.ai`:

1. Buy a domain from a registrar such as Namecheap, Porkbun, or Cloudflare.
2. In GitHub repo → Settings → Pages, add your custom domain.
3. GitHub will provide DNS records to add to your registrar.
4. Add the DNS records:
   - A record: pointing to GitHub Pages IPs (GitHub publishes the exact IPs in the Pages settings)
   - or CNAME record: `www` → `yourusername.github.io`
5. Wait for DNS propagation.
6. Enable HTTPS in GitHub Pages.

Recommended approach:
- Use the root domain for the landing site.
- Optionally add `www` as a redirect if you want a branded path.

## 6) Security and operational notes

- Keep the Apps Script Web App set to “Anyone” only if you are comfortable with public form submissions.
- For a production app, consider adding a simple verification key or a lightweight anti-spam check.
- Back up the Google Sheet regularly.
- Use a custom domain for trust and branding.

## 7) Optional improvements

- Add automatic email notifications for new leads.
- Save generated listing data to a Google Sheet for follow-up.
- Add AI prompt integration with OpenAI or Gemini using Apps Script API calls.
- Add basic seller login or admin dashboard.

This setup keeps the frontend lightweight and the backend flexible without needing a full server.
