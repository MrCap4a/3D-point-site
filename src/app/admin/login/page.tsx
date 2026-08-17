"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

/**
 * Публичная страница входа в админку. Логин/пароль проверяются только на
 * сервере (POST /api/admin/login) — секреты никогда не попадают во
 * frontend-код.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!data.ok) {
        setError(data.message ?? "Не удалось войти.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Не удалось выполнить запрос. Проверьте соединение.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-2)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-8"
      >
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Вход в админку</h1>
        <p className="mt-1 text-sm text-[var(--color-text-2)]">3Dpoint / 3Дточка</p>

        <div className="mt-6 grid gap-4">
          <div>
            <label htmlFor="login" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
              Логин
            </label>
            <input
              id="login"
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
        >
          {loading ? "Входим..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
