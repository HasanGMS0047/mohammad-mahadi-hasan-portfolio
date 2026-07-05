# Mohammad Mahadi Hasan — Portfolio

Personal portfolio site for Mohammad Mahadi Hasan, a Computer Science & Engineering student at
United International University (UIU), Dhaka. Built with a Bauhaus-inspired red/black/yellow
design system, dark/light theming, and real project data.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- next-themes (dark/light persistence)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Editing content

All personal content (bio, skills, projects, activities, contact info) lives in a single file:
[`src/lib/data.ts`](src/lib/data.ts). Update that file to change what appears on the site.

## Contact form emails

The contact form sends email via [Resend](https://resend.com):

1. Sign up at resend.com (free) and create an API key.
2. Copy `.env.example` to `.env.local` and paste the key into `RESEND_API_KEY`.
3. Add the same `RESEND_API_KEY` under Vercel → Project → Settings → Environment Variables.

Without a verified custom domain, Resend only delivers to the email address you signed up
with — which is exactly what this form needs, since messages go to the site owner.

## Deployment

Deployed on [Vercel](https://vercel.com). Pushing to `main` triggers an automatic deploy.
