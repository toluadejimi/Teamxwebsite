# Team X Technologies

Official website for **Team X Technologies Ltd** — a premium enterprise software company building banking platforms, government portals, healthcare systems, education solutions, AI products, and custom business software.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** design system (dark / light)
- **Framer Motion**, **GSAP-ready**, **Lenis** smooth scroll
- **Three.js** hero accents, **Swiper**, **react-countup**, **Lucide**
- SEO: metadata, Open Graph, sitemap, robots, JSON-LD

## Admin console

Visit [http://localhost:3000/admin](http://localhost:3000/admin)

Default password: set `ADMIN_PASSWORD` in `.env.local` (never commit it).

After password login you must complete **Google Authenticator 2FA** (first login shows a QR to scan).

| Section | What you manage |
|---------|-----------------|
| **Images** | Site image URLs / uploads |
| **Contact Info** | Email, phone, WhatsApp, Nigeria offices |
| **Job Postings** | Careers page listings |
| **Live Chat** | Reply to landing-page chatbot visitors |

CMS data: `data/cms.json` · 2FA secret: `data/security.json` · Uploads: `public/uploads/`

**Security notes:** React does not expose your server by itself. Keep `ADMIN_PASSWORD` strong, use HTTPS in production, never commit `.env` or `security.json`, and keep dependencies updated.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

## Key routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/about` | Company story, leadership, values |
| `/services` | Service catalog + mega menu destinations |
| `/services/[slug]` | 66+ service detail pages |
| `/industries` | Industry verticals |
| `/products` | Product suite |
| `/portfolio` | 18 enterprise projects |
| `/case-studies` | Implementation case studies |
| `/process` | Delivery methodology |
| `/technologies` | Technology stack |
| `/careers` | Jobs & culture |
| `/blog` | Insights |
| `/pricing` | Engagement models |
| `/contact` | Offices & form |
| `/request-quote` | Quote request |
| `/book-demo` | Demo booking |

## Design

- Display: **Syne** · Body: **Plus Jakarta Sans** · Mono: **JetBrains Mono**
- Accent: blue `#2563eb` (light) / `#3b82f6` (dark) on charcoal / soft light surfaces
- Theme toggle via `next-themes` (default: dark)

## Project structure

```
src/
  app/                 # Routes & SEO
  components/
    home/              # Home sections
    layout/            # Navbar, Footer, Providers
    ui/                # Design system primitives
    shared/            # Motion & decorative
  lib/data/            # Content & helpers
```

Replace Unsplash URLs in `src/lib/data/images.ts` with production assets when ready.
