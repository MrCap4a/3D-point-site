"use client";

import { useEffect } from "react";
import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { PortfolioCaseData } from "@/lib/portfolio";

type PortfolioModalProps = {
  item: PortfolioCaseData;
  onClose: () => void;
};

/**
 * Модальное раскрытие кейса: изображение + проблема/решение/результат.
 * Сознательно не превращает кейс в технический отчёт — только три коротких
 * смысловых блока, как согласовано в архитектуре портфолио.
 */
export function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]"
        onClick={(event) => event.stopPropagation()}
      >
        {item.images[0] ? (
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={`/api/portfolio/images/${item.images[0].id}`}
              alt={item.title}
              fill
              sizes="(min-width: 640px) 672px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <PlaceholderImage className="aspect-[16/9] w-full" />
        )}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-[var(--color-text)]">{item.title}</h3>
              {item.price && (
                <p className="mt-1 text-lg font-semibold text-[var(--color-accent)]">{item.price}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="rounded-[var(--radius-sm)] p-2 text-[var(--color-text-2)] hover:bg-[var(--color-bg-2)]"
            >
              ✕
            </button>
          </div>

          <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-text-2)]">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
