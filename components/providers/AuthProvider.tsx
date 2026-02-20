"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface Usuario {
  id: string;
  nombre_completo: string;
  email: string;
  telefono: string | null;
  avatar_url: string | null;
  activo: boolean;
}

interface AuthContextType {
  user: User | null;
  usuario: Usuario | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  usuario: null,
  loading: true,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el perfil del usuario desde la tabla usuarios
  const fetchUsuario = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error al obtener perfil:", error);
        return null;
      }

      return data as Usuario;
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      return null;
    }
  };

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUsuario(session.user.id).then(setUsuario);
      }
      setLoading(false);
    });

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const usuarioData = await fetchUsuario(session.user.id);
        setUsuario(usuarioData);
      } else {
        setUsuario(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ user, usuario, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
