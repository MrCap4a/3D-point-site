import Link from "next/link";
import { prisma } from "@/lib/prisma";

const CATEGORY_LABELS: Record<string, string> = {
  PRIVATE: "Частный клиент",
  BUSINESS: "Бизнес",
  SERIAL: "Серийное производство",
};

const STATUS_LABELS: Record<string, string> = {
  NEW: "Новая",
  IN_PROGRESS: "В работе",
  DONE: "Завершена",
  ARCHIVED: "Архив",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-text)]">Заявки</h1>

      <div className="mt-6 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--color-border)] text-xs uppercase tracking-[0.05em] text-[var(--color-text-3)]">
            <tr>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Категория</th>
              <th className="px-4 py-3">Имя</th>
              <th className="px-4 py-3">Контакт</th>
              <th className="px-4 py-3">Статус</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-4 py-3 text-[var(--color-text-2)]">
                  {lead.createdAt.toLocaleString("ru-RU")}
                </td>
                <td className="px-4 py-3">{CATEGORY_LABELS[lead.category] ?? lead.category}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="text-[var(--color-accent)] hover:underline">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--color-text-2)]">{lead.contactValue}</td>
                <td className="px-4 py-3">{STATUS_LABELS[lead.status] ?? lead.status}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[var(--color-text-3)]">
                  Заявок пока нет.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
