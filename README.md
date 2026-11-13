# Funkware website

A fast, single-page static site: plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html    all page content (edit text here)
styles.css    design — brand colors are at the top in :root
script.js     menu, scroll effects, contact form; CONTACT_EMAIL at the top
favicon.svg   logo mark (also used in the header and footer)
```

## Before you launch

1. **Email** — set `CONTACT_EMAIL` at the top of `script.js` to your real inbox.
2. **Text** — skim `index.html` and adjust anything that doesn't match how you work
   (budget ranges in the contact form, "within one business day", engagement types).
3. **Domain** — once you have one, add `<link rel="canonical" href="https://yourdomain/">`
   and an `og:url` meta tag in the `<head>`.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

On Windows PowerShell, if you see "running scripts is disabled on this system", use `npx.cmd serve .`
(or `python -m http.server 4173`) instead.

## Publish (free options)

- **Netlify** — drag this folder onto https://app.netlify.com/drop
- **Cloudflare Pages** or **Vercel** — connect a Git repo containing this folder; no build command, output directory `/`.
- **GitHub Pages** — push to a repo, then Settings → Pages → deploy from branch.

## Contact form

By default the form opens the visitor's email app with their message pre-filled
(works with no server). To receive submissions directly instead:

- **Netlify Forms**: add `name="contact" data-netlify="true" method="POST"` to the `<form>` and
  remove the submit handler in `script.js`.
- **Formspree**: set `action="https://formspree.io/f/<your-id>" method="POST"` on the `<form>`
  and remove the submit handler in `script.js`.
