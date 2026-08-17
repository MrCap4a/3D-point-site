"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/validation/portfolio";

type CaseItem = {
  id: string;
  title: string;
  category: string;
  isPublished: boolean;
};

export function PortfolioAdminList({ initialCases }: { initialCases: CaseItem[] }) {
  const router = useRouter();
  const [cases, setCases] = useState(initialCases);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function togglePublish(item: CaseItem) {
    setBusyId(item.id);
    await fetch(`/api/admin/portfolio/${item.id}/publish`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !item.isPublished }),
    });
    setCases((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, isPublished: !c.isPublished } : c))
    );
    setBusyId(null);
  }

  async function remove(item: CaseItem) {
    if (!confirm(`Удалить кейс «${item.title}»?`)) return;
    setBusyId(item.id);
    await fetch(`/api/admin/portfolio/${item.id}`, { method: "DELETE" });
    setCases((prev) => prev.filter((c) => c.id !== item.id));
    setBusyId(null);
    router.refresh();
  }

  async function move(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= cases.length) return;

    const reordered = [...cases];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setCases(reordered);

    await fetch("/api/admin/portfolio/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: reordered.map((c) => c.id) }),
    });
  }

  if (cases.length === 0) {
    return <p className="text-sm text-[var(--color-text-2)]">Кейсов пока нет.</p>;
  }

  return (
    <ul className="divide-y divide-[var(--color-border)]">
      {cases.map((item, index) => (
        <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div>
            <Link
              href={`/admin/portfolio/${item.id}`}
              className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)]"
            >
              {item.title}
            </Link>
            <p className="text-xs text-[var(--color-text-3)]">
              {PORTFOLIO_CATEGORY_LABELS[item.category] ?? item.category}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(index, -1)}
              disabled={index === 0}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-xs disabled:opacity-30"
              aria-label="Переместить выше"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === cases.length - 1}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-xs disabled:opacity-30"
              aria-label="Переместить ниже"
            >
              ↓
            </button>
            <button
              type="button"
              disabled={busyId === item.id}
              onClick={() => togglePublish(item)}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium"
            >
              {item.isPublished ? "Опубликован" : "Скрыт"}
            </button>
            <button
              type="button"
              disabled={busyId === item.id}
              onClick={() => remove(item)}
              className="rounded-[var(--radius-sm)] border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600"
            >
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
