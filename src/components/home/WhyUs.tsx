import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const REASONS = [
  {
    title: "Берём задачу под ключ",
    description:
      "Сами разбираемся в проблеме, подбираем материал и способ изготовления — вам не нужно погружаться в технические детали.",
  },
  {
    title: "Работаем до результата",
    description:
      "Не считаем задачу закрытой после печати — важно, чтобы деталь решила вашу проблему.",
  },
  {
    title: "Не требуем готовую 3D-модель",
    description:
      "Достаточно фото, образца, чертежа или размеров. При необходимости воссоздадим геометрию сами.",
  },
  {
    title: "Доставка и выезд",
    description:
      "Готовое изделие можно получить доставкой. При необходимости выезжаем к клиенту, для бизнеса — на объект.",
  },
];

export function WhyUs() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          label="Почему обращаются к нам"
          title="Ответственный подход к каждой задаче"
        />

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div key={reason.title}>
              <h3 className="text-base font-semibold text-[var(--color-text)]">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-2)] sm:text-base">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
