"use client";

import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/validation/portfolio";
import type { PortfolioCaseData } from "@/lib/portfolio";

type PortfolioCardProps = {
  item: PortfolioCaseData;
  onOpen: (item: PortfolioCaseData) => void;
};

/**
 * Карточка кейса в сетке портфолио. По клику открывает модалку с полным
 * описанием (проблема/решение/результат) — сама сетка и модалка вынесены в
 * отдельный клиентский компонент PortfolioGrid, чтобы страница оставалась
 * серверным компонентом. Показывает реальное фото первого изображения
 * кейса, если оно загружено через админку, иначе — честную заглушку.
 */
export function PortfolioCard({ item, onOpen }: PortfolioCardProps) {
  const coverImage = item.images[0];

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group text-left"
      aria-haspopup="dialog"
    >
      {coverImage ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)]">
          <Image
            src={`/api/portfolio/images/${coverImage.id}`}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-opacity group-hover:opacity-90"
          />
        </div>
      ) : (
        <PlaceholderImage className="aspect-[4/3] w-full rounded-[var(--radius-md)] transition-opacity group-hover:opacity-90" />
      )}
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-3)]">
        {PORTFOLIO_CATEGORY_LABELS[item.category] ?? item.category}
      </p>
      <p className="mt-1 text-sm font-medium text-[var(--color-text)]">{item.title}</p>
    </button>
  );
}
