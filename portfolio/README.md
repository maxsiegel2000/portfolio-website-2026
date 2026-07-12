# Portfolio Website

Next.js portfolio with Sanity content, Clerk authentication and an authenticated OpenAI ChatKit integration.

## Local development

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Install dependencies with `bun install --frozen-lockfile`.
3. Start the app with `bun run dev`.

## Required environment variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_WRITE_TOKEN` — server-only token used for contact submissions
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`
- `OPENAI_API_KEY`

Published Sanity content is read without a token. Never expose `SANITY_API_WRITE_TOKEN` through a `NEXT_PUBLIC_` variable or a browser client.

## Verification

```bash
bun run lint
bunx tsc --noEmit
bun run build
```

## Vercel deployment

- Set the project Root Directory to `portfolio`.
- Add all required environment variables for Production and Preview.
- Use Clerk production keys (`pk_live_…` and `sk_live_…`) in Production.
- Configure the production domain in Clerk and add the deployed origin to the Sanity project's CORS origins.
- Rotate the Sanity write token whenever it may have been exposed.

The in-process rate limiter is a lightweight first layer. For strict global limits across serverless instances, replace it with a shared store such as Vercel KV or Upstash Redis.
