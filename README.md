# Ekiz Yazılım — Company Website

**Website and client funnel for [Ekiz Yazılım](https://ekizyazilim.com), a web and e-commerce studio in Denizli that builds websites, online stores and custom tools for local businesses.**

🌐 Live: [ekizyazilim.com](https://ekizyazilim.com)

## Overview

- **Portfolio** (`/isler`): client work, including live sites for schools, kindergartens and boutiques
- **Landing pages**: `/egitim` (student tracking system and websites for education institutions), `/web-sitesi` and `/e-ticaret`
- **Design inspiration quiz** (`/ilham`): helps clients express the style they want before a project starts
- **Project intake and appointment booking** (`/randevu`)
- Lead emails through Resend (with Formspree as fallback), plus generated OG/Twitter images, a web manifest and a sitemap
- Brand kit in `brand/`: logo, wordmark and "powered by" badges used in the footer of client sites

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS 4 · Motion · Resend · Vercel

## Site report

Generates a one-page A4 PDF health report for any website (SSL, speed, mobile, search visibility, domain expiry) to send to leads. Needs Chrome or Edge installed.

```bash
npm run site-report -- example.com --name "X Kurs"        # one site
npm run site-report -- --csv leads.csv                     # many sites (columns: name,url)
```

Output goes to `reports/` (git-ignored): `<site>.pdf`, `.html`, `.json`, and `summary.csv` for batches. Add `--psi` for the Google mobile speed score (set `PSI_API_KEY` if the free quota runs out), `--no-pdf` to skip the PDF.

## Development

```bash
npm install
npm run dev
```
