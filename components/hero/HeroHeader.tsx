"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchBarPill } from "@/components/search/SearchBarPill";
import { LoginModal } from "@/components/login/LoginModal";
import { useAuth } from "@/components/providers/AuthProvider";

export function HeroHeader() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-transparent transition-colors py-4">
      <div className="mr-6 ml-6 flex items-center justify-between gap-4">
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
        <div className="hidden sm:flex md:hidden flex-1 justify-center min-w-0">
          <SearchBarPill compact />
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-1 rounded-full bg-white px-1 py-1 ring-1 ring-gray-300/40 w-full max-w-[95vw] shadow-lg">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] rounded"
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
            <div className="flex items-center min-w-0 flex-1 max-w-none">
              <SearchBarPill compact />
            </div>
            <div className="flex items-center gap-1 ml-auto shrink-0 mr-2">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700 font-sans"
              >
                Inicio
              </Link>
              <Link
                href="/propiedades?tipo=arrendar"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans"
              >
                Arrendar
              </Link>
              <Link
                href="/propiedades?tipo=comprar"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans"
              >
                Comprar
              </Link>
              <Link
                href="/nosotros"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans"
              >
                Nosotros
              </Link>
              {user && primerNombre ? (
                <div className="flex items-center gap-2 ml-1">
                  <span className="px-3 py-2 text-sm font-medium text-gray-900 font-sans">
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
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 font-sans"
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
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
          id="mobile-menu-button"
          aria-expanded="false"
          aria-label="Toggle menu"
        >
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
            className="lucide lucide-menu h-5 w-5 text-white/90"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
    </>
  );
}
