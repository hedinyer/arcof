"use client";

export function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
              Contacto
            </h4>
            <div className="space-y-4">
              <a
                className="flex items-center gap-3 hover:text-white transition-colors group"
                href="mailto:info@arcof.ai"
              >
                <span className="material-symbols-outlined text-[var(--accent)] text-xl">
                  mail
                </span>
                <span>info@arcof.ai</span>
              </a>
              <a
                className="flex items-center gap-3 hover:text-white transition-colors"
                href="tel:+573001234567"
              >
                <span className="material-symbols-outlined text-[var(--accent)] text-xl">
                  call
                </span>
                <span>+57 300 123 4567</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
              Soluciones
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Automatización
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Análisis de datos
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  NLP
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
              Empresa
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Carreras
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacidad
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Términos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all text-white duration-300"
              href="#"
            >
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-gray-500">
            <p>© 2025 ARCOF AI. All rights reserved.</p>
            <span className="hidden md:block text-gray-700">•</span>
            <div className="flex gap-4">
              <a className="hover:text-white transition-colors" href="#">
                Privacidad
              </a>
              <a className="hover:text-white transition-colors" href="#">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
