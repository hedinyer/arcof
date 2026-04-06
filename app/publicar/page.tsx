"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroHeader } from "@/components/hero/HeroHeader";
import { Footer } from "@/components/layout/Footer";

const WHATSAPP_E164 = "573178001592";

export default function PublicarLeadPage() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [propiedad, setPropiedad] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hola ARCOF, quiero que me contacten para publicar mi inmueble:",
      "",
      `Nombre: ${nombre.trim()}`,
      `Teléfono / WhatsApp: ${telefono.trim()}`,
      `Propiedad: ${propiedad.trim()}`,
      `Dirección: ${direccion.trim()}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_E164}?text=${text}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      <main className="pt-28 pb-16 px-6 md:px-12">
        <div className="max-w-xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl text-[var(--text-primary)] font-semibold tracking-tight"
            style={{ fontFamily: '"Instrument Serif"' }}
          >
            Pon tu inmueble
          </h1>
          <p className="mt-3 text-[var(--text-secondary)] text-sm sm:text-base">
            Déjanos tus datos y te contactamos para acompañarte en la publicación.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-11 rounded-xl border border-black/10 bg-white px-4 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[#7b1f3a]/30"
                placeholder="Ej: María Pérez"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Teléfono celular o WhatsApp
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full h-11 rounded-xl border border-black/10 bg-white px-4 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[#7b1f3a]/30"
                placeholder="Ej: 300 123 4567"
              />
            </div>

            <div>
              <label htmlFor="propiedad" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Propiedad
              </label>
              <textarea
                id="propiedad"
                name="propiedad"
                rows={3}
                required
                value={propiedad}
                onChange={(e) => setPropiedad(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[#7b1f3a]/30 resize-y min-h-[88px]"
                placeholder="Tipo de inmueble y breve descripción (ej: apartamento 3 habitaciones, arriendo)"
              />
            </div>

            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Dirección
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                autoComplete="street-address"
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full h-11 rounded-xl border border-black/10 bg-white px-4 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[#7b1f3a]/30"
                placeholder="Barrio, ciudad y referencia"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#7b1f3a] px-8 text-sm font-medium text-white hover:bg-[#6a1a32] transition-colors min-h-[44px]"
            >
              Enviar por WhatsApp
              <span className="material-symbols-outlined text-base" aria-hidden>
                chat
              </span>
            </button>
          </form>

          <p className="mt-8 text-xs text-[var(--text-secondary)]">
            ¿Necesitas publicar con fotos y ficha completa?{" "}
            <Link
              href="/publicar/completo"
              className="text-[#7b1f3a] font-medium underline underline-offset-2 hover:text-[#5a1429]"
            >
              Ir al formulario completo
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
