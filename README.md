# Countdown Studio

A free, static (no build step) countdown tool with two modes — a timer that
counts down from a set duration, and a custom date countdown for tracking
birthdays, launch days, and other events down to the second. Bilingual UI:
English (default) / German toggle.

## Run locally

Just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```
npx serve .
```

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3, etc.) —
upload the folder as-is.

Before going live:

1. Replace `ca-pub-XXXXXXXXXXXXXXX` in `index.html` and the `pub-...` value in
   `ads.txt` with your real AdSense publisher ID once your account is approved.
2. Add your AdSense `<ins>` snippet inside the three `.ad-slot` placeholders in
   `index.html` (marked with comment blocks).
3. Update the `buymeacoffee.com` link in `index.html` if you want the support
   button to point elsewhere.

## Structure

- `index.html` — page markup, SEO meta tags, ad slot placeholders, tips modal.
- `style.css` — styling (dark/light auto, responsive).
- `script.js` — English/German text dictionary, timer logic, date-countdown
  logic, localStorage persistence for both events and language choice.
