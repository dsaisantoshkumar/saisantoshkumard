# saisantoshkumard

Personal portfolio site for Sai Santosh Kumar Devarasetty, Backend Software Developer.

## Structure

```
saisantoshkumard/
├── index.html          Single-page site: about, skills, experience, projects, certifications, education, contact
├── css/
│   └── style.css        All styling. Palette, type, layout, responsive rules.
├── js/
│   └── main.js           Contact form (EmailJS), mobile nav toggle, scroll-spy nav highlighting
├── assets/
│   ├── favicon.svg       Placeholder monogram favicon
│   └── profile.jpg       Add your photo here (see below)
└── README.md
```

## Adding your profile photo

The sidebar currently shows an "SD" monogram in place of a photo. To add the real photo:

1. Save your headshot into `assets/` as `profile.jpg` (or update the filename below to match).
2. In `index.html`, find the `.avatar` div near the top of `<aside class="sidebar">` and replace:

   ```html
   <div class="avatar" aria-hidden="false">
     <span>SD</span>
   </div>
   ```

   with:

   ```html
   <div class="avatar" aria-hidden="false">
     <img src="assets/profile.jpg" alt="Sai Santosh Kumar Devarasetty">
   </div>
   ```

No CSS changes are needed, `.avatar img` is already styled to fill the circle.

## Contact form / EmailJS

The contact form reuses the exact EmailJS configuration from dsaisantoshkumar.github.io, so it behaves identically:

- Service ID: `service_yxemoqc`
- Template ID: `template_836mkd8`
- Public key: `fof2kfSPzOm-gRMrI`
- Template variables sent: `from_name`, `from_email`, `subject`, `message`, `to_email` (fixed to dsaisantoshkumar@gmail.com)

These live in `js/main.js`. Because the field IDs and template variable names match the original site's form, messages will arrive in the same EmailJS template/inbox.

## Running locally

This is a static site with no build step. Open `index.html` directly in a browser, or serve the folder with any static server, for example:

```
npx serve .
```

## Deploying to GitHub Pages

1. Push this folder's contents to the root of a repository named `saisantoshkumard`.
2. In the repo, go to Settings > Pages, set Source to the `main` branch, root folder.
3. The site will be published at `https://<your-username>.github.io/saisantoshkumard/`.
