import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 часов

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/**
 * Простая подписанная сессия без внешних JWT-библиотек: payload (логин +
 * срок действия) в base64url + HMAC-подпись тем же секретом. Секрет и
 * проверка живут только на сервере — не в клиентском коде.
 */
export function createSessionToken(login: string): string {
  const payload = JSON.stringify({ login, exp: Date.now() + SESSION_TTL_MS });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): { login: string } | null {
  if (!token) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8")) as {
      login: string;
      exp: number;
    };
    if (payload.exp < Date.now()) return null;
    return { login: payload.login };
  } catch {
    return null;
  }
}
