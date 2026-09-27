# KiriList AI

A modern front-end MVP for a Kiribati-focused marketplace assistant. It helps sellers create stronger listing copy, estimate local prices, and compare delivery options before posting.

## Architecture

- Front end: static HTML/CSS/JS, deployable to GitHub Pages
- Back end: Google Apps Script for form submissions and spreadsheet storage
- Data layer: Google Sheets

## Features

- Product form for marketplace listings
- AI-style title and description generation
- Suggested price in AUD based on category, condition, age, and location
- Delivery and trust-building tips for local buyers
- Clean, modern landing-page style design for quick demos and product validation

## Run locally

```bash
node server.js
```

Then open http://localhost:3000 in your browser.

## Deployment

See `DEPLOYMENT.md` for GitHub Pages and Google Apps Script setup details.

## Project files

- `index.html` – landing page and listing builder interface
- `style.css` – modern responsive styling
- `script.js` – pricing logic and listing generation
- `apps-script-backend.gs` – backend script for Google Apps Script
- `server.js` – local static server for testing
- `DEPLOYMENT.md` – deployment and integration guide

## Suggested next steps

1. Connect the frontend submit action to the Apps Script Web App URL.
2. Add a real AI text-generation API step for richer listing copy.
3. Save all generated listings to Google Sheets for review and analytics.
4. Expand to seller dashboards, inventory tracking, and transport booking.
