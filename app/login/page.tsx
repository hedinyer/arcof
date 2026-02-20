import Link from "next/link";
import Image from "next/image";
import { HeroHeader } from "@/components/hero/HeroHeader";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <>
      <HeroHeader />
      <div className="grid min-h-svh pt-20 lg:grid-cols-2 lg:pt-0">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-[var(--text-primary)]"
            >
              <Image
                src="/arcof-logo.png"
                alt="ARCOF INMOBILIARIA"
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              ARCOF Inmobiliaria
            </Link>
          </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                Iniciar sesión
              </h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Accede para publicar o gestionar tus inmuebles
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-[var(--background-elevated)] lg:block overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/1476390_People_Lifestyle_3840x2160.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
    </>
  );
}
