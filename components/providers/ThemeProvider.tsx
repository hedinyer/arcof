"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setTheme } from "@/lib/slices/themeSlice";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((s) => s.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("arcof-theme") as "light" | "dark" | null;
    if (stored && (stored === "light" || stored === "dark")) {
      dispatch(setTheme(stored));
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("arcof-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
