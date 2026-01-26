This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication (Better Auth)

This project uses [Better Auth](https://www.better-auth.com) for authentication.

### Setup

1. Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required:

- `DATABASE_URL` - Your MongoDB connection string
- `BETTER_AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXT_PUBLIC_APP_URL` - Your app URL (http://localhost:3000 for development)

Optional (for OAuth providers):

- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

2. Push the database schema:

```bash
pnpm db:push
```

### Routes

- Sign In: `/sign-in`
- Sign Up: `/sign-up`
- Dashboard: `/dashboard` (protected)

All routes except `/`, `/sign-in`, and `/sign-up` are protected via `proxy.ts` middleware.

### Features

- ✅ Email & Password authentication
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Session management
- ✅ Protected routes

For detailed migration information, see [MIGRATION.md](./MIGRATION.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
