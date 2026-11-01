-- 1) Perfil automatico cuando alguien se registra en Supabase Auth
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'owner')
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) Perfiles para usuarios que ya existian antes del trigger
insert into public.profiles (id, role)
select id, 'owner' from auth.users
on conflict (id) do nothing;

-- 3) RLS
alter table public.profiles enable row level security;
alter table public.businesses enable row level security;

drop policy if exists "profile: leer el propio" on public.profiles;
create policy "profile: leer el propio" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profile: editar el propio" on public.profiles;
create policy "profile: editar el propio" on public.profiles
  for update using (auth.uid() = id);

-- Nadie puede cambiarse el rol desde el cliente
revoke update on public.profiles from authenticated;
grant  update (full_name, avatar_url) on public.profiles to authenticated;

drop policy if exists "business: owner lee el suyo" on public.businesses;
create policy "business: owner lee el suyo" on public.businesses
  for select using (owner_id = auth.uid());

drop policy if exists "business: publico lee activos" on public.businesses;
create policy "business: publico lee activos" on public.businesses
  for select using (status = 'active' and published = true);

-- 4) Slug unico garantizado por la base de datos
create unique index if not exists businesses_slug_key on public.businesses (slug);

-- 5) Para volver superadmin a alguien (manual, una sola vez):
-- update public.profiles set role = 'superadmin' where id = 'UUID-DEL-USUARIO';
