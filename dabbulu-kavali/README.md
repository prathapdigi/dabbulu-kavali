# Dabbulu Kavali — Finance publishing website

A Next.js full-stack starter for a financial education blog, with a Prisma database, admin CMS, SEO metadata, sitemap, robots.txt and AdSense placeholders.

## Run locally
1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env` and change `ADMIN_PASSWORD` and `SESSION_SECRET`.
3. Install dependencies: `npm install`
4. Create database tables: `npm run db:push`
5. Add starter article: `npm run db:seed`
6. Start: `npm run dev`
7. Open `http://localhost:3000`; admin is at `/admin`.

## Daily publishing workflow
Open `/admin`, sign in, write an original article, add an accurate summary and SEO title/description, then publish. This starter does not automatically generate or publish financial advice. Review all facts, dates, rates, tax rules and links before publishing.

## AdSense setup
- Apply to AdSense only after the site has substantial original, useful content, working navigation, About, Contact and Privacy Policy pages, and a custom domain/site that you control.
- Set `NEXT_PUBLIC_ADSENSE_CLIENT` to your approved `ca-pub-...` publisher ID and `NEXT_PUBLIC_ADSENSE_SLOT_HOME` to the approved ad slot ID.
- Add the official AdSense script to `app/layout.tsx` after approval. Do not click your own ads, ask others to click, buy traffic, or place ads in misleading positions.
- AdSense approval and revenue are not guaranteed. Free preview hosts may not be suitable for final AdSense review; use a domain you control for production.
- Add and verify `ads.txt` exactly as provided by AdSense once your account is approved.

## Before production
This is an MVP scaffold, not yet production hardened. Add rate limiting, CSRF protection, password reset, admin logout, rich-text sanitization, image upload validation, database backups, privacy/cookie consent where required, About/Contact/Privacy/Editorial Policy pages, and migrate SQLite to managed PostgreSQL. Deploy on a provider that supports Next.js and persistent/managed database storage.

## Content safety
Financial articles should be educational, sourced, dated and reviewed. Avoid guaranteed-return claims, personalized investment recommendations, or stale rates. Include source links and a clear disclaimer.

## Bilingual editorial workflow
- Admin CMS accepts English and Telugu titles, summaries and article bodies.
- New content is saved as DRAFT by default; it is never auto-published.
- Review translations, verify finance facts against official sources, then click Approve & publish.
- Public article page displays English first and Telugu below when a Telugu version is provided.
- Suggested daily target: three quality articles across saving/budgeting, banking/digital payments, and investing education/tax awareness.
