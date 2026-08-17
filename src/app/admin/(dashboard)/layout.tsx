import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { AdminNav } from "@/components/admin/AdminNav";

/**
 * Layout защищённой части админки. Проверяет сессию на сервере при каждом
 * заходе — /admin/login остаётся вне этой route group и не защищается
 * (иначе получился бы цикл редиректов).
 */
export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-2)]">
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
