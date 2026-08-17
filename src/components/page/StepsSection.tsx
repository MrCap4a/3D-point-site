import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type Step = {
  number: string;
  title: string;
  description: string;
};

type StepsSectionProps = {
  label: string;
  title: string;
  description?: string;
  steps: Step[];
  background?: "default" | "muted";
};

/**
 * Универсальная секция шагов ("как проходит работа") с крупными номерами и
 * тонкой линией сверху вместо кружков — переиспользуется на главной и на
 * коммерческих страницах, где последовательность шагов отличается под
 * конкретную аудиторию.
 */
export function StepsSection({
  label,
  title,
  description,
  steps,
  background = "muted",
}: StepsSectionProps) {
  const bgClass = background === "muted" ? "bg-[var(--color-bg-2)]" : "bg-[var(--color-bg)]";
  const columns = steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className={`border-b border-[var(--color-border)] py-16 sm:py-24 ${bgClass}`}>
      <Container>
        <SectionHeading label={label} title={title} description={description} />

        <div className={`mt-14 grid gap-10 sm:grid-cols-2 ${columns}`}>
          {steps.map((step) => (
            <div key={step.number} className="border-t border-[var(--color-border)] pt-6">
              <span className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-3)]">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-[var(--color-text)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-2)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
