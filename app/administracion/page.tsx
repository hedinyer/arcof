import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/hero/HeroHeader";
import { Footer } from "@/components/layout/Footer";

const beneficios = [
  {
    icon: "payments",
    title: "Renta garantizada",
    description:
      "Administramos el recaudo para que recibas tu canon con trazabilidad y seguimiento constante.",
  },
  {
    icon: "gavel",
    title: "Blindaje legal",
    description:
      "Gestión de contratos, renovaciones y soporte legal para proteger tu patrimonio inmobiliario.",
  },
  {
    icon: "architecture",
    title: "Mantenimiento",
    description:
      "Coordinamos revisiones y atención de incidencias para conservar tu inmueble en óptimo estado.",
  },
  {
    icon: "monitoring",
    title: "Gestión digital",
    description:
      "Reportes claros sobre pagos, estado del inmueble y novedades operativas en cada periodo.",
  },
];

export default function AdministracionPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      <main className="pt-24 md:pt-28">
        <section className="px-6 md:px-12 py-12 md:py-20">
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center rounded-full bg-[#7b1f3a]/10 border border-[#a23b5a]/40 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#7b1f3a]">
                Servicios para propietarios
              </span>
              <h1
                className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)] leading-[1.05]"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                Administración
                <br />
                <span className="italic">sin esfuerzo.</span>
              </h1>
              <p className="mt-6 text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Olvídate de las preocupaciones operativas del arriendo. En ARCOF nos encargamos de
                la gestión integral de tu inmueble para que ganes tranquilidad, tiempo y control.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://wa.me/573178001592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#7b1f3a] px-7 text-white font-medium hover:bg-[#5a1429] transition-colors"
                >
                  Empezar ahora
                </a>
                <Link
                  href="/tarifas"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-black/10 bg-[var(--background-elevated)] px-7 text-[var(--text-primary)] font-medium hover:bg-white transition-colors"
                >
                  Ver tarifas
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[430px] sm:h-[520px] lg:h-[640px]">
                <div className="absolute inset-0 rounded-[2rem] bg-[var(--background-elevated)] -rotate-2 translate-x-3 translate-y-3" />
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                  <Image
                    src="/young-business-people-office-working-with-tablet.jpg"
                    alt="Equipo inmobiliario administrando propiedades"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-14 md:py-20 bg-[var(--background-elevated)]">
          <div className="max-w-[1920px] mx-auto">
            <div className="max-w-3xl mb-10 md:mb-14">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)]"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                Beneficios para propietarios
              </h2>
              <div className="mt-4 h-1 w-24 bg-[#7b1f3a]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
              {beneficios.map((beneficio) => (
                <article
                  key={beneficio.title}
                  className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]"
                >
                  <span className="material-symbols-outlined text-[#7b1f3a] text-5xl">
                    {beneficio.icon}
                  </span>
                  <h3 className="mt-6 text-2xl text-[var(--text-primary)] font-semibold">
                    {beneficio.title}
                  </h3>
                  <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                    {beneficio.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-[1920px] mx-auto">
            <section className="text-center max-w-3xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] font-semibold tracking-tight"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                ¿Listo para profesionalizar tu patrimonio?
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] text-sm sm:text-base md:text-lg">
                Agenda una asesoría con nuestro equipo y recibe una propuesta de administración
                ajustada a tu inmueble.
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
