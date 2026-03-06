import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const MAX_LIMIT = 500;

/** Resuelve path de Storage a URL pública. Si ya es URL completa, la devuelve tal cual. */
function resolvePhotoUrl(urlOrPath: string): string {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const path = urlOrPath.startsWith("casas/") ? urlOrPath : `casas/${urlOrPath}`;
  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}

/** Normaliza fotos (JSONB) a array de objetos con url completa. Soporta string o array. */
function normalizeFotos(fotos: unknown): { url: string; orden: number }[] {
  if (!fotos) return [];
  let arr: { url?: string; orden?: number }[];
  if (typeof fotos === "string") {
    try {
      arr = JSON.parse(fotos) ?? [];
    } catch {
      return [];
    }
  } else if (Array.isArray(fotos)) {
    arr = fotos;
  } else {
    return [];
  }
  const sorted = [...arr].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  return sorted
    .map((f) => {
      const url = typeof f === "object" && f && "url" in f ? String(f.url ?? "") : "";
      return { url: resolvePhotoUrl(url), orden: Number(f?.orden ?? 0) };
    })
    .filter((f) => f.url);
}

/**
 * GET /api/webhook/inmuebles
 * Webhook para Kapso (u otros) que devuelve inmuebles publicados desde Supabase.
 *
 * Query params (opcionales):
 * - ciudad: bucaramanga | giron | piedecuesta
 * - tipo_oferta: venta | arriendo
 * - tipo_inmueble: apartamento | casa | oficina | local | bodega | lote | finca
 * - limit: número (default 50, max 500)
 *
 * Headers opcionales:
 * - Authorization: Bearer <WEBHOOK_SECRET> — si WEBHOOK_SECRET está definido en .env
 */
export async function GET(request: NextRequest) {
  try {
    const secret = process.env.WEBHOOK_SECRET;
    if (secret) {
      const auth = request.headers.get("authorization");
      const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
      if (token !== secret) {
        return NextResponse.json(
          { error: "Unauthorized", message: "Invalid or missing webhook secret" },
          { status: 401 }
        );
      }
    }

    const { searchParams } = new URL(request.url);
    const ciudad = searchParams.get("ciudad") ?? undefined;
    const tipoOferta = searchParams.get("tipo_oferta") ?? undefined;
    const tipoInmueble = searchParams.get("tipo_inmueble") ?? undefined;
    const limitParam = searchParams.get("limit");
    const limit = Math.min(
      Math.max(1, parseInt(limitParam ?? "50", 10) || 50),
      MAX_LIMIT
    );

    let query = supabase
      .from("inmuebles")
      .select("*")
      .eq("estado", "publicado")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (ciudad) query = query.eq("ciudad", ciudad);
    if (tipoOferta) query = query.eq("tipo_oferta", tipoOferta);
    if (tipoInmueble) query = query.eq("tipo_inmueble", tipoInmueble);

    const { data, error } = await query;

    if (error) {
      console.error("[webhook/inmuebles] Supabase error:", error);
      return NextResponse.json(
        { error: "Database error", message: error.message },
        { status: 500 }
      );
    }

    const raw = (data ?? []) as Record<string, unknown>[];
    const dataWithMedia = raw.map((row) => {
      const fotosNorm = normalizeFotos(row.fotos);
      return {
        ...row,
        fotos: fotosNorm,
        imagenes: fotosNorm.map((f) => f.url),
        video_url: row.video_url ?? null,
      };
    });

    return NextResponse.json({
      data: dataWithMedia,
      count: dataWithMedia.length,
    });
  } catch (err) {
    console.error("[webhook/inmuebles] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal error", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
