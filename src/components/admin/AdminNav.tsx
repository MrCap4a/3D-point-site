"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/leads", label: "Заявки" },
  { href: "/admin/portfolio", label: "Портфолио" },
  { href: "/admin/settings", label: "Настройки" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <nav className="flex gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${
                pathname === link.href
                  ? "font-medium text-[var(--color-text)]"
                  : "text-[var(--color-text-2)] hover:text-[var(--color-text)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-[var(--color-text-2)] hover:text-[var(--color-text)]"
        >
          Выйти
        </button>
      </div>
    </header>
  );
}
