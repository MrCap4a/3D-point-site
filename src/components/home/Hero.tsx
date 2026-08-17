import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-accent-soft)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-accent-hover)]">
            3Dpoint · 3Дточка
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Изготовление и восстановление
            <br />
            пластиковых деталей — <span className="text-[var(--color-accent)]">под ключ</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-2)]">
            Покажите, что сломалось или что нужно изготовить, — мы возьмём
            решение на себя и доведём его до результата. Не нужно заранее
            разбираться в материалах, технологиях или 3D-моделировании.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="#request-form" size="lg">
              Рассказать о задаче
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg">
              Смотреть примеры работ
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
