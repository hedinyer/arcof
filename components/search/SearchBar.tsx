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
        <div className="pointer-events-auto flex items-center justify-center gap-6 sm:gap-4 md:gap-8 mb-4 sm:mb-6 bg-transparent px-3 py-2 sm:px-6 sm:py-3 md:px-8 rounded-full flex-wrap">
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
              className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 group transition-colors ${
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
                    ? "h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32"
                    : "h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20"
                }`}
                width={f.id === "vender" ? 128 : 80}
                height={f.id === "vender" ? 128 : 80}
              />
              <span className="text-xs sm:text-sm md:text-base font-bold whitespace-nowrap">
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
