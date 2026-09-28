const SESSION_KEY = "blog_admin_authed";

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isAdminConfigured(): boolean {
  return Boolean(import.meta.env.VITE_ADMIN_PASSWORD_HASH);
}

export async function verifyAdminPassword(input: string): Promise<boolean> {
  const expectedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH as
    | string
    | undefined;
  if (!expectedHash) return false;
  const inputHash = await sha256Hex(input);
  return inputHash === expectedHash;
}

export function isAdminSessionActive(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function setAdminSessionActive(): void {
  sessionStorage.setItem(SESSION_KEY, "true");
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
