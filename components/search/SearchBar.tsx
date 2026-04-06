"use client";

import { useState } from "react";
import type { ListingFilterId } from "./SearchBarContext";
import { useListingFilter, useSearchBarScroll } from "./SearchBarContext";
import { SearchBarPill } from "./SearchBarPill";

const filters: { id: ListingFilterId; image: string; label: string }[] = [
  { id: "rentar", image: "/rentar.png", label: "Rentar" },
  { id: "comprar", image: "/comprar.png", label: "Comprar" },
  { id: "vender", image: "/vender.png", label: "Pagar" },
];

const PAYMENT_URL =
  "https://portalpagos.davivienda.com/#/comercio/10553/ARCOF%20INMOBILIARIA%20A%20SAS";

export function SearchBar() {
  const { activeFilter, setActiveFilter } = useListingFilter();
  const { showInHeader } = useSearchBarScroll();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 mb-4 sm:mt-8 sm:mb-8 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-center gap-8 sm:gap-6 md:gap-10 lg:gap-12 mt-[-76px] mb-5 sm:mb-7 bg-transparent px-4 py-0 sm:px-8 sm:py-0 md:px-10 md:py-0 rounded-full flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setActiveFilter(f.id);
                if (f.id === "vender") {
                  if (typeof window !== "undefined") {
                    window.open(PAYMENT_URL, "_blank", "noopener,noreferrer");
                  }
                  setShowPaymentModal(true);
                }
              }}
              className={`flex items-center gap-2 sm:gap-3 md:gap-4 group transition-colors ${
                activeFilter === f.id
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-primary)] hover:text-[var(--accent)]"
              }`}
            >
              <img
                src={f.image}
                alt=""
                className={`object-contain shrink-0 ${
                  f.id === "vender"
                    ? "h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-40 lg:w-40"
                    : "h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem] md:h-24 md:w-24 lg:h-28 lg:w-28"
                }`}
                width={f.id === "vender" ? 160 : 112}
                height={f.id === "vender" ? 160 : 112}
              />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">
                {f.label}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full" data-search-bar>
          {!showInHeader ? (
            <div>
              <SearchBarPill />
            </div>
          ) : (
            <div className="h-[62px]" aria-hidden />
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-[var(--background)] text-[var(--text-primary)] rounded-2xl shadow-xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden">
            <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--text-secondary)]/20">
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  Pago en línea
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Portal de pagos Davivienda para ARCOF Inmobiliaria A SAS
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--background-elevated)] transition-colors"
                aria-label="Cerrar"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </header>

            <div className="flex-1 bg-[var(--background-elevated)] flex flex-col items-center justify-center px-4 sm:px-8 text-center">
              <p className="text-sm sm:text-base text-[var(--text-primary)] mb-3 sm:mb-4">
                Hemos abierto el portal de pagos de Davivienda en una nueva pestaña de tu
                navegador.
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">
                Si no ves la pestaña, es posible que el navegador haya bloqueado la ventana
                emergente. En ese caso, haz clic en el botón de abajo para abrir el portal
                nuevamente.
              </p>
              <a
                href={PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[var(--accent)] text-white text-sm sm:text-base font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                Abrir portal de pagos
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
