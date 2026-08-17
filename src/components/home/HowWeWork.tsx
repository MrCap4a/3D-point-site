import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Вы рассказываете о задаче",
    description:
      "Кратко опишите проблему, оставьте имя и удобный способ связи. При желании приложите фото, образец, чертёж или модель — но это не обязательно.",
  },
  {
    number: "02",
    title: "Мы изучаем обращение и связываемся",
    description:
      "Мы сами выходим на связь в удобное время и уточняем детали задачи — без необходимости заранее готовить техническое задание.",
  },
  {
    number: "03",
    title: "Согласовываем решение",
    description:
      "Обсуждаем задачу, сроки и стоимость до начала работы. Материал, технологию и параметры изготовления подбираем сами.",
  },
  {
    number: "04",
    title: "Работаем до результата",
    description:
      "Изготавливаем деталь, доставляем её или, при необходимости, выезжаем к вам — и доводим задачу до результата.",
  },
];

export function HowWeWork() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-2)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          label="Как это работает"
          title="От первого сообщения до готового решения"
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="border-t border-[var(--color-border)] pt-6">
              <span className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-3)]">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-[var(--color-text)]">
                {step.title}
              </h3>
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
