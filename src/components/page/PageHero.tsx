import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type PageHeroProps = {
  tag: string;
  title: ReactNode;
  description: string;
  ctaLabel: string;
};

/**
 * Единый hero-блок для коммерческих страниц (/private, /business, /serial).
 * Меньше по высоте, чем hero главной страницы, — здесь пользователь уже
 * выбрал раздел и не нуждается во вторичном CTA "смотреть портфолио".
 */
export function PageHero({ tag, title, description, ctaLabel }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-accent-soft)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-accent-hover)]">
            {tag}
          </p>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-2)]">
            {description}
          </p>
          <div className="mt-9">
            <Button href="#request-form" size="lg">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
