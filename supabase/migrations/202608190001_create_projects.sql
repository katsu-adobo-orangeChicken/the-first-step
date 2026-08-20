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

drop policy if exists "Anyone can read discovery projects" on public.projects;
create policy "Anyone can read discovery projects"
  on public.projects
  for select
  using (true);

drop policy if exists "Anyone can create discovery projects" on public.projects;
create policy "Anyone can create discovery projects"
  on public.projects
  for insert
  with check (true);

drop policy if exists "Anyone can update discovery project team metadata" on public.projects;
create policy "Anyone can update discovery project team metadata"
  on public.projects
  for update
  using (true)
  with check (true);
