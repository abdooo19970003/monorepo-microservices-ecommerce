# E-commerce Microservices Monorepo

This repository is an e-commerce platform built as a Turborepo-style monorepo. It includes Next.js frontend(s), shared UI packages and microservices (example: payment-service). The goal is a realistic, modular codebase for development and experimentation.

## Contents
- apps/web — Next.js storefront
- apps/docs — Next.js docs (if present)
- apps/payment-service — Hono + Stripe payment microservice
- packages/* — shared code (types, ui, utils)

## Quick start (developer machine)

Prerequisites
- Node.js v18+ (or the version specified in .nvmrc)
- pnpm / npm / yarn (examples below use pnpm)
- Git

Clone
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Install
```bash
# using pnpm
pnpm install

# or npm
# npm install

# or yarn
# yarn install
```

Run services locally
Option A — run each app manually:
```bash
# Start web (Next.js)
cd apps/web
pnpm dev

# In a separate terminal, start the payment service
cd ../../apps/payment-service
pnpm dev
```

Option B — run in parallel from repo root (if scripts are configured)
```bash
# Example: repo root may expose a dev script that starts services in parallel
pnpm dev
```

Open http://localhost:3000 (web) and http://localhost:8002 (payment-service) or the ports printed by each service.

## Environment variables

Create per-app .env files (examples below). Never commit real secrets.

apps/web/.env.local
```env
# filepath: apps/web/.env.local
NEXT_PUBLIC_STRIPE_PK=pk_test_...
NEXT_PUBLIC_PAYMENT_SERVICE_URL=http://localhost:8002
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_clerk_...
# any other NEXT_PUBLIC_* used in the web app
```

apps/payment-service/.env
```env
# filepath: apps/payment-service/.env
STRIPE_SECRET_KEY=sk_test_...
PAYMENT_SERVICE_PORT=8002
# optional: DATABASE_URL, REDIS_URL, or other secrets your service needs
```

Important: the frontend must receive a PaymentIntent client_secret (pi_..._secret_...) for Stripe Elements. If your payment-service creates a Checkout Session, expand or create the underlying PaymentIntent and return its client_secret to the frontend. Checkout Session client secrets (cs_...) are not compatible with Elements.

## Debugging tips
- Ensure `apps/web` files using React hooks have `"use client"` as the very first non-comment line.
- Log values returned from the payment-service to confirm you return a `pi_..._secret_...`.
- Check browser console/network and the payment-service logs for errors.

## Tests & linting
- Run tests (if present):
```bash
pnpm test
```
- Lint:
```bash
pnpm lint
```

## Contributing (pro developer workflow)
1. Fork the repo and clone your fork.
2. Create a feature branch:
```bash
git checkout -b feat/your-feature
```
3. Install and run the app locally, add tests for new behavior.
4. Follow the project's linting and formatting rules. Run:
```bash
pnpm lint
pnpm format
```
5. Commit with clear messages:
```bash
git add .
git commit -m "feat(payments): add payment-intent creation endpoint"
```
6. Push and open a Pull Request against the main repository. Include:
   - Short description of the change
   - How to run/test locally
   - Any env vars required
7. Address review comments, keep PRs small and focused.

## Maintainership notes
- Keep secrets out of the repo.
- Prefer creating PaymentIntents for direct Elements integrations.
- Use shared types in `@repo/types` to avoid duplication across apps/services.

## Contact / Support
For questions or issues, open an issue in the repository with reproduction steps and relevant logs.
