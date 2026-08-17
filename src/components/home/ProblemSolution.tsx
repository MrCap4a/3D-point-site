import { Container } from "@/components/ui/Container";

/**
 * Короткий блок сразу после hero, закрепляющий главный принцип бренда:
 * клиенту не нужно самому разбираться в изготовлении — достаточно показать
 * проблему.
 */
export function ProblemSolution() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-2)] py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <p className="text-2xl font-medium leading-snug tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
            Вы показываете проблему —
            <br />
            мы берём решение на себя и доводим его до результата.
          </p>
          <p className="text-base leading-relaxed text-[var(--color-text-2)] sm:text-lg">
            Не обязательно знать, как изготовить деталь, какая технология
            нужна, какой материал выбрать и нужна ли вообще 3D-модель. Пришлите
            фото, образец, чертёж или просто опишите задачу — мы сами
            разберёмся и предложим решение.
          </p>
        </div>
      </Container>
    </section>
  );
}
