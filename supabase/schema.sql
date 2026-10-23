create table sections (
  key text primary key,
  position int not null default 0,
  visible boolean not null default true,
  content jsonb not null default '{}',
  updated_at timestamptz default now()
);
create table callbacks (
  id bigint generated always as identity primary key,
  name text, phone text, insurance text, message text,
  created_at timestamptz default now()
);
alter table sections enable row level security;
alter table callbacks enable row level security;
create policy "public read" on sections for select using (true);
create policy "admin write" on sections for all to authenticated using (true) with check (true);
create policy "anyone can request" on callbacks for insert to anon, authenticated with check (true);
create policy "admin read" on callbacks for select to authenticated using (true);
