-- Tabla de usuarios/perfiles para información adicional del usuario
-- Se relaciona con auth.users de Supabase Auth
create table if not exists public.usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  nombre_completo text not null,
  email text not null unique,
  telefono text,
  
  -- Campos adicionales útiles
  avatar_url text,
  activo boolean not null default true
);

-- Índices
create index if not exists idx_usuarios_email on public.usuarios(email);
create index if not exists idx_usuarios_created_at on public.usuarios(created_at desc);
create index if not exists idx_usuarios_activo on public.usuarios(activo);

-- Trigger para actualizar updated_at
drop trigger if exists usuarios_updated_at on public.usuarios;
create trigger usuarios_updated_at
  before update on public.usuarios
  for each row execute function public.set_updated_at();

-- Trigger para crear automáticamente el perfil cuando se crea un usuario en auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.usuarios (id, email, nombre_completo)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nombre_completo', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que se ejecuta cuando se inserta un nuevo usuario en auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS (Row Level Security)
alter table public.usuarios enable row level security;

-- Política: Los usuarios pueden ver su propio perfil y perfiles públicos
create policy "Usuarios pueden ver su propio perfil"
  on public.usuarios for select
  using (auth.uid() = id);

-- Política: Los usuarios pueden actualizar su propio perfil
create policy "Usuarios pueden actualizar su propio perfil"
  on public.usuarios for update
  using (auth.uid() = id);

-- Política: Los usuarios pueden insertar su propio perfil (por si acaso)
create policy "Usuarios pueden insertar su propio perfil"
  on public.usuarios for insert
  with check (auth.uid() = id);

-- Comentarios
comment on table public.usuarios is 'Perfiles de usuarios con información adicional';
comment on column public.usuarios.id is 'ID del usuario (referencia a auth.users)';
comment on column public.usuarios.nombre_completo is 'Nombre completo del usuario';
comment on column public.usuarios.email is 'Correo electrónico del usuario (debe coincidir con auth.users)';
comment on column public.usuarios.telefono is 'Número de teléfono del usuario';
comment on column public.usuarios.avatar_url is 'URL del avatar/foto de perfil del usuario';
comment on column public.usuarios.activo is 'Indica si la cuenta del usuario está activa';
