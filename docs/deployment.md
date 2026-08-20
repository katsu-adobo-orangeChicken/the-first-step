# Deployment

This MVP deploy path is meant to verify cross-device project persistence through
Supabase. Authentication is not required for this first test.

## What Persists

When both Vite environment variables are configured, the career catalog module
uses Supabase for:

- project discovery lists
- project detail pages
- project creation
- public project joins
- private project join request metadata

Onboarding drafts and generated workspaces still use browser `localStorage`, so
they are device-local until the auth/profile backend is added.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run `supabase/migrations/202608190001_create_projects.sql`.
4. Copy the project URL and anon key from Supabase project settings.

The starter row-level security policies intentionally allow anonymous read,
create, and update access for fast persistence testing. Replace these policies
with authenticated user policies before sharing the app broadly.

## Vercel Setup

Import this repository into Vercel and use the defaults from `vercel.json`:

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Add these environment variables in Vercel project settings:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Redeploy after saving environment variables.

## Persistence Test

1. Open the deployed app on machine A.
2. Go to `/discover`.
3. Create a project.
4. Open the deployed app on machine B.
5. Go to `/discover`.
6. Confirm the new project appears.

If the project does not appear, check that the Vercel deployment has both
environment variables and that the `projects` table exists in Supabase.
