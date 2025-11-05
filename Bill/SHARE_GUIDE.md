# How to Share Your Website with Friends

Your website is currently running on **http://localhost:8000** (local only).

## Option 1: Use Cloudflare Tunnel (Recommended - Free & Easy)

1. Download Cloudflare Tunnel from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation
2. Or use this quick command:
   ```powershell
   # Download cf tunnel (if you have it) or use online service
   ```

## Option 2: Use ngrok (Free)

1. Download ngrok from: https://ngrok.com/download
2. Extract and run:
   ```powershell
   ngrok http 8000
   ```
3. Copy the public URL (e.g., https://abc123.ngrok.io) and share it!

## Option 3: Use Online Tunneling Service (No Installation)

1. Visit: https://localhost.run or https://serveo.net
2. While your server is running on port 8000, run:
   ```bash
   ssh -R 80:localhost:8000 serveo.net
   ```
   Or use the web interface at localhost.run

## Option 4: Deploy to GitHub Pages (Permanent Solution)

1. Create a GitHub repository
2. Upload your files (index.html, styles.css, script.js)
3. Enable GitHub Pages in repository settings
4. Share the GitHub Pages URL

## Option 5: Use Netlify Drop (Easiest - Drag & Drop)

1. Visit: https://app.netlify.com/drop
2. Drag and drop your folder containing index.html, styles.css, and script.js
3. Get instant public URL to share!

---

**Quick Start: Keep your server running and try Option 5 (Netlify Drop) - it's the fastest!**

