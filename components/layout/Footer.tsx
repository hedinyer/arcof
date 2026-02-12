"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] text-[var(--text-primary)] pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto sm:px-12 mt-0 mb-16 px-6">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#722F37] text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] p-6 sm:p-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,0.06),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,255,255,0.05),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
          </div>

          <div className="relative">
            <h2 className="text-[16vw] sm:text-[12vw] lg:text-[9vw] leading-[0.9] font-semibold tracking-tighter">
              <span className="block">¿Listo para encontrar</span>
              <span className="block text-white/60">tu propiedad ideal?</span>
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Contacto Principal */}
              <div>
                <p className="text-sm text-white/60">Contacto</p>
                <div className="mt-2 space-y-3">
                  <a
                    href="tel:+576076808811"
                    className="inline-flex items-center gap-3 text-lg sm:text-xl font-medium tracking-tight text-white hover:text-white/80 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 flex-shrink-0"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>PBX: (607) 6808811</span>
                  </a>
                  <a
                    href="https://wa.me/573178001592"
                    className="inline-flex items-center gap-3 text-lg sm:text-xl font-medium tracking-tight text-white hover:text-white/80 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 flex-shrink-0"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>3178001592</span>
                  </a>
                  <a
                    href="mailto:arcofinmobiliaria@gmail.com"
                    className="inline-flex items-center gap-3 text-lg sm:text-xl font-medium tracking-tight text-white hover:text-white/80 transition-colors break-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 flex-shrink-0"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span>arcofinmobiliaria@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Dirección */}
              <div>
                <p className="text-sm text-white/60">Ubicación</p>
                <div className="mt-2">
                  <div className="inline-flex items-start gap-3 text-sm font-medium tracking-tight text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="break-words">
                      Calle 36 No 31-39 Oficina 304. Centro Empresarial Chicamocha, Mejoras Publicas - Bucaramanga.
                    </span>
                  </div>
                </div>
              </div>

              {/* Teléfonos y Horarios */}
              <div>
                <p className="text-sm text-white/60">Teléfonos</p>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Administrativo</p>
                    <a
                      href="tel:+573178889995"
                      className="inline-flex items-center gap-2 text-base font-medium tracking-tight text-white hover:text-white/80 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>3178889995</span>
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Comerciales</p>
                    <div className="space-y-1">
                      <a
                        href="tel:+573160181690"
                        className="flex items-center gap-2 text-base font-medium tracking-tight text-white hover:text-white/80 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>3160181690</span>
                      </a>
                      <a
                        href="tel:+573160181684"
                        className="flex items-center gap-2 text-base font-medium tracking-tight text-white hover:text-white/80 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>3160181684</span>
                      </a>
                      <a
                        href="tel:+573178811400"
                        className="flex items-center gap-2 text-base font-medium tracking-tight text-white hover:text-white/80 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>3178811400</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horarios y Redes Sociales */}
              <div>
                <p className="text-sm text-white/60">Horarios de Atención</p>
                <div className="mt-2 mb-4">
                  <p className="text-sm text-white/80">
                    Lunes a Viernes: 7:30 am - 12:00 pm y 1:30 pm – 5:30 pm
                    <br />
                    Sábado 8:00 am – 12:30 pm
                  </p>
                </div>
                <p className="text-sm text-white/60 mb-2">Síguenos</p>
                <div className="flex flex-wrap gap-3 items-center">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 border border-white/10 hover:bg-white/90 transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 border border-white/10 hover:bg-white/90 transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 border border-white/10 hover:bg-white/90 transition-colors duration-200"
                    aria-label="TikTok"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10"></div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Emails Administrativos - Columna 1 */}
              <div>
                <p className="text-sm text-white/60 mb-2">Administrativos</p>
                <div className="space-y-1.5 text-sm">
                  <a
                    href="mailto:admonarcofinmobiliaria1@gmail.com"
                    className="flex items-center gap-2 font-medium tracking-tight hover:underline text-white/90 break-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 flex-shrink-0"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span className="text-xs">admonarcofinmobiliaria1@gmail.com</span>
                  </a>
                  <a
                    href="mailto:admonarcofinmobiliaria2@gmail.com"
                    className="flex items-center gap-2 font-medium tracking-tight hover:underline text-white/90 break-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 flex-shrink-0"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span className="text-xs">admonarcofinmobiliaria2@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Emails Comerciales - Columna 2 */}
              <div>
                <p className="text-sm text-white/60 mb-2">Comerciales</p>
                <div className="space-y-1.5 text-sm">
                  <a
                    href="mailto:arcofinmobiliariacomercial@gmail.com"
                    className="flex items-center gap-2 font-medium tracking-tight hover:underline text-white/90 break-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 flex-shrink-0"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span className="text-xs">arcofinmobiliariacomercial@gmail.com</span>
                  </a>
                  <a
                    href="mailto:comercialarcof1@gmail.com"
                    className="flex items-center gap-2 font-medium tracking-tight hover:underline text-white/90 break-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 flex-shrink-0"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span className="text-xs">comercialarcof1@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* M.A 057 */}
              <div>
                <p className="text-sm text-white/60 mb-2">Matrícula</p>
                <p className="text-xs text-white/60">M.A 057</p>
              </div>

              {/* Legal */}
              <div>
                <p className="text-sm text-white/60 mb-2">Información Legal</p>
                <div className="space-y-1.5 text-sm">
                  <a
                    href="#"
                    className="block font-medium tracking-tight hover:underline text-white/90 text-xs"
                  >
                    Términos y Condiciones
                  </a>
                  <a
                    href="#"
                    className="block font-medium tracking-tight hover:underline text-white/90 text-xs"
                  >
                    Política de Privacidad
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-white/70">
              © {currentYear} ARCOF Inmobiliaria — Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
