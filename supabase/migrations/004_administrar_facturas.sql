-- Migración para administración: facturas, titulo y estado finalizado
-- Permite gestionar ingresos (renta, venta, comisiones) y títulos de inmuebles

-- 1. Agregar columna titulo a inmuebles (para listados como "Apartamento en el Centro")
alter table public.inmuebles
  add column if not exists titulo text;

-- Rellenar titulos existentes desde descripcion (primeros 80 caracteres) si están vacíos
update public.inmuebles
set titulo = left(trim(descripcion), 80)
where titulo is null and descripcion is not null;

comment on column public.inmuebles.titulo is 'Título breve del inmueble para listados (ej: Apartamento en el Centro)';

-- 2. Extender estado para incluir finalizado (venta/arriendo concluido)
alter table public.inmuebles drop constraint if exists inmuebles_estado_check;
alter table public.inmuebles add constraint inmuebles_estado_check check (
  estado in ('borrador', 'publicado', 'pausado', 'finalizado')
);

comment on column public.inmuebles.estado is 'borrador=pending, publicado=active, pausado=paused, finalizado=completed';

-- Permitir que propietarios vean todos sus inmuebles (incl. borrador, pausado, finalizado)
create policy "Propietarios ven sus inmuebles"
  on public.inmuebles for select
  using (user_id = auth.uid());

-- 3. Tabla facturas: ingresos por renta, venta o comisión
create table if not exists public.facturas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  inmueble_id uuid not null references public.inmuebles(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,

  numero text not null,
  fecha date not null,
  monto numeric(14, 2) not null check (monto >= 0),
  tipo text not null check (tipo in ('arriendo', 'venta', 'comision')),
  estado text not null default 'pendiente' check (estado in ('pagado', 'pendiente')),
  descripcion text,
  -- Opcional: URL del PDF si se sube a storage
  documento_url text
);

create index if not exists idx_facturas_inmueble on public.facturas(inmueble_id);
create index if not exists idx_facturas_user on public.facturas(user_id);
create index if not exists idx_facturas_fecha on public.facturas(fecha desc);
create index if not exists idx_facturas_estado on public.facturas(estado);
create index if not exists idx_facturas_tipo on public.facturas(tipo);

-- Trigger updated_at
drop trigger if exists facturas_updated_at on public.facturas;
create trigger facturas_updated_at
  before update on public.facturas
  for each row execute function public.set_updated_at();

-- RLS
alter table public.facturas enable row level security;

-- Ver facturas de inmuebles que el usuario posee o de sus propios registros
create policy "Usuarios ven facturas de sus inmuebles"
  on public.facturas for select
  using (
    auth.uid() in (
      select user_id from public.inmuebles where id = inmueble_id
    )
  );

create policy "Usuarios insertan facturas en sus inmuebles"
  on public.facturas for insert
  with check (
    auth.uid() in (
      select user_id from public.inmuebles where id = inmueble_id
    )
  );

create policy "Usuarios actualizan facturas de sus inmuebles"
  on public.facturas for update
  using (
    auth.uid() in (
      select user_id from public.inmuebles where id = inmueble_id
    )
  );

create policy "Usuarios eliminan facturas de sus inmuebles"
  on public.facturas for delete
  using (
    auth.uid() in (
      select user_id from public.inmuebles where id = inmueble_id
    )
  );

comment on table public.facturas is 'Facturas, recibos e ingresos ligados a inmuebles (renta mensual, ventas, comisiones)';
comment on column public.facturas.tipo is 'arriendo=renta mensual, venta=ingreso por venta, comision=comisión por operación';
comment on column public.facturas.numero is 'Número de factura (ej: FAC-001)';
