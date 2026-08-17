import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Direction = {
  href: string;
  title: string;
  description: string;
};

const DIRECTIONS: Direction[] = [
  {
    href: "/private",
    title: "Частным лицам",
    description:
      "Деталь сломалась, потерялась или её больше нигде не найти? Покажите, что нужно, — мы разберёмся с решением и доставим готовое изделие.",
  },
  {
    href: "/business",
    title: "Бизнесу",
    description:
      "Простой оборудования обходится дороже самой детали. Бизнес-заказы обрабатываем в приоритетном порядке, при необходимости выезжаем на объект.",
  },
  {
    href: "/serial",
    title: "Серийное производство",
    description:
      "Нужна не одна деталь, а стабильная партия к сроку? Согласовываем задачу и сроки — выделяем мощности и обеспечиваем выпуск партии.",
  },
];

export function Directions() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          label="Направления"
          title="Кому мы помогаем"
          description="Техническая основа услуг общая, но задача, обстоятельства и способ работы у каждой аудитории свои."
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {DIRECTIONS.map((direction) => (
            <div
              key={direction.href}
              className="border-t border-[var(--color-border)] pt-6"
            >
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                {direction.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-2)] sm:text-base">
                {direction.description}
              </p>
              <Link
                href={direction.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
              >
                Подробнее
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
