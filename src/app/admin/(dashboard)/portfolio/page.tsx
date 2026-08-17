import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PortfolioAdminList } from "@/components/admin/PortfolioAdminList";

export default async function AdminPortfolioPage() {
  const cases = await prisma.portfolioCase.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">Портфолио</h1>
        <Link
          href="/admin/portfolio/new"
          className="rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          Добавить кейс
        </Link>
      </div>

      <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
        <PortfolioAdminList initialCases={cases} />
      </div>
    </div>
  );
}
