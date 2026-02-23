import { Hero } from "@/components/hero";
import { Footer } from "@/components/layout/Footer";
import { TeamSection } from "@/components/sections/TeamSection";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Hero variant="nosotros" />
      <main className="max-w-[1920px] mx-auto">
        {/* Stats strip — confianza y engagement */}
        <section
          className="px-6 md:px-12 py-10 md:py-14 border-y border-[var(--text-secondary)]/12 bg-[var(--background-elevated)]/40"
          aria-label="Cifras"
        >
          <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10">
            <header className="text-center">
              <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.2em] font-sans mb-2">
                Confianza en números
              </p>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Más de una década acompañando propietarios e inversionistas en Bucaramanga y su área metropolitana.
              </p>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div className="rounded-2xl bg-[var(--background)]/80 border border-[var(--text-secondary)]/10 px-4 py-5 md:py-6 shadow-[var(--shadow-card-soft,0_18px_45px_rgba(15,23,42,0.12))]">
                <p className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] tabular-nums tracking-tight font-sans">
                +10
                </p>
                <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] mt-1.5 uppercase tracking-[0.18em]">
                  Años de experiencia
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--background)]/80 border border-[var(--text-secondary)]/10 px-4 py-5 md:py-6 shadow-[var(--shadow-card-soft,0_18px_45px_rgba(15,23,42,0.12))]">
                <p className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] tabular-nums tracking-tight font-sans">
                +500
                </p>
                <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] mt-1.5 uppercase tracking-[0.18em]">
                  Clientes activos
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--background)]/80 border border-[var(--text-secondary)]/10 px-4 py-5 md:py-6 shadow-[var(--shadow-card-soft,0_18px_45px_rgba(15,23,42,0.12))]">
                <p className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight font-sans">
                Bucaramanga
                </p>
                <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] mt-1.5 uppercase tracking-[0.18em]">
                  Área metropolitana
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/35 px-4 py-5 md:py-6 shadow-[0_20px_45px_rgba(114,47,55,0.35)]">
                <p className="text-3xl md:text-4xl font-semibold text-[var(--accent)] tabular-nums tracking-tight font-sans">
                100%
                </p>
                <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] mt-1.5 uppercase tracking-[0.18em]">
                  Enfocados en ti
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-8">
          {/* Misión y visión — layout en grid */}
          <section
            className="scroll-mt-24 mb-20 md:mb-28"
            aria-labelledby="mision-vision-heading"
          >
            <div className="mb-10 md:mb-12 text-left md:text-center">
              <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.2em] font-sans mb-2">
                Quiénes somos
              </p>
              <h2
                id="mision-vision-heading"
                className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] font-sans tracking-tight"
              >
                Misión y visión que nos inspiran
              </h2>
            </div>
            <div className="grid gap-8 md:gap-10 md:grid-cols-2">
              <article
                id="mision"
                className="rounded-2xl border border-[var(--text-secondary)]/10 bg-[var(--background)]/95 p-6 md:p-8 shadow-[var(--shadow-card)] flex flex-col h-full"
              >
                <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.2em] font-sans mb-4">
                  Nuestra misión
                </p>
                <blockquote
                  className="text-xl md:text-[1.35rem] text-[var(--text-primary)] leading-snug font-medium font-sans mb-5 border-l-4 border-[var(--accent)] pl-5"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
                >
                  Soluciones inmobiliarias integrales en Bucaramanga: seguridad, confianza y
                  rentabilidad para propietarios e inversionistas.
                </blockquote>
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                  Nos especializamos en la administración de inmuebles con un enfoque
                  transparente, respaldado por solidez financiera y tecnología de vanguardia.
                  A través de un equipo capacitado y alianzas con aseguradoras líderes,
                  protegemos el patrimonio de nuestros clientes con un servicio ágil,
                  cercano y enfocado en la excelencia.
                </p>
              </article>

              <article
                id="vision"
                className="rounded-2xl border border-[var(--text-secondary)]/10 bg-[var(--background)]/95 p-6 md:p-8 shadow-[var(--shadow-card)] flex flex-col h-full"
              >
                <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.2em] font-sans mb-4">
                  Nuestra visión
                </p>
                <blockquote
                  className="text-xl md:text-[1.35rem] text-[var(--text-primary)] leading-snug font-medium font-sans mb-5 border-l-4 border-[var(--accent)] pl-5"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
                >
                  Ser la inmobiliaria de mayor confianza y reconocimiento en Bucaramanga.
                </blockquote>
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                  Nos destacamos por ética, transparencia y excelencia en administración y
                  comercialización de bienes raíces. Transformamos el sector con innovación,
                  tecnología avanzada y servicio personalizado, asegurando tranquilidad y
                  rentabilidad para cada uno de nuestros clientes.
                </p>
              </article>
            </div>
          </section>

          {/* Propuesta de valor — grid scannable */}
          <section className="scroll-mt-24 mb-20 md:mb-28" id="valor">
            <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.2em] font-sans mb-2">
              Lo que nos define
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] font-sans tracking-tight mb-10">
              Propuesta de valor
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {[
                {
                  title: "Atención personalizada",
                  desc: "Entendemos las necesidades de cada cliente con un servicio humano y cercano.",
                  icon: "person",
                },
                {
                  title: "Equipo especializado",
                  desc: "Expertos en gestión inmobiliaria y mercado local de Bucaramanga.",
                  icon: "team",
                },
                {
                  title: "Innovación y tecnología",
                  desc: "Herramientas avanzadas para maximizar visibilidad y rentabilidad.",
                  icon: "tech",
                },
                {
                  title: "Protección del patrimonio",
                  desc: "Pago puntual del canon y conservación de los inmuebles asegurados.",
                  icon: "shield",
                },
                {
                  title: "Presencia estratégica",
                  desc: "Referentes en Bucaramanga y área metropolitana en cada transacción.",
                  icon: "place",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="group flex gap-4 p-4 md:p-5 rounded-xl bg-[var(--background-elevated)]/75 border border-transparent hover:border-[var(--text-secondary)]/18 hover:bg-[var(--background-elevated)] transition-colors shadow-[var(--shadow-card-soft,0_18px_45px_rgba(15,23,42,0.12))]"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)]/18 transition-colors"
                    aria-hidden
                  >
                    {item.icon === "person" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {item.icon === "team" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {item.icon === "tech" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {item.icon === "shield" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {item.icon === "place" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] font-sans">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA principal — alto CTA y engagement */}
          <section
            className="scroll-mt-24 rounded-2xl sm:rounded-[28px] overflow-hidden mb-20 md:mb-28"
            aria-label="Contactar"
          >
            <div className="relative bg-[#722F37] text-white p-8 md:p-12 lg:p-16">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_70%_-10%,rgba(255,255,255,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-80" />
              </div>
              <div className="relative max-w-2xl">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
                >
                  ¿Listo para trabajar con nosotros?
                </h2>
                <p className="mt-3 text-white/80 text-base md:text-lg max-w-lg">
                  Cuéntanos si quieres arrendar, administrar tu inmueble o encontrar tu próximo hogar. Estamos para ayudarte.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/573178001592"
                    target="_blank"
                    rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-[#722F37] font-semibold hover:bg-white/95 transition-colors shadow-[0_18px_40px_rgba(15,23,42,0.35)]"
                aria-label="Escribir a la inmobiliaria Arcof por WhatsApp"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Escribir por WhatsApp
                  </a>
                  <Link
                    href="/publicar"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Publicar mi inmueble
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
