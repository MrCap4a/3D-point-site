import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/auth/admin";
import { createSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth/session";
import { isRateLimited } from "@/lib/rate-limit";

/**
 * POST /api/admin/login — проверяет логин/пароль и выставляет httpOnly
 * cookie с подписанной сессией. Ответ не раскрывает, что именно неверно
 * (логин или пароль), чтобы не облегчать подбор.
 */
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(`admin-login:${ip}`)) {
    return NextResponse.json(
      { ok: false, message: "Слишком много попыток входа. Попробуйте позже." },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as { login?: string; password?: string } | null;

  if (!body?.login || !body?.password) {
    return NextResponse.json({ ok: false, message: "Введите логин и пароль." }, { status: 400 });
  }

  if (!verifyAdminCredentials(body.login, body.password)) {
    return NextResponse.json({ ok: false, message: "Неверный логин или пароль." }, { status: 401 });
  }

  const token = createSessionToken(body.login);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return response;
}
