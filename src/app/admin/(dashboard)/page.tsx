import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [newLeadsCount, totalCasesCount] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.portfolioCase.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-text)]">Обзор</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-3)]">
            Новые заявки
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-text)]">{newLeadsCount}</p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-3)]">
            Кейсов в портфолио
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--color-text)]">{totalCasesCount}</p>
        </div>
      </div>
    </div>
  );
}
