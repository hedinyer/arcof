"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [modo, setModo] = useState<"login" | "registro">("login");
  
  // Estados para login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Estados para registro
  const [nombre, setNombre] = useState("");
  const [emailRegistro, setEmailRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (loginError) {
        throw loginError;
      }

      if (data.user) {
        setExito("¡Inicio de sesión exitoso!");
        setTimeout(() => {
          onClose();
          router.refresh();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setCargando(false);
    }
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    // Validaciones
    if (!nombre.trim()) {
      setError("El nombre es requerido");
      setCargando(false);
      return;
    }
    if (!emailRegistro.trim()) {
      setError("El correo electrónico es requerido");
      setCargando(false);
      return;
    }
    if (passwordRegistro.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setCargando(false);
      return;
    }
    if (passwordRegistro !== confirmarPassword) {
      setError("Las contraseñas no coinciden");
      setCargando(false);
      return;
    }

    try {
      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: emailRegistro.trim(),
        password: passwordRegistro,
        options: {
          data: {
            nombre_completo: nombre.trim(),
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("No se pudo crear el usuario");
      }

      // 2. Crear registro en la tabla usuarios
      const { error: usuarioError } = await supabase
        .from("usuarios")
        .insert({
          id: authData.user.id,
          email: emailRegistro.trim(),
          nombre_completo: nombre.trim(),
          telefono: telefono.trim() || null,
        });

      if (usuarioError) {
        // Si falla la inserción en usuarios pero el usuario ya existe en auth,
        // intentamos actualizar el registro existente
        if (usuarioError.code === "23505") {
          const { error: updateError } = await supabase
            .from("usuarios")
            .update({
              nombre_completo: nombre.trim(),
              telefono: telefono.trim() || null,
            })
            .eq("id", authData.user.id);

          if (updateError) {
            throw updateError;
          }
        } else {
          throw usuarioError;
        }
      }

      setExito("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => {
        setModo("login");
        setEmail(emailRegistro);
        setExito("");
        // Limpiar campos de registro
        setNombre("");
        setEmailRegistro("");
        setPasswordRegistro("");
        setConfirmarPassword("");
        setTelefono("");
      }, 2000);
    } catch (err: any) {
      console.error("Error en registro:", err);
      setError(
        err.message || "Error al crear la cuenta. Intenta nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Cerrar"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenido */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-2">
            {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {modo === "login"
              ? "Accede para publicar o gestionar tus inmuebles"
              : "Regístrate para comenzar a publicar tus inmuebles"}
          </p>
        </div>

        {modo === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="modal-email">Correo electrónico</Label>
              <Input
                id="modal-email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={cargando}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="modal-password">Contraseña</Label>
                <button
                  type="button"
                  className="text-sm text-[var(--accent)] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Aquí se podría implementar recuperación de contraseña
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Input
                id="modal-password"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={cargando}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={cargando}>
              {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <p className="text-center text-sm text-[var(--text-secondary)]">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="text-[var(--accent)] hover:underline"
                onClick={() => {
                  setModo("registro");
                  setError("");
                }}
              >
                Regístrate
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegistro} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="modal-nombre">Nombre completo</Label>
              <Input
                id="modal-nombre"
                type="text"
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                disabled={cargando}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="modal-email-registro">Correo electrónico</Label>
              <Input
                id="modal-email-registro"
                type="email"
                placeholder="juan@ejemplo.com"
                value={emailRegistro}
                onChange={(e) => setEmailRegistro(e.target.value)}
                required
                disabled={cargando}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="modal-telefono">Teléfono</Label>
              <Input
                id="modal-telefono"
                type="tel"
                placeholder="+57 300 123 4567"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={cargando}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="modal-password-registro">Contraseña</Label>
              <Input
                id="modal-password-registro"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={passwordRegistro}
                onChange={(e) => setPasswordRegistro(e.target.value)}
                required
                minLength={6}
                disabled={cargando}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="modal-confirmar-password">Confirmar contraseña</Label>
              <Input
                id="modal-confirmar-password"
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                required
                disabled={cargando}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            {exito && (
              <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
                {exito}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={cargando}>
              {cargando ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
            <p className="text-center text-sm text-[var(--text-secondary)]">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                className="text-[var(--accent)] hover:underline"
                onClick={() => {
                  setModo("login");
                  setError("");
                  setExito("");
                }}
              >
                Inicia sesión
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
