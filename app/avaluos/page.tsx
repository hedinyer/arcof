import Image from "next/image";
import { HeroHeader } from "@/components/hero/HeroHeader";
import { Footer } from "@/components/layout/Footer";

const ciudades = ["Bucaramanga", "Bogotá", "Medellín", "Cali", "Cartagena"];

const especialidades = [
  {
    title: "Avalúos Comerciales",
    description:
      "Determinación técnica del valor de mercado para compra, venta, garantías y decisiones estratégicas.",
    icon: "business_center",
    imageSrc: "/young-business-people-office-working-with-tablet.jpg",
    featured: true,
  },
  {
    title: "Avalúos de Renta",
    description:
      "Análisis de canon de arrendamiento competitivo para maximizar ocupación y rentabilidad.",
    icon: "sell",
    imageSrc: "/side-view-hand-holding-mexican-coin.jpg",
    featured: false,
  },
  {
    title: "Avalúos Urbanos",
    description:
      "Valoración de predios urbanos considerando normativa, entorno, uso del suelo y potencial.",
    icon: "apartment",
    imageSrc: "/young-couple-buying-car-car-showroom.jpg",
    featured: false,
  },
];

const metodologia = [
  {
    step: "01",
    title: "Solicitud y diagnóstico",
    text: "Analizamos el objetivo del avalúo, documentación base y alcance técnico requerido.",
  },
  {
    step: "02",
    title: "Visita técnica",
    text: "Inspección presencial para validar estado físico, acabados, ubicación y variables del activo.",
  },
  {
    step: "03",
    title: "Estudio de mercado",
    text: "Comparamos inmuebles y transacciones similares para soportar una valoración objetiva.",
  },
  {
    step: "04",
    title: "Informe final",
    text: "Entregamos reporte profesional con soporte metodológico y recomendaciones accionables.",
  },
];

export default function AvaluosPage() {
  const principal = especialidades.find((item) => item.featured)!;
  const secundarias = especialidades.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      <main className="pt-24 md:pt-28">
        <section className="relative overflow-hidden px-6 md:px-12 py-12 md:py-20">
          <div className="absolute inset-0">
            <Image
              src="/young-business-people-office-working-with-tablet.jpg"
              alt="Equipo técnico revisando información de avalúos inmobiliarios"
              fill
              className="object-cover opacity-10"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-white/70" />
          </div>

          <div className="relative z-10 max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#7b1f3a]/10 border border-[#a23b5a]/40 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#7b1f3a]">
                Servicios técnicos
              </span>
              <h1
                className="mt-5 text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] leading-[1.05] tracking-tight"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                Avalúos de precisión
                <br className="hidden sm:block" />
                para decisiones seguras
              </h1>
              <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                Convertimos datos técnicos en claridad estratégica. Nuestro equipo evalúa el valor
                real de tu inmueble con criterios de mercado, normativa vigente y enfoque comercial.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {ciudades.map((ciudad) => (
                  <span
                    key={ciudad}
                    className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-xs sm:text-sm text-[var(--text-primary)]"
                  >
                    {ciudad}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-[var(--background-elevated)] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.14)]">
                <div className="relative h-[420px] rounded-2xl overflow-hidden">
                  <Image
                    src="/young-couple-buying-car-car-showroom.jpg"
                    alt="Asesoría profesional en proceso de avalúo inmobiliario"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-14 md:py-20 bg-[var(--background-elevated)]">
          <div className="max-w-[1920px] mx-auto">
            <div className="mb-10 md:mb-12">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)]"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                Especialidades de avalúo
              </h2>
              <div className="mt-4 h-1 w-24 bg-[#7b1f3a]" />
            </div>

            <div className="grid grid-cols-1 gap-5 md:gap-6 max-w-4xl mx-auto">
              <article className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] min-h-[420px] flex flex-col">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-[#7b1f3a] text-4xl">
                    {principal.icon}
                  </span>
                  <h3 className="text-2xl sm:text-3xl text-[var(--text-primary)] font-semibold">
                    {principal.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] max-w-2xl">{principal.description}</p>
                </div>
                <div className="mt-6 relative h-52 sm:h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={principal.imageSrc}
                    alt={principal.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
                <div className="mt-auto pt-6">
                  <a
                    href="https://wa.me/573178001592"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[#a23b5a] px-5 text-sm font-medium leading-none text-[#7b1f3a] hover:bg-[#7b1f3a] hover:text-white transition-colors"
                  >
                    <span>Explorar servicio</span>
                    <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
                  </a>
                </div>
              </article>

              <article className="rounded-3xl border border-[#a23b5a]/30 bg-[#7b1f3a] p-6 sm:p-8 text-white shadow-[0_16px_42px_rgba(90,20,41,0.35)] min-h-[420px] flex flex-col">
                <span className="material-symbols-outlined text-4xl">sell</span>
                <h3 className="mt-4 text-2xl font-semibold">{secundarias[0].title}</h3>
                <p className="mt-3 text-white/85 leading-relaxed">{secundarias[0].description}</p>
                <div className="mt-6 relative h-52 sm:h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={secundarias[0].imageSrc}
                    alt={secundarias[0].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
                <div className="mt-auto pt-6">
                  <a
                    href="https://wa.me/573178001592"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-sm font-medium leading-none text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Explorar servicio</span>
                    <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
                  </a>
                </div>
              </article>

              {secundarias.slice(1).map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] min-h-[420px] flex flex-col"
                >
                  <span className="material-symbols-outlined text-[#7b1f3a] text-4xl">{item.icon}</span>
                  <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                  <div className="mt-6 relative h-44 rounded-2xl overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="mt-auto pt-6">
                    <a
                      href="https://wa.me/573178001592"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-[#a23b5a] px-5 text-sm font-medium leading-none text-[#7b1f3a] hover:bg-[#7b1f3a] hover:text-white transition-colors"
                    >
                      <span>Explorar servicio</span>
                      <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-14 md:py-20">
          <div className="max-w-[1920px] mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)]"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                Nuestra metodología
              </h2>
              <p className="mt-4 text-[var(--text-secondary)]">
                Un proceso diseñado para garantizar precisión, trazabilidad y transparencia en cada
                informe de avalúo.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {metodologia.map((item, idx) => (
                <article
                  key={item.step}
                  className="relative rounded-2xl border-t-4 p-6 bg-[var(--background-elevated)] border-[#7b1f3a]"
                  style={{ borderTopColor: `rgba(123,31,58,${1 - idx * 0.2})` }}
                >
                  <span
                    className="absolute -top-6 left-6 text-6xl select-none"
                    style={{ fontFamily: '"Instrument Serif"', color: "rgba(123,31,58,0.18)" }}
                  >
                    {item.step}
                  </span>
                  <h4 className="pt-5 text-xl font-semibold text-[var(--text-primary)]">{item.title}</h4>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-16 md:pb-20">
          <div className="max-w-[1280px] mx-auto rounded-3xl bg-[#7b1f3a] p-8 sm:p-10 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-white/10" />
            <div className="relative z-10">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl"
                style={{ fontFamily: '"Instrument Serif"' }}
              >
                Habla con un experto valuador
              </h2>
              <p className="mt-4 text-white/85 max-w-2xl mx-auto">
                Te asesoramos sobre el tipo de avalúo que necesitas y coordinamos tu visita en el
                menor tiempo posible.
              </p>
              <a
                href="https://wa.me/573178001592"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white text-[#7b1f3a] px-8 py-3 font-semibold hover:bg-[#f4dce3] transition-colors"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
