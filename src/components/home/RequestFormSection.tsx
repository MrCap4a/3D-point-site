"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RequestFormFields } from "@/components/forms/RequestFormFields";
import type { ClientType } from "@/components/forms/types";

const CLIENT_TYPES: { value: ClientType; label: string }[] = [
  { value: "PRIVATE", label: "Частное лицо" },
  { value: "BUSINESS", label: "Бизнес" },
  { value: "SERIAL", label: "Серийное производство" },
];

/**
 * Форма-диспетчер на главной. Пользователь сначала выбирает свой тип, после
 * чего показываются поля, соответствующие нужной категории (PRIVATE /
 * BUSINESS / SERIAL) — тот же набор, что и на отдельных коммерческих
 * страницах. Реальная отправка на backend (валидация, сохранение в БД,
 * защита от спама) подключается на этапах "Backend" и "База данных" —
 * сейчас это готовый визуальный и структурный каркас формы.
 */
export function RequestFormSection() {
  const [clientType, setClientType] = useState<ClientType | null>(null);

  return (
    <section id="request-form" className="scroll-mt-20 bg-[var(--color-bg)] py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            align="center"
            label="Обратная связь"
            title="Расскажите о своей задаче"
            description="Нужно только кратко описать проблему и оставить контакт — мы сами свяжемся с вами, чтобы обсудить детали."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {CLIENT_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setClientType(type.value)}
                aria-pressed={clientType === type.value}
                className={`rounded-[var(--radius-sm)] border px-4 py-2.5 text-sm font-medium transition-colors ${
                  clientType === type.value
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                    : "border-[var(--color-border)] text-[var(--color-text-2)] hover:border-[var(--color-text-3)]"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {clientType && <RequestFormFields clientType={clientType} />}
        </div>
      </Container>
    </section>
  );
}
