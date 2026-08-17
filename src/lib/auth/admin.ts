import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * Единственная админ-учётка настраивается через переменные окружения
 * (ADMIN_LOGIN + ADMIN_PASSWORD_HASH). Хэш пароля никогда не хранится и не
 * проверяется на клиенте — только здесь, на сервере.
 */
export function verifyAdminCredentials(login: string, password: string): boolean {
  const expectedLogin = process.env.ADMIN_LOGIN;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedLogin || !expectedHash) return false;
  if (login !== expectedLogin) return false;

  return bcrypt.compareSync(password, expectedHash);
}

export async function getAdminSession(): Promise<{ login: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
