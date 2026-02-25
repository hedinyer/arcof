"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/login/LoginModal";
import { useAuth } from "@/components/providers/AuthProvider";

export function HeroHeader() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, usuario, signOut } = useAuth();
  const router = useRouter();

  // Obtener la primera palabra del nombre completo
  const primerNombre = usuario?.nombre_completo
    ? usuario.nombre_completo.split(" ")[0]
    : null;

  const handlePublicarClick = () => {
    if (user) {
      router.push("/publicar");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCerrarSesion = async () => {
    await signOut();
    router.push("/");
    router.refresh();
    setIsMobileMenuOpen(false);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-100 w-full bg-transparent transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-2 md:pt-4 md:pb-0">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/75 backdrop-blur-0 ring-1 ring-black/10 px-3 py-2 md:bg-transparent md:ring-0 md:px-0 md:py-0">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] rounded md:hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arcof-logo.png"
            alt="ARCOF INMOBILIARIA"
            width={100}
            height={40}
            className="object-contain"
          />
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center w-full max-w-5xl mx-auto rounded-full bg-white/90 px-3 py-2 ring-1 ring-gray-300/40 shadow-lg">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] rounded shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arcof-logo.png"
                alt="ARCOF INMOBILIARIA"
                width={100}
                height={40}
                className="object-contain"
              />
            </Link>
            <div className="flex items-center justify-center gap-1 flex-1 min-w-0">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700 font-sans [text-shadow:0_0_1px_rgba(255,255,255,.9),0_0_2px_rgba(255,255,255,.5)]"
              >
                Inicio
              </Link>
              <Link
                href="/propiedades?tipo=arrendar"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans [text-shadow:0_0_1px_rgba(255,255,255,.9),0_0_2px_rgba(255,255,255,.5)]"
              >
                Arrendar
              </Link>
              <Link
                href="/propiedades?tipo=comprar"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans [text-shadow:0_0_1px_rgba(255,255,255,.9),0_0_2px_rgba(255,255,255,.5)]"
              >
                Comprar
              </Link>
              <Link
                href="/nosotros"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans [text-shadow:0_0_1px_rgba(255,255,255,.9),0_0_2px_rgba(255,255,255,.5)]"
              >
                Nosotros
              </Link>
            </div>
            <div className="flex items-center gap-1 shrink-0 mr-2">
              {user && primerNombre ? (
                <div className="flex items-center gap-2 ml-1">
                  <span className="px-3 py-2 text-sm font-medium text-gray-900 font-sans [text-shadow:0_0_1px_rgba(255,255,255,.9),0_0_2px_rgba(255,255,255,.5)]">
                    Hola, {primerNombre}
                  </span>
                  <button
                    onClick={handlePublicarClick}
                    className="inline-flex items-center gap-2 rounded-full bg-[#7b1f3a] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#6a1a32] font-sans transition-colors"
                  >
                    Pon tu inmueble
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right h-4 w-4"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleCerrarSesion}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans [text-shadow:0_0_1px_rgba(255,255,255,.9),0_0_2px_rgba(255,255,255,.5)]"
                    title="Cerrar sesión"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <button
                  onClick={handlePublicarClick}
                  className="ml-1 inline-flex items-center gap-2 rounded-full bg-[#7b1f3a] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#6a1a32] font-sans transition-colors"
                >
                  Pon tu inmueble
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right h-4 w-4"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </nav>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 ring-1 ring-black/10"
          id="mobile-menu-button"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={handleToggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x h-5 w-5 text-gray-900/80"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu h-5 w-5 text-gray-900/80"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          )}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden px-6 pt-2 pb-3 transition-all duration-200 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <div className="rounded-2xl bg-black/80 border border-white/10 p-4 space-y-3">
          <div className="flex flex-col space-y-1 text-sm font-sans">
            <Link
              href="/"
              className="py-2 text-white/90 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/propiedades?tipo=arrendar"
              className="py-2 text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Arrendar
            </Link>
            <Link
              href="/propiedades?tipo=comprar"
              className="py-2 text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Comprar
            </Link>
            <Link
              href="/nosotros"
              className="py-2 text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
          </div>
          <div className="pt-2 border-t border-white/10 mt-2 space-y-2">
            {user && primerNombre ? (
              <>
                <p className="text-xs text-white/70">
                  Hola, <span className="font-semibold">{primerNombre}</span>
                </p>
                <button
                  onClick={handlePublicarClick}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7b1f3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#6a1a32] font-sans transition-colors"
                >
                  Pon tu inmueble
                </button>
                <button
                  onClick={handleCerrarSesion}
                  className="w-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white font-sans text-center"
                >
                  Salir
                </button>
              </>
            ) : (
              <button
                onClick={handlePublicarClick}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7b1f3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#6a1a32] font-sans transition-colors"
              >
                Pon tu inmueble
              </button>
            )}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
    </>
  );
}
