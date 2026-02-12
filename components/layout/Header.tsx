"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchBarScroll } from "@/components/search/SearchBarContext";
import { SearchBarPill } from "@/components/search/SearchBarPill";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { showInHeader } = useSearchBarScroll();

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Propiedades", href: "/propiedades" },
    { label: "Clientes", href: "/clientes" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--background)]/95 backdrop-blur-sm px-6 py-4 md:px-12 flex justify-between items-center gap-4 border-b border-white/5">
      <div className="flex items-center gap-2 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arcof-logo.png"
          alt="ARCOF INMOBILIARIA"
          width={183}
          height={48}
          className="h-12 w-auto object-contain block"
          style={{ background: "transparent" }}
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <AnimatePresence>
        {showInHeader && (
          <motion.div
            key="header-search"
            className="flex-1 flex justify-center min-w-0 max-w-none mx-auto px-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <SearchBarPill compact />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center p-2 rounded-full border border-[var(--text-secondary)]/30 bg-[var(--background-surface)] hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-[var(--text-secondary)]">menu</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[180px]">
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="cursor-pointer">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
