"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { HeroHeader } from "@/components/hero/HeroHeader";
import { Footer } from "@/components/layout/Footer";

type CiudadTarifa = {
  ciudad: string;
  canonPct: number;
  recaudo: number;
};

const tarifasPorCiudad: CiudadTarifa[] = [
  { ciudad: "Bucaramanga", canonPct: 20, recaudo: 19500 },
  { ciudad: "Bogotá", canonPct: 20, recaudo: 25000 },
  { ciudad: "Barranquilla", canonPct: 18, recaudo: 19000 },
  { ciudad: "Cali", canonPct: 18, recaudo: 18500 },
  { ciudad: "Cartagena", canonPct: 18, recaudo: 21000 },
  { ciudad: "Pereira", canonPct: 17, recaudo: 17500 },
];

function toCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function TarifasPage() {
  const [ciudad, setCiudad] = useState<CiudadTarifa>(tarifasPorCiudad[0]);
  const [canonMensual, setCanonMensual] = useState(1800000);
  const [administracion, setAdministracion] = useState(0);
  const [ivaIncluido, setIvaIncluido] = useState(true);
  const [seguroPlus, setSeguroPlus] = useState(false);

  const calculo = useMemo(() => {
    const baseArriendo = Number.isFinite(canonMensual) ? Math.max(canonMensual, 0) : 0;
    const baseAdmin = Number.isFinite(administracion) ? Math.max(administracion, 0) : 0;
    const baseTotal = baseArriendo + baseAdmin;
    const ivaFactor = ivaIncluido ? 1.19 : 1;

    const derechosContrato = baseArriendo * (ciudad.canonPct / 100) * ivaFactor;
    const feeSeguro = seguroPlus ? baseArriendo * 0.02 : 0;
    const recaudo = ciudad.recaudo;

    const totalPrimerMes = derechosContrato + recaudo + feeSeguro;
    const ingresoNetoPrimerMes = baseArriendo - totalPrimerMes;
    const ingresoNetoMensual = baseArriendo - recaudo - feeSeguro;

    return {
      baseTotal,
      derechosContrato,
      feeSeguro,
      recaudo,
      totalPrimerMes,
      ingresoNetoPrimerMes,
      ingresoNetoMensual,
      retornoAnual: ingresoNetoMensual * 12,
    };
  }, [administracion, canonMensual, ciudad.canonPct, ciudad.recaudo, ivaIncluido, seguroPlus]);

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      <main className="pt-28 px-6 md:px-12 pb-6 max-w-[1920px] mx-auto">
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="xl:col-span-7">
            <span className="inline-flex items-center rounded-full border border-[#a23b5a]/40 bg-[#7b1f3a]/10 px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#7b1f3a]">
              Transparencia ARCOF
            </span>
            <h1
              className="mt-4 text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: '"Instrument Serif"' }}
            >
              Tarifas claras para
              <br className="hidden sm:block" />
              propietarios e inquilinos
            </h1>
            <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              Conoce el valor de contrato, recaudo y servicios adicionales por ciudad. Diseñamos
              este esquema para que sepas exactamente lo que pagas y proyectes la rentabilidad de
              tu inmueble desde el primer día.
            </p>
          </div>

          <div className="xl:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-[var(--background-elevated)] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_90%_-10%,rgba(123,31,58,0.20),transparent_55%)] pointer-events-none" />
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden">
                <Image
                  src="/side-view-hand-holding-mexican-coin.jpg"
                  alt="Persona sosteniendo una moneda como referencia de costos de arriendo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 md:mt-16">
          <h2 className="text-center text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)] font-semibold">
            Selecciona una ciudad
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {tarifasPorCiudad.map((item) => {
              const active = item.ciudad === ciudad.ciudad;
              return (
                <button
                  key={item.ciudad}
                  type="button"
                  onClick={() => setCiudad(item)}
                  className={`min-h-[44px] px-5 py-2.5 rounded-full border text-sm sm:text-base transition-colors ${
                    active
                      ? "bg-[#7b1f3a] text-white border-[#7b1f3a]"
                      : "bg-white text-[var(--text-primary)] border-black/10 hover:border-[#7b1f3a]/40 hover:text-[#7b1f3a]"
                  }`}
                >
                  {item.ciudad}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <article className="rounded-3xl bg-white border border-black/5 p-6 sm:p-7 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7b1f3a]">description</span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                Derechos de contrato
              </h3>
            </div>
            <p className="mt-4 text-[var(--text-secondary)]">
              Valor a cargo del arrendatario para formalizar el contrato de arriendo.
            </p>
            <p className="mt-8 text-3xl sm:text-4xl font-semibold text-[#7b1f3a]">
              {ciudad.canonPct}% + IVA
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Sobre el canon mensual
            </p>
          </article>

          <article className="rounded-3xl bg-white border border-black/5 p-6 sm:p-7 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7b1f3a]">
                account_balance_wallet
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                Valor de recaudo
              </h3>
            </div>
            <p className="mt-4 text-[var(--text-secondary)]">
              Cobro mensual por gestión de recaudo y administración operativa.
            </p>
            <p className="mt-8 text-3xl sm:text-4xl font-semibold text-[#7b1f3a]">
              {toCurrency(ciudad.recaudo)}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Cargo mensual
            </p>
          </article>
        </section>

        <section className="mt-12 overflow-hidden rounded-3xl border border-black/5 shadow-[0_16px_42px_rgba(0,0,0,0.10)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white p-6 sm:p-8 md:p-10">
              <h2
                className="text-3xl sm:text-4xl text-[var(--text-primary)] font-semibold tracking-tight"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                Simulador de tarifas
              </h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Estima rápidamente costos de contratación y proyección de ingreso neto.
              </p>

              <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="canon" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Valor arriendo mensual
                  </label>
                  <input
                    id="canon"
                    type="number"
                    min={0}
                    value={canonMensual}
                    onChange={(e) => setCanonMensual(Number(e.target.value))}
                    className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[#7b1f3a]/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Valor administración
                  </label>
                  <input
                    id="admin"
                    type="number"
                    min={0}
                    value={administracion}
                    onChange={(e) => setAdministracion(Number(e.target.value))}
                    className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[#7b1f3a]/30"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ivaIncluido}
                    onChange={(e) => setIvaIncluido(e.target.checked)}
                    className="h-5 w-5 rounded border-black/20 accent-[#7b1f3a]"
                  />
                  <span className="text-sm text-[var(--text-secondary)]">
                    Incluir IVA en derechos de contrato
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seguroPlus}
                    onChange={(e) => setSeguroPlus(e.target.checked)}
                    className="h-5 w-5 rounded border-black/20 accent-[#7b1f3a]"
                  />
                  <span className="text-sm text-[var(--text-secondary)]">
                    Seguro premium de impago (+2% del canon)
                  </span>
                </label>
              </form>
            </div>

            <div className="bg-[#7b1f3a] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
                Resultado estimado
              </span>
              <h3
                className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                {toCurrency(Math.max(calculo.ingresoNetoMensual, 0))}
              </h3>
              <p className="text-white/80 mt-1">Ingreso neto mensual aproximado</p>

              <div className="mt-8 space-y-3 border-t border-white/20 pt-6 text-sm sm:text-base">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/75">Base canon + administración</span>
                  <span>{toCurrency(calculo.baseTotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/75">Derechos de contrato ({ciudad.canonPct}%)</span>
                  <span>- {toCurrency(calculo.derechosContrato)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/75">Recaudo mensual</span>
                  <span>- {toCurrency(calculo.recaudo)}</span>
                </div>
                {seguroPlus && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/75">Seguro premium</span>
                    <span>- {toCurrency(calculo.feeSeguro)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-4 text-lg font-semibold">
                  <span>Total primer mes</span>
                  <span>{toCurrency(calculo.totalPrimerMes)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-lg font-semibold">
                  <span>Retorno anual estimado</span>
                  <span>{toCurrency(Math.max(calculo.retornoAnual, 0))}</span>
                </div>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-white/70">
                Esta simulación es orientativa y puede variar según condiciones del inmueble,
                ciudad y cláusulas del contrato.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-20 text-center max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] font-semibold tracking-tight"
            style={{ fontFamily: '"Instrument Serif"' }}
          >
            ¿Necesitas una tarifa personalizada?
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] text-sm sm:text-base md:text-lg">
            Si manejas varias propiedades, te ayudamos con una estructura de costos ajustada a tu
            portafolio y al ritmo operativo de tu negocio.
          </p>
          <a
            href="https://wa.me/573178001592"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full min-h-[44px] border border-[#a23b5a] bg-[#7b1f3a] text-white hover:bg-[#5a1429] transition-colors"
          >
            Hablar con un asesor
            <span className="material-symbols-outlined text-base" aria-hidden>
              arrow_forward
            </span>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
