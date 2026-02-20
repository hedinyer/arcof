-- Características clave del inmueble para publicar (habitaciones, baños, precio, etc.)
alter table public.inmuebles
  add column if not exists habitaciones smallint check (habitaciones is null or habitaciones >= 0),
  add column if not exists banos smallint check (banos is null or banos >= 0),
  add column if not exists parqueaderos smallint check (parqueaderos is null or parqueaderos >= 0),
  add column if not exists precio numeric(14, 2) check (precio is null or precio >= 0),
  add column if not exists estrato smallint check (estrato is null or (estrato >= 1 and estrato <= 6)),
  add column if not exists piso smallint check (piso is null or piso >= 0);

comment on column public.inmuebles.habitaciones is 'Número de habitaciones/dormitorios';
comment on column public.inmuebles.banos is 'Número de baños';
comment on column public.inmuebles.parqueaderos is 'Número de parqueaderos/garajes';
comment on column public.inmuebles.precio is 'Precio en COP (venta o arriendo según tipo_oferta)';
comment on column public.inmuebles.estrato is 'Estrato socioeconómico (1-6)';
comment on column public.inmuebles.piso is 'Piso del inmueble (edificios)';

create index if not exists idx_inmuebles_precio on public.inmuebles(precio);
create index if not exists idx_inmuebles_habitaciones on public.inmuebles(habitaciones);
create index if not exists idx_inmuebles_banos on public.inmuebles(banos);
