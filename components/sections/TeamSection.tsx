"use client";

import Image from "next/image";
import { useState } from "react";

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  imagePath: string; // e.g. "/team/director.jpg"
  featured?: boolean;
};

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Tu nombre",
    position: "Director General",
    imagePath: "/team/director.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Nombre asesor",
    position: "Asesor Comercial",
    imagePath: "/team/asesor-1.jpg",
  },
  {
    id: "3",
    name: "Nombre asesor",
    position: "Asesor Comercial",
    imagePath: "/team/asesor-2.jpg",
  },
  {
    id: "4",
    name: "Nombre asesor",
    position: "Administración de Arriendos",
    imagePath: "/team/asesor-3.jpg",
  },
  {
    id: "5",
    name: "Nombre asesor",
    position: "Avalúos y Gestión",
    imagePath: "/team/asesor-4.jpg",
  },
];

function TeamCard({
  member,
  size = "default",
}: {
  member: TeamMember;
  size?: "featured" | "default";
}) {
  const [imgError, setImgError] = useState(false);
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isFeatured = size === "featured";

  return (
    <article
      className={`group group/card relative overflow-hidden rounded-2xl bg-background-elevated ${
        isFeatured
          ? "md:col-span-2 md:row-span-1 min-h-[320px] md:min-h-[380px]"
          : "aspect-4/5 min-h-[280px] sm:min-h-0"
      } shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div
        className={`absolute inset-0 bg-neutral-100 ${
          isFeatured ? "md:flex" : ""
        }`}
      >
        {/* Photo or fallback */}
        <div
          className={`relative bg-linear-to-br from-neutral-200 to-neutral-300 ${
            isFeatured
              ? "h-64 md:h-full md:w-1/2 md:min-w-[280px]"
              : "h-full w-full"
          }`}
        >
          {!imgError ? (
            <Image
              src={member.imagePath}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes={isFeatured ? "(min-width: 768px) 50vw, 100vw" : "(max-width: 768px) 100vw, 33vw"}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent/10 to-accent/5"
              aria-hidden
            >
              <span
                className="text-4xl font-semibold text-text-primary/40 font-sans md:text-5xl"
                style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
              >
                {initials}
              </span>
            </div>
          )}
          {/* Subtle overlay at bottom for text readability on photo */}
          <div
            className={`absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none ${
              isFeatured ? "md:from-black/50" : ""
            }`}
          />
        </div>

        {/* Info */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-5 pt-8 ${
            isFeatured ? "md:static md:flex md:flex-1 md:flex-col md:justify-center md:p-10 md:pt-8" : ""
          } bg-linear-to-t from-black/70 to-transparent md:bg-none md:from-transparent`}
        >
          <div className={isFeatured ? "md:bg-transparent" : ""}>
            <p className="text-white font-semibold text-lg tracking-tight font-sans md:text-text-primary">
              {member.name}
            </p>
            <p className="text-white/90 text-sm mt-0.5 font-sans md:text-text-secondary">
              {member.position}
            </p>
            {isFeatured && (
              <div className="mt-3 w-12 h-0.5 rounded-full bg-accent hidden md:block" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function TeamSection({ members = defaultTeam }: { members?: TeamMember[] }) {
  const featured = members.find((m) => m.featured) ?? members[0];
  const rest = members.filter((m) => m.id !== featured.id);

  return (
    <section
      className="scroll-mt-24 pt-14 pb-16 md:pt-20 md:pb-24 px-6 md:px-12 -mx-6 md:-mx-12"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--background-elevated) 12%, var(--background-elevated) 88%, var(--background) 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest font-sans mb-2">
            El equipo
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary font-sans tracking-tight">
            Conoce a quienes hacen posible tu tranquilidad
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto text-base md:text-lg">
            Profesionales con experiencia en el sector inmobiliario de Bucaramanga.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <TeamCard member={featured} size="featured" />
          {rest.map((member) => (
            <TeamCard key={member.id} member={member} size="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
