-- Tabla principal de inmuebles (fotos en JSONB para URLs de Storage)
create table if not exists public.inmuebles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  direccion text,
  ciudad text not null check (ciudad in ('bucaramanga', 'giron', 'piedecuesta')),
  lat double precision,
  lng double precision,

  tipo_oferta text not null check (tipo_oferta in ('venta', 'arriendo')),
  tipo_inmueble text not null check (tipo_inmueble in ('apartamento', 'casa', 'oficina', 'local', 'bodega', 'lote', 'finca')),

  area_construida numeric(10, 2),
  area_privada numeric(10, 2),

  descripcion text not null check (char_length(descripcion) <= 3500),
  video_url text,
  -- JSONB: array de objetos { "url": "...", "orden": 1 } desde bucket images/casas/{id}/
  fotos jsonb not null default '[]'::jsonb,

  telefono text,
  user_id uuid references auth.users(id) on delete set null,
  estado text not null default 'publicado' check (estado in ('borrador', 'publicado', 'pausado'))
);

create index if not exists idx_inmuebles_ciudad on public.inmuebles(ciudad);
create index if not exists idx_inmuebles_tipo_oferta on public.inmuebles(tipo_oferta);
create index if not exists idx_inmuebles_tipo_inmueble on public.inmuebles(tipo_inmueble);
create index if not exists idx_inmuebles_created_at on public.inmuebles(created_at desc);
create index if not exists idx_inmuebles_estado on public.inmuebles(estado);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists inmuebles_updated_at on public.inmuebles;
create trigger inmuebles_updated_at
  before update on public.inmuebles
  for each row execute function public.set_updated_at();

-- RLS
alter table public.inmuebles enable row level security;

create policy "Público puede ver inmuebles publicados"
  on public.inmuebles for select
  using (estado = 'publicado');

create policy "Cualquiera puede insertar inmuebles"
  on public.inmuebles for insert
  with check (true);

create policy "Cualquiera puede actualizar inmuebles"
  on public.inmuebles for update
  using (true);

-- Storage: bucket "images" con path images/casas (id = images, objetos bajo casas/)
-- Si el bucket ya existe en el dashboard, comenta el insert y solo ejecuta las políticas.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Política: permitir subir bajo images/casas/{inmueble_id}/
create policy "Subir fotos a casas"
  on storage.objects for insert
  with check (
    bucket_id = 'images'
    and (storage.foldername(name))[1] = 'casas'
  );

-- Política: permitir leer objetos del bucket images
create policy "Leer fotos de images"
  on storage.objects for select
  using (bucket_id = 'images');

-- Política: permitir actualizar/borrar solo en casas (opcional)
create policy "Actualizar fotos en casas"
  on storage.objects for update
  using (bucket_id = 'images' and (storage.foldername(name))[1] = 'casas');

create policy "Borrar fotos en casas"
  on storage.objects for delete
  using (bucket_id = 'images' and (storage.foldername(name))[1] = 'casas');
