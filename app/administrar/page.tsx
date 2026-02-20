"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

interface Inmueble {
  id: string;
  titulo: string;
  direccion: string;
  tipo: "renta" | "venta";
  precio: number;
  ingresosTotales: number;
  estado: "activo" | "pendiente" | "finalizado";
  fechaPublicacion: string;
  facturas: Factura[];
}

interface Factura {
  id: string;
  numero: string;
  fecha: string;
  monto: number;
  tipo: "renta" | "venta" | "comision";
  estado: "pagado" | "pendiente";
  descripcion: string;
}

// Mapeo DB -> UI
const mapEstadoToUI = (estado: string): "activo" | "pendiente" | "finalizado" => {
  if (estado === "publicado") return "activo";
  if (estado === "borrador") return "pendiente";
  return "finalizado";
};

const mapTipoToUI = (tipoOferta: string): "renta" | "venta" => {
  return tipoOferta === "arriendo" ? "renta" : "venta";
};

const mapFacturaTipoToUI = (tipo: string): "renta" | "venta" | "comision" => {
  return tipo === "arriendo" ? "renta" : tipo as "venta" | "comision";
};

function AdministrarContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { isCollapsed } = useSidebar();
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "renta" | "venta">("todos");
  const [inmuebleSeleccionado, setInmuebleSeleccionado] = useState<Inmueble | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchInmuebles = async () => {
      setLoading(true);
      const { data: inmueblesData, error } = await supabase
        .from("inmuebles")
        .select("*, facturas(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al cargar inmuebles:", error);
        setInmuebles([]);
        setLoading(false);
        return;
      }

      const mapped: Inmueble[] = (inmueblesData ?? []).map((inm) => {
        const facturas = (inm.facturas ?? []).map((f: { id: string; numero: string; fecha: string; monto: number; tipo: string; estado: string; descripcion: string | null }) => ({
          id: f.id,
          numero: f.numero,
          fecha: f.fecha,
          monto: Number(f.monto),
          tipo: mapFacturaTipoToUI(f.tipo),
          estado: f.estado as "pagado" | "pendiente",
          descripcion: f.descripcion ?? "",
        }));
        const ingresosTotales = facturas
          .filter((f: Factura) => f.estado === "pagado")
          .reduce((sum: number, f: Factura) => sum + f.monto, 0);
        return {
          id: inm.id,
          titulo: inm.titulo ?? inm.descripcion?.slice(0, 80) ?? "Sin título",
          direccion: (inm.direccion ?? `${inm.ciudad ?? ""}`.trim()) || "Sin dirección",
          tipo: mapTipoToUI(inm.tipo_oferta),
          precio: Number(inm.precio ?? 0),
          ingresosTotales,
          estado: mapEstadoToUI(inm.estado),
          fechaPublicacion: inm.created_at,
          facturas,
        };
      });

      setInmuebles(mapped);
      setLoading(false);
    };

    fetchInmuebles();
  }, [user]);

  // Redirigir a login si no está autenticado (después de cargar)
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/administrar");
    }
  }, [authLoading, user, router]);

  const inmueblesFiltrados = inmuebles.filter((inmueble) => {
    const coincideTipo = filtroTipo === "todos" || inmueble.tipo === filtroTipo;
    const coincideBusqueda =
      busqueda === "" ||
      inmueble.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      inmueble.direccion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideTipo && coincideBusqueda;
  });

  const ingresosTotales = inmuebles.reduce((sum, inm) => sum + inm.ingresosTotales, 0);
  const ingresosMensuales = inmuebles
    .filter((inm) => inm.tipo === "renta" && inm.estado === "activo")
    .reduce((sum, inm) => sum + inm.precio, 0);

  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(valor);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Mostrar nada o splash mientras verifica auth
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--text-secondary)]">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <Sidebar />
      <div className={isCollapsed ? "flex-1 ml-20 transition-all duration-300" : "flex-1 ml-64 transition-all duration-300"}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
              Administrar Inmuebles
            </h1>
            <p className="text-[var(--text-secondary)]">
              Gestiona tus propiedades y revisa tus ingresos
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-secondary)]">Ingresos Totales</span>
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {formatearMoneda(ingresosTotales)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-secondary)]">Ingresos Mensuales</span>
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {formatearMoneda(ingresosMensuales)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-secondary)]">Inmuebles Activos</span>
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {inmuebles.filter((inm) => inm.estado === "activo").length}
              </p>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Buscar por título o dirección..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filtroTipo === "todos" ? "default" : "outline"}
                  onClick={() => setFiltroTipo("todos")}
                >
                  Todos
                </Button>
                <Button
                  variant={filtroTipo === "renta" ? "default" : "outline"}
                  onClick={() => setFiltroTipo("renta")}
                >
                  Renta
                </Button>
                <Button
                  variant={filtroTipo === "venta" ? "default" : "outline"}
                  onClick={() => setFiltroTipo("venta")}
                >
                  Venta
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de inmuebles */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin" />
                <p className="text-[var(--text-secondary)]">Cargando inmuebles...</p>
              </div>
            ) : inmueblesFiltrados.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-[var(--text-secondary)] mb-2">
                  {inmuebles.length === 0
                    ? "No tienes inmuebles registrados. Publica tu primera propiedad para verla aquí."
                    : "No hay resultados para tu búsqueda."}
                </p>
                {inmuebles.length === 0 && (
                  <Button onClick={() => router.push("/publicar")}>
                    Publicar inmueble
                  </Button>
                )}
              </div>
            ) : inmueblesFiltrados.map((inmueble) => (
              <div
                key={inmueble.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setInmuebleSeleccionado(inmueble)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                          {inmueble.titulo}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {inmueble.direccion}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inmueble.estado === "activo"
                            ? "bg-green-100 text-green-700"
                            : inmueble.estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inmueble.estado === "activo"
                          ? "Activo"
                          : inmueble.estado === "pendiente"
                          ? "Pendiente"
                          : "Finalizado"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div>
                        <span className="text-xs text-[var(--text-secondary)]">Tipo:</span>
                        <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">
                          {inmueble.tipo === "renta" ? "Renta" : "Venta"}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-[var(--text-secondary)]">Precio:</span>
                        <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">
                          {formatearMoneda(inmueble.precio)}
                          {inmueble.tipo === "renta" && "/mes"}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-[var(--text-secondary)]">Ingresos:</span>
                        <span className="ml-2 text-sm font-medium text-green-600">
                          {formatearMoneda(inmueble.ingresosTotales)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal de detalles */}
          {inmuebleSeleccionado && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    {inmuebleSeleccionado.titulo}
                  </h2>
                  <button
                    onClick={() => setInmuebleSeleccionado(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  {/* Información del inmueble */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                      Información del Inmueble
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-[var(--text-secondary)]">Dirección:</span>
                        <p className="font-medium">{inmuebleSeleccionado.direccion}</p>
                      </div>
                      <div>
                        <span className="text-sm text-[var(--text-secondary)]">Tipo:</span>
                        <p className="font-medium">
                          {inmuebleSeleccionado.tipo === "renta" ? "Renta" : "Venta"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-[var(--text-secondary)]">Precio:</span>
                        <p className="font-medium">
                          {formatearMoneda(inmuebleSeleccionado.precio)}
                          {inmuebleSeleccionado.tipo === "renta" && "/mes"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-[var(--text-secondary)]">Fecha Publicación:</span>
                        <p className="font-medium">{formatearFecha(inmuebleSeleccionado.fechaPublicacion)}</p>
                      </div>
                      <div>
                        <span className="text-sm text-[var(--text-secondary)]">Ingresos Totales:</span>
                        <p className="font-medium text-green-600">
                          {formatearMoneda(inmuebleSeleccionado.ingresosTotales)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-[var(--text-secondary)]">Estado:</span>
                        <span
                          className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                            inmuebleSeleccionado.estado === "activo"
                              ? "bg-green-100 text-green-700"
                              : inmuebleSeleccionado.estado === "pendiente"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {inmuebleSeleccionado.estado === "activo"
                            ? "Activo"
                            : inmuebleSeleccionado.estado === "pendiente"
                            ? "Pendiente"
                            : "Finalizado"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Facturas y recibos */}
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                      Facturas y Recibos de Pago
                    </h3>
                    <div className="space-y-3">
                      {inmuebleSeleccionado.facturas.length === 0 ? (
                        <p className="text-[var(--text-secondary)] py-4">
                          No hay facturas registradas para este inmueble.
                        </p>
                      ) : inmuebleSeleccionado.facturas.map((factura) => (
                        <div
                          key={factura.id}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-[var(--text-primary)]">
                                {factura.numero} - {factura.descripcion}
                              </p>
                              <p className="text-sm text-[var(--text-secondary)]">
                                {formatearFecha(factura.fecha)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-[var(--text-primary)]">
                                {formatearMoneda(factura.monto)}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  factura.estado === "pagado"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {factura.estado === "pagado" ? "Pagado" : "Pendiente"}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              Ver Factura
                            </Button>
                            <Button variant="outline" size="sm">
                              Descargar PDF
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdministrarPage() {
  return (
    <SidebarProvider>
      <AdministrarContent />
    </SidebarProvider>
  );
}
