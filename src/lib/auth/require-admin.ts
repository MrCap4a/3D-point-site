import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin";

/**
 * Общая проверка авторизации для всех /api/admin/* маршрутов. Возвращает
 * null, если сессия валидна, иначе — готовый 401-ответ.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "Требуется авторизация." }, { status: 401 });
  }
  return null;
}
