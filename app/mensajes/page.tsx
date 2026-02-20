"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Mensaje {
  id: string;
  remitente: string;
  tipoRemitente: "cliente" | "empleado" | "sistema";
  avatar?: string;
  asunto: string;
  contenido: string;
  fecha: string;
  hora: string;
  leido: boolean;
  inmuebleId?: string;
  inmuebleTitulo?: string;
}

interface Conversacion {
  id: string;
  remitente: string;
  tipoRemitente: "cliente" | "empleado" | "sistema";
  avatar?: string;
  ultimoMensaje: string;
  fechaUltimoMensaje: string;
  horaUltimoMensaje: string;
  noLeidos: number;
  mensajes: Mensaje[];
  inmuebleId?: string;
  inmuebleTitulo?: string;
}

// Datos de ejemplo
const conversacionesEjemplo: Conversacion[] = [
  {
    id: "1",
    remitente: "María González",
    tipoRemitente: "cliente",
    ultimoMensaje: "Gracias por la información, me interesa el apartamento",
    fechaUltimoMensaje: "2024-04-15",
    horaUltimoMensaje: "14:30",
    noLeidos: 2,
    inmuebleId: "1",
    inmuebleTitulo: "Apartamento en el Centro",
    mensajes: [
      {
        id: "m1",
        remitente: "María González",
        tipoRemitente: "cliente",
        asunto: "Consulta sobre apartamento",
        contenido: "Hola, me interesa el apartamento en el Centro. ¿Podrían darme más información sobre la disponibilidad?",
        fecha: "2024-04-14",
        hora: "10:15",
        leido: true,
        inmuebleId: "1",
        inmuebleTitulo: "Apartamento en el Centro",
      },
      {
        id: "m2",
        remitente: "Tu",
        tipoRemitente: "empleado",
        asunto: "Re: Consulta sobre apartamento",
        contenido: "Hola María, el apartamento está disponible. Tiene 2 habitaciones, 1 baño y está ubicado en una zona muy céntrica. ¿Te gustaría agendar una visita?",
        fecha: "2024-04-14",
        hora: "11:20",
        leido: true,
      },
      {
        id: "m3",
        remitente: "María González",
        tipoRemitente: "cliente",
        asunto: "Re: Consulta sobre apartamento",
        contenido: "Perfecto, me gustaría verlo. ¿Qué días tienen disponibles?",
        fecha: "2024-04-15",
        hora: "09:45",
        leido: true,
      },
      {
        id: "m4",
        remitente: "María González",
        tipoRemitente: "cliente",
        asunto: "Re: Consulta sobre apartamento",
        contenido: "Gracias por la información, me interesa el apartamento",
        fecha: "2024-04-15",
        hora: "14:30",
        leido: false,
      },
    ],
  },
  {
    id: "2",
    remitente: "Carlos Rodríguez",
    tipoRemitente: "cliente",
    ultimoMensaje: "¿Cuándo puedo firmar el contrato?",
    fechaUltimoMensaje: "2024-04-14",
    horaUltimoMensaje: "16:45",
    noLeidos: 0,
    inmuebleId: "3",
    inmuebleTitulo: "Local Comercial",
    mensajes: [
      {
        id: "m5",
        remitente: "Carlos Rodríguez",
        tipoRemitente: "cliente",
        asunto: "Interesado en local comercial",
        contenido: "Buenos días, vi el local comercial en la Avenida 68. ¿Está disponible para arrendar?",
        fecha: "2024-04-13",
        hora: "15:20",
        leido: true,
        inmuebleId: "3",
        inmuebleTitulo: "Local Comercial",
      },
      {
        id: "m6",
        remitente: "Tu",
        tipoRemitente: "empleado",
        asunto: "Re: Interesado en local comercial",
        contenido: "Sí, está disponible. El precio es $2.500.000 mensuales. ¿Te interesa?",
        fecha: "2024-04-13",
        hora: "16:00",
        leido: true,
      },
      {
        id: "m7",
        remitente: "Carlos Rodríguez",
        tipoRemitente: "cliente",
        asunto: "Re: Interesado en local comercial",
        contenido: "Perfecto, me interesa. ¿Cuándo puedo firmar el contrato?",
        fecha: "2024-04-14",
        hora: "16:45",
        leido: true,
      },
    ],
  },
  {
    id: "3",
    remitente: "Ana Martínez - Agente",
    tipoRemitente: "empleado",
    ultimoMensaje: "Recordatorio: Reunión mañana a las 10am",
    fechaUltimoMensaje: "2024-04-15",
    horaUltimoMensaje: "08:00",
    noLeidos: 1,
    mensajes: [
      {
        id: "m8",
        remitente: "Ana Martínez - Agente",
        tipoRemitente: "empleado",
        asunto: "Recordatorio: Reunión mañana a las 10am",
        contenido: "Hola, solo recordarte que tenemos reunión mañana a las 10am para revisar los nuevos inmuebles disponibles.",
        fecha: "2024-04-15",
        hora: "08:00",
        leido: false,
      },
    ],
  },
  {
    id: "4",
    remitente: "Sistema ARCOF",
    tipoRemitente: "sistema",
    ultimoMensaje: "Tu inmueble ha recibido una nueva consulta",
    fechaUltimoMensaje: "2024-04-14",
    horaUltimoMensaje: "12:30",
    noLeidos: 0,
    inmuebleId: "1",
    inmuebleTitulo: "Apartamento en el Centro",
    mensajes: [
      {
        id: "m9",
        remitente: "Sistema ARCOF",
        tipoRemitente: "sistema",
        asunto: "Tu inmueble ha recibido una nueva consulta",
        contenido: "Tu inmueble 'Apartamento en el Centro' ha recibido una nueva consulta de un cliente interesado.",
        fecha: "2024-04-14",
        hora: "12:30",
        leido: true,
        inmuebleId: "1",
        inmuebleTitulo: "Apartamento en el Centro",
      },
    ],
  },
  {
    id: "5",
    remitente: "Juan Pérez",
    tipoRemitente: "cliente",
    ultimoMensaje: "¿Tienen más propiedades en esa zona?",
    fechaUltimoMensaje: "2024-04-13",
    horaUltimoMensaje: "17:20",
    noLeidos: 0,
    mensajes: [
      {
        id: "m10",
        remitente: "Juan Pérez",
        tipoRemitente: "cliente",
        asunto: "Búsqueda de propiedad",
        contenido: "Hola, estoy buscando una casa en la zona norte. ¿Tienen más propiedades en esa zona?",
        fecha: "2024-04-13",
        hora: "17:20",
        leido: true,
      },
      {
        id: "m11",
        remitente: "Tu",
        tipoRemitente: "empleado",
        asunto: "Re: Búsqueda de propiedad",
        contenido: "Hola Juan, sí tenemos varias opciones en la zona norte. Te puedo enviar un listado. ¿Qué rango de precio buscas?",
        fecha: "2024-04-13",
        hora: "18:00",
        leido: true,
      },
    ],
  },
];

function MensajesContent() {
  const { isCollapsed } = useSidebar();
  const [conversaciones] = useState<Conversacion[]>(conversacionesEjemplo);
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState<Conversacion | null>(
    conversacionesEjemplo[0]
  );
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "cliente" | "empleado" | "sistema">("todos");
  const [busqueda, setBusqueda] = useState("");

  const conversacionesFiltradas = conversaciones.filter((conv) => {
    const coincideTipo = filtroTipo === "todos" || conv.tipoRemitente === filtroTipo;
    const coincideBusqueda =
      busqueda === "" ||
      conv.remitente.toLowerCase().includes(busqueda.toLowerCase()) ||
      conv.ultimoMensaje.toLowerCase().includes(busqueda.toLowerCase());
    return coincideTipo && coincideBusqueda;
  });

  const totalNoLeidos = conversaciones.reduce((sum, conv) => sum + conv.noLeidos, 0);

  const formatearFecha = (fecha: string) => {
    const hoy = new Date();
    const fechaMensaje = new Date(fecha);
    const diffTime = hoy.getTime() - fechaMensaje.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `${diffDays} días`;
    return fechaMensaje.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
    });
  };

  const obtenerAvatar = (tipo: string, nombre: string) => {
    if (tipo === "sistema") {
      return (
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
    const iniciales = nombre
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-semibold">
        {iniciales}
      </div>
    );
  };

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !conversacionSeleccionada) return;

    const mensaje: Mensaje = {
      id: `m${Date.now()}`,
      remitente: "Tu",
      tipoRemitente: "empleado",
      asunto: `Re: ${conversacionSeleccionada.mensajes[0]?.asunto || "Mensaje"}`,
      contenido: nuevoMensaje,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
      leido: true,
    };

    conversacionSeleccionada.mensajes.push(mensaje);
    conversacionSeleccionada.ultimoMensaje = nuevoMensaje;
    conversacionSeleccionada.fechaUltimoMensaje = mensaje.fecha;
    conversacionSeleccionada.horaUltimoMensaje = mensaje.hora;

    setNuevoMensaje("");
    setConversacionSeleccionada({ ...conversacionSeleccionada });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <Sidebar />
      <div className={isCollapsed ? "flex-1 ml-20 transition-all duration-300" : "flex-1 ml-64 transition-all duration-300"}>
        <div className="h-screen flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                  Mensajes
                </h1>
                {totalNoLeidos > 0 && (
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {totalNoLeidos} mensaje{totalNoLeidos !== 1 ? "s" : ""} no leído{totalNoLeidos !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Lista de conversaciones */}
            <div className="w-full md:w-96 border-r border-gray-200 bg-white flex flex-col">
              {/* Filtros y búsqueda */}
              <div className="p-4 border-b border-gray-200">
                <Input
                  type="text"
                  placeholder="Buscar conversaciones..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="mb-3"
                />
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filtroTipo === "todos" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltroTipo("todos")}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filtroTipo === "cliente" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltroTipo("cliente")}
                  >
                    Clientes
                  </Button>
                  <Button
                    variant={filtroTipo === "empleado" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltroTipo("empleado")}
                  >
                    Empleados
                  </Button>
                  <Button
                    variant={filtroTipo === "sistema" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltroTipo("sistema")}
                  >
                    Sistema
                  </Button>
                </div>
              </div>

              {/* Lista de conversaciones */}
              <div className="flex-1 overflow-y-auto">
                {conversacionesFiltradas.map((conversacion) => {
                  const isSelected = conversacionSeleccionada?.id === conversacion.id;
                  return (
                    <div
                      key={conversacion.id}
                      onClick={() => setConversacionSeleccionada(conversacion)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSelected ? "bg-blue-50 border-l-4 border-l-[var(--accent)]" : ""
                      } ${conversacion.noLeidos > 0 ? "bg-blue-50/50" : ""}`}
                    >
                      <div className="flex gap-3">
                        {obtenerAvatar(conversacion.tipoRemitente, conversacion.remitente)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-semibold text-[var(--text-primary)] truncate">
                              {conversacion.remitente}
                            </p>
                            <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap ml-2">
                              {formatearFecha(conversacion.fechaUltimoMensaje)}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--text-secondary)] truncate mb-1">
                            {conversacion.ultimoMensaje}
                          </p>
                          {conversacion.inmuebleTitulo && (
                            <p className="text-xs text-[var(--accent)] truncate">
                              📍 {conversacion.inmuebleTitulo}
                            </p>
                          )}
                          {conversacion.noLeidos > 0 && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-[var(--accent)] text-white text-xs rounded-full">
                              {conversacion.noLeidos}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vista de conversación */}
            <div className="flex-1 flex flex-col bg-gray-50">
              {conversacionSeleccionada ? (
                <>
                  {/* Header de conversación */}
                  <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                      {obtenerAvatar(
                        conversacionSeleccionada.tipoRemitente,
                        conversacionSeleccionada.remitente
                      )}
                      <div>
                        <h2 className="font-semibold text-[var(--text-primary)]">
                          {conversacionSeleccionada.remitente}
                        </h2>
                        {conversacionSeleccionada.inmuebleTitulo && (
                          <p className="text-sm text-[var(--text-secondary)]">
                            📍 {conversacionSeleccionada.inmuebleTitulo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mensajes */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {conversacionSeleccionada.mensajes.map((mensaje) => {
                      const esMio = mensaje.remitente === "Tu";
                      return (
                        <div
                          key={mensaje.id}
                          className={`flex gap-3 ${esMio ? "flex-row-reverse" : ""}`}
                        >
                          {!esMio && obtenerAvatar(mensaje.tipoRemitente, mensaje.remitente)}
                          <div className={`flex-1 ${esMio ? "text-right" : ""}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-[var(--text-primary)]">
                                {mensaje.remitente}
                              </span>
                              <span className="text-xs text-[var(--text-secondary)]">
                                {formatearFecha(mensaje.fecha)} a las {mensaje.hora}
                              </span>
                            </div>
                            <div
                              className={`inline-block rounded-lg px-4 py-2 ${
                                esMio
                                  ? "bg-[var(--accent)] text-white"
                                  : mensaje.tipoRemitente === "sistema"
                                  ? "bg-blue-100 text-blue-900"
                                  : "bg-white border border-gray-200 text-[var(--text-primary)]"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{mensaje.contenido}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Input de respuesta */}
                  <div className="bg-white border-t border-gray-200 p-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            enviarMensaje();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button onClick={enviarMensaje} disabled={!nuevoMensaje.trim()}>
                        Enviar
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="text-[var(--text-secondary)]">
                      Selecciona una conversación para comenzar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MensajesPage() {
  return (
    <SidebarProvider>
      <MensajesContent />
    </SidebarProvider>
  );
}
