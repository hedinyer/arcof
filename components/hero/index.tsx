"use client";

import { SearchBarPill } from "@/components/search/SearchBarPill";
import { HeroHeader } from "./HeroHeader";

type HeroVariant = "home" | "nosotros" | "propiedades";

const heroContent = {
  home: {
    badge: "Nuevo",
    badgeDesc: "Encuentra tu hogar ideal o renta tu inmueble sin complicaciones",
    title: (
      <>
        Tu Hogar Ideal
        <br className="hidden sm:block" />
        Está Más Cerca de lo que Crees
      </>
    ),
    paragraph:
      "Con Arcof Inmobiliaria encuentra la casa o apartamento perfecto para arrendar en minutos. ¿Tienes un inmueble? Ponlo en renta con nosotros, gana dinero mes a mes y olvídate de la parte administrativa.",
    footer: "Propietarios e inquilinos confían en Arcof",
  },
  nosotros: {
    badge: "Nosotros",
    badgeDesc: "Soluciones inmobiliarias integrales en Bucaramanga",
    title: (
      <>
        Confianza, Transparencia
        <br className="hidden sm:block" />
        y Excelencia en Bienes Raíces
      </>
    ),
    paragraph:
      "Nos especializamos en la administración de inmuebles con un enfoque transparente, respaldado por solidez financiera y tecnología de vanguardia. Protegemos el patrimonio de nuestros clientes con un servicio ágil y personalizado.",
    footer: "Referentes en Bucaramanga y su área metropolitana",
  },
  propiedades: {
    badge: "Propiedades",
    badgeDesc: "Arrienda o compra con confianza en Bucaramanga y área metropolitana",
    title: (
      <>
        Encuentra Tu
        <br className="hidden sm:block" />
        Próximo Hogar
      </>
    ),
    paragraph:
      "Explora apartamentos, casas, locales y más. Publicamos solo inmuebles verificados para que tomes la mejor decisión.",
    footer: "Bucaramanga, Girón y Piedecuesta",
  },
};

export function Hero({ variant = "home" }: { variant?: HeroVariant }) {
  const content = heroContent[variant];
  const isCompact = variant === "propiedades";

  return (
    <>
      <HeroHeader />
      <section
        className={`w-full isolate overflow-hidden relative bg-background ${
          isCompact ? "min-h-[42vh]" : "min-h-screen"
        }`}
        data-element-locator="hero-section"
      >
        {/* Background video - nítido en ambas variantes */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/1476390_People_Lifestyle_3840x2160.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="z-10 relative" data-element-locator="hero-content">
          <div
            className={`max-w-7xl mr-auto ml-auto pr-6 pl-6 ${
              isCompact
                ? "pt-24 pb-8 sm:pt-28 sm:pb-10"
                : "sm:pt-28 md:pt-32 lg:pt-40 pt-28 pb-16"
            }`}
          >
          <div className="mx-auto max-w-3xl text-center">
            <div
              className={`inline-flex items-center gap-3 rounded-full bg-neutral-100 px-2.5 py-2 ring-1 ring-neutral-200 animate-on-scroll ${
                isCompact ? "mb-3" : "mb-6"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center text-xs font-medium text-neutral-900 bg-white rounded-full pt-0.5 pr-2 pb-0.5 pl-2 font-sans ring-1 ring-neutral-200">
                {content.badge}
              </span>
              <span className="text-sm font-medium text-text-primary font-sans">
                {content.badgeDesc}
              </span>
            </div>
            <h1
              className={`leading-tight text-white tracking-tight font-bold animate-on-scroll ${
                isCompact
                  ? "text-2xl sm:text-3xl md:text-4xl"
                  : "sm:text-5xl md:text-6xl lg:text-7xl text-4xl"
              }`}
              style={{
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                animationDelay: "0.2s",
              }}
            >
              {content.title}
            </h1>
            <p
              className={`animate-on-scroll text-white font-bold max-w-2xl mr-auto ml-auto ${
                isCompact ? "text-sm sm:text-base mt-3" : "sm:text-lg text-base mt-6"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              {content.paragraph}
            </p>
          </div>
          <div className={`mx-auto max-w-5xl ${isCompact ? "mt-6" : "mt-20"}`}>
            <p className="animate-on-scroll text-sm text-white font-bold text-center" style={{ animationDelay: "0.1s" }}>
              {content.footer}
            </p>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
