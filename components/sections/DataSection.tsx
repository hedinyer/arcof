"use client";

import Link from "next/link";

const partners = [
  { id: "1", name: "Davivienda", src: "/davivienda-300x162.png" },
  { id: "2", name: "El Libertador", src: "/el-libertador-300x162.jpg" },
  { id: "3", name: "Seguros Bolívar", src: "/seguros-bolivar.png" },
  { id: "4", name: "Cámara de Comercio", src: "/camaradecomercio-300x162.png" },
];

const serviceCards = [
  {
    id: "1",
    title: "Administración",
    description: "Solo te preocupas por administrar los buenos momentos de tu vida.",
    buttonText: "Contactar ahora",
    href: "/contacto",
    icon: "groups",
    imageSrc: "/young-business-people-office-working-with-tablet.jpg",
  },
  {
    id: "2",
    title: "Avalúos",
    description: "Descubre el valor de tus propiedades, sean rurales o urbanas.",
    buttonText: "Ir a Avalúos",
    href: "/avaluos",
    icon: "assessment",
    imageSrc: "/young-couple-buying-car-car-showroom.jpg",
  },
  {
    id: "3",
    title: "Conoce nuestras tarifas",
    description: "Para cada ciudad hay una tarifa especial.",
    buttonText: "Ir a Tarifas",
    href: "/tarifas",
    icon: "menu_book",
    imageSrc: "/side-view-hand-holding-mexican-coin.jpg",
  },
];

export function DataSection() {
  return (
    <section className="mb-0 mt-16 md:mt-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex items-center justify-center p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={partner.src}
              alt={partner.name}
              className="max-h-[80px] md:max-h-[100px] w-auto object-contain"
            />
          </div>
        ))}
      </div>

      <div className="mt-12 lg:mt-16">
        <h2 className="text-xl font-display font-bold mb-4 text-[var(--text-primary)]">
          Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
          <div
            key={card.id}
            className="group relative h-[520px] w-full bg-[#151515] rounded-[32px] overflow-hidden flex flex-col justify-between p-8 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            {/* background image layer */}
            <div className="absolute inset-0 w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.imageSrc}
                alt={card.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#151515] via-transparent to-transparent" />
            </div>

            {/* top-right circular icon badge similar to arrow circle */}
            <div className="absolute top-0 right-0 p-6 opacity-40 z-20 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm text-white">
                <span className="material-symbols-outlined text-2xl" aria-hidden>
                  {card.icon}
                </span>
              </div>
            </div>

            {/* content, aligned to bottom like collection cards */}
            <div className="mt-auto relative z-10">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                  Servicio
                </p>
                <h3 className="text-3xl tracking-tight leading-tight text-white">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-white/80 mb-6 max-w-md">
                {card.description}
              </p>
              <div className="flex justify-between items-center text-white/90 border-t border-white/10 pt-5">
                <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50">
                  Más información
                </span>
                <Link
                  href={card.href}
                  className="group/btn inline-flex items-center gap-3 px-5 py-2.5 bg-[#7b1f3a] text-white rounded-full hover:bg-[#5a1429] transition-all border border-[#a23b5a]"
                >
                  <span className="text-xs md:text-sm font-medium tracking-wide">
                    {card.buttonText}
                  </span>
                  <span className="material-symbols-outlined text-base md:text-lg group-hover/btn:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
