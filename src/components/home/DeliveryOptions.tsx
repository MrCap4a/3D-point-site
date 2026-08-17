import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const OPTIONS = [
  {
    title: "Дистанционно",
    description: "Обсуждаем задачу удалённо — по фото, описанию, чертежу или готовой 3D-модели.",
  },
  {
    title: "Образец у вас на руках",
    description: "Можно передать физический образец — сломанную деталь или то, с чего нужно снять геометрию.",
  },
  {
    title: "Выезд",
    description: "При необходимости выезжаем к клиенту, для бизнеса — на объект с оборудованием.",
  },
  {
    title: "Доставка результата",
    description: "Готовое изделие отправляем доставкой — приезжать к нам необязательно.",
  },
];

export function DeliveryOptions() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          label="Формат работы"
          title="Не обязательно приезжать к нам"
          description="Работаем так, как удобно вам — дистанционно, с выездом или через доставку готового изделия."
        />

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map((option) => (
            <div key={option.title} className="border-t border-[var(--color-border)] pt-6">
              <h3 className="text-base font-semibold text-[var(--color-text)]">{option.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-2)]">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
