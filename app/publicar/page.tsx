"use client";

import { useCallback, useRef, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import {
  LocationMap,
  CIUDADES,
  type CiudadKey,
} from "@/components/map/LocationMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, INMUEBLES_BUCKET, INMUEBLES_FOTOS_PATH } from "@/lib/supabase";

async function geocodeAddress(
  query: string,
  proximity: [number, number]
): Promise<{ lng: number; lat: number; placeName: string } | null> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!token || !query.trim()) return null;
  const prox = `${proximity[0]},${proximity[1]}`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&country=CO&limit=1&proximity=${prox}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const feature = data.features?.[0];
  if (!feature?.geometry?.coordinates) return null;
  const [lng, lat] = feature.geometry.coordinates;
  return { lng, lat, placeName: feature.place_name ?? query };
}

function PublicarContent() {
  const { isCollapsed } = useSidebar();
  const [formData, setFormData] = useState({
    direccion: "",
    ciudad: "bucaramanga" as CiudadKey,
    tipoOferta: "",
    tipoInmueble: "",
    habitaciones: "",
    banos: "",
    parqueaderos: "",
    precio: "",
    estrato: "",
    piso: "",
    areaConstruida: "",
    areaPrivada: "",
    descripcion: "",
    video: "",
    telefono: "",
    lat: null as number | null,
    lng: null as number | null,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [flyToMarker, setFlyToMarker] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBuscarDireccion = async () => {
    if (!formData.direccion.trim()) return;
    setIsSearching(true);
    try {
      const result = await geocodeAddress(
        formData.direccion,
        CIUDADES[formData.ciudad].center
      );
      if (result) {
        setFormData((prev) => ({
          ...prev,
          lng: result.lng,
          lat: result.lat,
        }));
        setFlyToMarker(Date.now());
      } else {
        alert("No se encontró la dirección. Intenta con más detalle o haz clic en el mapa.");
      }
    } catch {
      alert("Error al buscar. Intenta de nuevo.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const list = Array.from(files).slice(0, 20);
    setSelectedFiles(list);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Sube al menos 1 foto de tu inmueble.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: row, error: insertError } = await supabase
        .from("inmuebles")
        .insert({
          direccion: formData.direccion || null,
          ciudad: formData.ciudad,
          lat: formData.lat,
          lng: formData.lng,
          tipo_oferta: formData.tipoOferta,
          tipo_inmueble: formData.tipoInmueble,
          habitaciones: formData.habitaciones ? Number(formData.habitaciones) : null,
          banos: formData.banos ? Number(formData.banos) : null,
          parqueaderos: formData.parqueaderos ? Number(formData.parqueaderos) : null,
          precio: formData.precio ? Number(formData.precio) : null,
          estrato: formData.estrato ? Number(formData.estrato) : null,
          piso: formData.piso ? Number(formData.piso) : null,
          area_construida: formData.areaConstruida ? Number(formData.areaConstruida) : null,
          area_privada: formData.areaPrivada ? Number(formData.areaPrivada) : null,
          descripcion: formData.descripcion,
          video_url: formData.video || null,
          telefono: formData.telefono || null,
          fotos: [],
        })
        .select("id")
        .single();

      if (insertError) {
        console.error(insertError);
        alert("Error al guardar el inmueble: " + (insertError.message || "Intenta de nuevo."));
        return;
      }

      const inmuebleId = row.id;
      const basePath = `${INMUEBLES_FOTOS_PATH}/${inmuebleId}`;
      const fotosPayload: { url: string; orden: number }[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const safeName = `${Date.now()}-${i}.${ext}`;
        const filePath = `${basePath}/${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from(INMUEBLES_BUCKET)
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          console.error(uploadError);
          alert("Error al subir una foto: " + uploadError.message);
          return;
        }

        const { data: urlData } = supabase.storage
          .from(INMUEBLES_BUCKET)
          .getPublicUrl(filePath);
        fotosPayload.push({ url: urlData.publicUrl, orden: i + 1 });
      }

      const { error: updateError } = await supabase
        .from("inmuebles")
        .update({ fotos: fotosPayload })
        .eq("id", inmuebleId);

      if (updateError) {
        console.error(updateError);
        alert("Inmueble guardado pero falló actualizar fotos: " + updateError.message);
        return;
      }

      alert("Inmueble publicado exitosamente!");
      setFormData({
        direccion: "",
        ciudad: "bucaramanga",
        tipoOferta: "",
        tipoInmueble: "",
        habitaciones: "",
        banos: "",
        parqueaderos: "",
        precio: "",
        estrato: "",
        piso: "",
        areaConstruida: "",
        areaPrivada: "",
        descripcion: "",
        video: "",
        telefono: "",
        lat: null,
        lng: null,
      });
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Error inesperado. Revisa la consola.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationSelect = useCallback((lng: number, lat: number) => {
    setFormData((prev) => ({ ...prev, lng, lat }));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <Sidebar />
      <div className={isCollapsed ? "flex-1 ml-20 transition-all duration-300" : "flex-1 ml-64 transition-all duration-300"}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
              Publicar inmueble
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Alerta informativa */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-blue-900">Inmuebles prohibidos</p>
                <p className="text-sm text-blue-700 mt-1">
                  Recuerda que publicaciones de inmuebles nuevos, sobre planos, en obra negra,
                  remates, negocios o para estrenar están prohibidas.
                </p>
              </div>
            </div>

            {/* Sección: Ubicación */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  Ubicación de tu inmueble
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <select
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="mt-2 flex h-10 w-full rounded-md border border-[var(--text-secondary)]/25 bg-[var(--background)] px-3 py-2 text-sm"
                  >
                    <option value="bucaramanga">Bucaramanga</option>
                    <option value="giron">Girón</option>
                    <option value="piedecuesta">Piedecuesta</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="direccion">Dirección / punto referencia *</Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="direccion"
                      name="direccion"
                      type="text"
                      placeholder="Ej: Cra 36 #12-45, Bucaramanga"
                      value={formData.direccion}
                      onChange={handleChange}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleBuscarDireccion())}
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBuscarDireccion}
                      disabled={isSearching}
                    >
                      {isSearching ? "Buscando…" : "Buscar"}
                    </Button>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    <strong>Atención:</strong> Por seguridad, la dirección no se verá reflejada en la publicación.
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Escribe la dirección y pulsa Buscar para colocar el pin, o haz clic en el mapa.
                  </p>
                </div>
                <LocationMap
                  centerCity={formData.ciudad}
                  onLocationSelect={handleLocationSelect}
                  selectedLng={formData.lng}
                  selectedLat={formData.lat}
                  flyToMarker={flyToMarker || undefined}
                  className="border-2 border-dashed border-gray-300"
                />
              </div>
            </div>

            {/* Sección: Tipo de inmueble */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  Cuéntanos sobre tu inmueble
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tipoOferta">Tipo de oferta *</Label>
                  <select
                    id="tipoOferta"
                    name="tipoOferta"
                    value={formData.tipoOferta}
                    onChange={handleChange}
                    required
                    className="mt-2 flex h-10 w-full rounded-md border border-[var(--text-secondary)]/25 bg-[var(--background)] px-3 py-2 text-sm"
                  >
                    <option value="">Seleccionar</option>
                    <option value="venta">Venta</option>
                    <option value="arriendo">Arriendo</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="tipoInmueble">Tipo de inmueble *</Label>
                  <select
                    id="tipoInmueble"
                    name="tipoInmueble"
                    value={formData.tipoInmueble}
                    onChange={handleChange}
                    required
                    className="mt-2 flex h-10 w-full rounded-md border border-[var(--text-secondary)]/25 bg-[var(--background)] px-3 py-2 text-sm"
                  >
                    <option value="">Seleccionar</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="casa">Casa</option>
                    <option value="oficina">Oficina</option>
                    <option value="local">Local</option>
                    <option value="bodega">Bodega</option>
                    <option value="lote">Lote</option>
                    <option value="finca">Finca</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="precio">
                    Precio (COP) *
                  </Label>
                  <Input
                    id="precio"
                    name="precio"
                    type="number"
                    min={0}
                    step={10000}
                    placeholder={formData.tipoOferta === "arriendo" ? "Ej: 1.200.000" : "Ej: 350.000.000"}
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {formData.tipoOferta === "venta" ? "Precio de venta en pesos colombianos." : formData.tipoOferta === "arriendo" ? "Valor del arriendo mensual en pesos." : "Indica el precio en pesos (venta o arriendo según la oferta)."}
                  </p>
                </div>
              </div>
            </div>

            {/* Sección: Características (habitaciones, baños, etc.) */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  Características del inmueble
                </h2>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Información clave para quien quiera rentar o comprar. Si no aplica (ej. lote, bodega), deja en blanco.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="habitaciones">Habitaciones</Label>
                  <Input
                    id="habitaciones"
                    name="habitaciones"
                    type="number"
                    min={0}
                    placeholder="Ej: 3"
                    value={formData.habitaciones}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="banos">Baños</Label>
                  <Input
                    id="banos"
                    name="banos"
                    type="number"
                    min={0}
                    placeholder="Ej: 2"
                    value={formData.banos}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="parqueaderos">Parqueaderos</Label>
                  <Input
                    id="parqueaderos"
                    name="parqueaderos"
                    type="number"
                    min={0}
                    placeholder="Ej: 1"
                    value={formData.parqueaderos}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="estrato">Estrato</Label>
                  <select
                    id="estrato"
                    name="estrato"
                    value={formData.estrato}
                    onChange={handleChange}
                    className="mt-2 flex h-10 w-full rounded-md border border-[var(--text-secondary)]/25 bg-[var(--background)] px-3 py-2 text-sm"
                  >
                    <option value="">No aplica</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="piso">Piso</Label>
                  <Input
                    id="piso"
                    name="piso"
                    type="number"
                    min={0}
                    placeholder="Ej: 5 (edificios)"
                    value={formData.piso}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Sección: Tamaño y espacios */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  Tamaño y espacios
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="areaConstruida">
                    Área construída (m<sup>2</sup>)
                  </Label>
                  <Input
                    id="areaConstruida"
                    name="areaConstruida"
                    type="number"
                    placeholder="Ingresa un valor"
                    value={formData.areaConstruida}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="areaPrivada">
                    Área privada (m<sup>2</sup>)
                  </Label>
                  <Input
                    id="areaPrivada"
                    name="areaPrivada"
                    type="number"
                    placeholder="Ingresa un valor"
                    value={formData.areaPrivada}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Sección: Descripción */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Label htmlFor="descripcion" className="text-lg font-semibold">
                Descripción de tu inmueble *
              </Label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={6}
                placeholder="Describe lo que necesitas explicar de tu inmueble en 3500 caracteres. Ej: Espectacular apartamento ubicado en…"
                value={formData.descripcion}
                onChange={handleChange}
                required
                maxLength={3500}
                className="mt-2 flex w-full rounded-md border border-[var(--text-secondary)]/25 bg-[var(--background)] px-3 py-2 text-sm placeholder:text-[var(--text-secondary)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1 text-right">
                {formData.descripcion.length}/3500
              </p>
            </div>

            {/* Sección: Fotos */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  ¿Cómo luce tu inmueble?
                </h2>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Agrega fotos y tendrás un 98% más probabilidades de vender o arrendar tu inmueble.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-[var(--accent)] hover:underline"
                >
                  Sube las fotos aquí
                </label>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Sube mínimo 1 máximo 20 fotos de tu inmueble.
                </p>
                {selectedFiles.length > 0 && (
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-2">
                    {selectedFiles.length} foto(s) seleccionada(s). Se subirán a <code className="text-xs bg-gray-100 px-1 rounded">images/{INMUEBLES_FOTOS_PATH}/</code>
                  </p>
                )}
              </div>
            </div>

            {/* Sección: Video */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  Sube tu video
                </h2>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Te recomendamos publicar un video de tu anuncio, ingresando la url de Youtube en el espacio indicado.
              </p>
              <Input
                id="video"
                name="video"
                type="url"
                placeholder="https://www.youtube.com/watch..."
                value={formData.video}
                onChange={handleChange}
              />
            </div>

            {/* Sección: Contacto */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  Datos de Contacto
                </h2>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Ingrese el número de teléfono al cual quieres que los interesados te contacten.
              </p>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ingresa un número de teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-end pb-8">
              <Button type="submit" size="lg" className="px-8" disabled={isSubmitting}>
                {isSubmitting ? "Publicando…" : "Publicar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PublicarPage() {
  return (
    <SidebarProvider>
      <PublicarContent />
    </SidebarProvider>
  );
}
