/** Placeholder values that often end up in .env from tutorials */
const PLACEHOLDER_KEYS = new Set(
  [
    "your-anon-key",
    "your_anon_key",
    "your-service-role-key",
    "supabaseanonkey",
  ].map((s) => s.toLowerCase())
);

/**
 * Throws before createClient if the key is obviously wrong (avoids cryptic API errors).
 */
export function assertValidSupabasePublicKey(key: string): void {
  const t = key.trim();
  if (PLACEHOLDER_KEYS.has(t.toLowerCase())) {
    throw new Error(
      "La clave pública de Supabase sigue siendo texto de ejemplo. En Project Settings → API copia la clave publishable o anon y pégala en .env.local; luego reinicia el servidor."
    );
  }
  const isPublishableV2 = t.startsWith("sb_publishable_") && t.length >= 30;
  const isJwtAnon = t.startsWith("eyJ") && t.length >= 80;
  if (!isPublishableV2 && !isJwtAnon) {
    throw new Error(
      "La clave pública de Supabase parece incompleta o incorrecta. Usa la clave «publishable» (sb_publishable_…) o «anon» (JWT eyJ…) desde Project Settings → API y reinicia el servidor."
    );
  }
}

/**
 * User-facing copy when PostgREST/auth returns generic English messages.
 */
export function humanizeSupabaseFetchError(message: string): string {
  if (/invalid api key/i.test(message)) {
    return "clave de API inválida: en .env.local usa la clave pública del proyecto (anon / publishable) de Supabase → Settings → API, no la service_role ni un texto de ejemplo. Guarda y reinicia `npm run dev`.";
  }
  return message;
}
