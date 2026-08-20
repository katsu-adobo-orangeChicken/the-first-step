# Supabase backend setup

1. Create a Supabase project.
2. Add the following environment variables to your Vite app:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
3. Create the `projects` table.
4. Enable read access for anonymous users or configure proper auth-based policies.

## Pasteable starter SQL

Run `supabase/migrations/202608190001_create_projects.sql` in the Supabase SQL
editor for the first discovery-page backend pass. The SQL is duplicated below
for convenience.

```sql
create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text[] not null default '{}',
  difficulty text not null default 'Beginner',
  permission text not null default 'public',
  final_outcome text not null default 'Project portfolio artifact',
  team_size text not null default '1/1',
  member_ids text[] not null default '{}',
  join_request_ids text[] not null default '{}',
  current_member_count integer not null default 1,
  max_team_size integer not null default 1,
  long_description text,
  image_url text,
  created_by text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.projects enable row level security;

create policy "Anyone can read discovery projects"
  on public.projects
  for select
  using (true);

create policy "Anyone can create discovery projects"
  on public.projects
  for insert
  with check (true);

create policy "Anyone can update discovery project team metadata"
  on public.projects
  for update
  using (true)
  with check (true);
```

## Optional seed project

```sql
insert into public.projects (
  title,
  description,
  category,
  difficulty,
  permission,
  final_outcome,
  team_size,
  member_ids,
  join_request_ids,
  current_member_count,
  max_team_size,
  long_description,
  image_url,
  created_by
) values (
  'Community Food Drive',
  'Coordinate volunteers, collect donations, and support local families through a weekend food distribution event.',
  array['Community', 'Education'],
  'Beginner',
  'public',
  'Community event plan',
  '4/8',
  array['seed-member-1', 'seed-member-2', 'seed-member-3', 'seed-member-4'],
  array[]::text[],
  4,
  8,
  'This starter project focuses on coordination, communication, and community impact.',
  '/images/placeholder-project.svg',
  'seed'
);
```

The app reads from Supabase when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
are present. If either value is missing, discovery falls back to the local mock
projects for development.

Project creation also writes to Supabase when those environment variables are
present. When Supabase is configured, list, detail, create, and team metadata
updates are treated as backend operations. If one of those requests fails, the UI
shows an error instead of falling back to mock data.
