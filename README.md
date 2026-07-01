# CairoX — Beyond Limits

Premium dark, software & AI solutions agency website. Built with **React + Vite + TypeScript + Tailwind CSS + React Router**.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (defaults to http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The static site is output to `dist/` and can be deployed directly to Netlify, Vercel, or any static host.

## Where to change things

| What | File |
| --- | --- |
| Logo image | Put your file at `public/assets/logo.png`. If missing, the site falls back to the **CairoX** text logo (Cairo in white, X in red). |
| WhatsApp number | `src/data/siteConfig.ts` → `contact.whatsappNumber` (international format, no `+`) and `contact.whatsappDisplay` for the visible string. |
| Email address | `src/data/siteConfig.ts` → `contact.email` |
| Tagline / short description | `src/data/siteConfig.ts` |
| Services (list & details) | `src/data/services.ts` |
| Portfolio projects | `src/data/projects.ts` |
| Custom project landing pages | Add a component to `src/projectPages/` and attach it to a project via `customLandingPage` in `src/data/projects.ts`. See `src/projectPages/README.md`. |
| Global colors & theme | `tailwind.config.js` |
| SEO meta tags | `index.html` |

## Routing

- `/` — Home (includes the "Who We Are" section)
- `/services` — Services
- `/portfolio` — Portfolio grid
- `/contact` — Contact form + WhatsApp / email
- `/projects/:slug` — Generic project detail page (or a custom landing page if the project has one)

## Contact form (Netlify Forms)

The contact form posts to Netlify's built-in form handler — no backend required.

- The visible form in `src/pages/Contact.tsx` is named `contact` and includes the required Netlify attributes.
- A hidden form mirror at `public/__forms.html` lets Netlify detect the form fields at build time even though React swaps the DOM.
- After deploying to Netlify, submissions appear under **Forms** in the Netlify dashboard.

If you deploy elsewhere, swap the submit handler in `src/pages/Contact.tsx` for your own endpoint.

## Folder structure

```
src/
  assets/
  components/        # Navbar, Footer, Button, SectionHeader, ServiceCard, ProjectCard, Logo, ScrollToTop
  data/              # services.ts, projects.ts, siteConfig.ts
  pages/             # Home, Services, Portfolio, Contact, ProjectDetail, NotFound
  projectPages/      # Optional per-project custom landing pages (see README inside)
  App.tsx
  main.tsx
  index.css
public/
  assets/logo.png    # (optional — drop your logo here)
  favicon.svg
  _redirects         # SPA fallback for Netlify
  __forms.html       # Netlify forms detection
```
