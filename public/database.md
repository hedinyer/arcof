create table public.usuarios (
  id uuid not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  nombre_completo text not null,
  email text not null,
  telefono text null,
  avatar_url text null,
  activo boolean not null default true,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_email_key unique (email),
  constraint usuarios_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_usuarios_email on public.usuarios using btree (email) TABLESPACE pg_default;

create index IF not exists idx_usuarios_created_at on public.usuarios using btree (created_at desc) TABLESPACE pg_default;

create index IF not exists idx_usuarios_activo on public.usuarios using btree (activo) TABLESPACE pg_default;

create trigger usuarios_updated_at BEFORE
update on usuarios for EACH row
execute FUNCTION set_updated_at ();


create table public.inmuebles (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  direccion text null,
  ciudad text not null,
  lat double precision null,
  lng double precision null,
  tipo_oferta text not null,
  tipo_inmueble text not null,
  area_construida numeric(10, 2) null,
  area_privada numeric(10, 2) null,
  descripcion text not null,
  video_url text null,
  fotos jsonb not null default '[]'::jsonb,
  telefono text null,
  user_id uuid null,
  titulo text null,
  estado text not null default 'publicado'::text,
  habitaciones smallint null,
  banos smallint null,
  parqueaderos smallint null,
  precio numeric(14, 2) null,
  estrato smallint null,
  piso smallint null,
  constraint inmuebles_pkey primary key (id),
  constraint inmuebles_user_id_fkey foreign KEY (user_id) references usuarios (id),
  constraint inmuebles_descripcion_check check ((char_length(descripcion) <= 3500)),
  constraint inmuebles_estado_check check (
    estado = any (array['borrador'::text, 'publicado'::text, 'pausado'::text, 'finalizado'::text])
  ),
  constraint inmuebles_estrato_check check (
    (
      (estrato is null)
      or (
        (estrato >= 1)
        and (estrato <= 6)
      )
    )
  ),
  constraint inmuebles_habitaciones_check check (
    (
      (habitaciones is null)
      or (habitaciones >= 0)
    )
  ),
  constraint inmuebles_banos_check check (
    (
      (banos is null)
      or (banos >= 0)
    )
  ),
  constraint inmuebles_piso_check check (
    (
      (piso is null)
      or (piso >= 0)
    )
  ),
  constraint inmuebles_precio_check check (
    (
      (precio is null)
      or (precio >= (0)::numeric)
    )
  ),
  constraint inmuebles_tipo_inmueble_check check (
    (
      tipo_inmueble = any (
        array[
          'apartamento'::text,
          'casa'::text,
          'oficina'::text,
          'local'::text,
          'bodega'::text,
          'lote'::text,
          'finca'::text
        ]
      )
    )
  ),
  constraint inmuebles_tipo_oferta_check check (
    (
      tipo_oferta = any (array['venta'::text, 'arriendo'::text])
    )
  ),
  constraint inmuebles_parqueaderos_check check (
    (
      (parqueaderos is null)
      or (parqueaderos >= 0)
    )
  ),
  constraint inmuebles_ciudad_check check (
    (
      ciudad = any (
        array[
          'bucaramanga'::text,
          'giron'::text,
          'piedecuesta'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_ciudad on public.inmuebles using btree (ciudad) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_tipo_oferta on public.inmuebles using btree (tipo_oferta) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_tipo_inmueble on public.inmuebles using btree (tipo_inmueble) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_created_at on public.inmuebles using btree (created_at desc) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_estado on public.inmuebles using btree (estado) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_precio on public.inmuebles using btree (precio) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_habitaciones on public.inmuebles using btree (habitaciones) TABLESPACE pg_default;

create index IF not exists idx_inmuebles_banos on public.inmuebles using btree (banos) TABLESPACE pg_default;

create trigger inmuebles_updated_at BEFORE
update on inmuebles for EACH row
execute FUNCTION set_updated_at ();

-- ========== TABLA FACTURAS (ingresos por renta, venta, comisión) ==========
create table public.facturas (
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
  documento_url text
);

create index idx_facturas_inmueble on public.facturas(inmueble_id);
create index idx_facturas_user on public.facturas(user_id);
create index idx_facturas_fecha on public.facturas(fecha desc);
create index idx_facturas_estado on public.facturas(estado);
create index idx_facturas_tipo on public.facturas(tipo);

create trigger facturas_updated_at before update on public.facturas
  for each row execute function set_updated_at();