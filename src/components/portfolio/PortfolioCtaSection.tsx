import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * У портфолио нет собственной формы заявки (см. архитектуру сайта) — вместо
 * этого финальный блок предлагает перейти на нужную коммерческую страницу,
 * где уже есть контекстная форма.
 */
export function PortfolioCtaSection() {
  return (
    <section className="bg-[var(--color-bg-2)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          label="У вас похожая задача?"
          title="Расскажите нам о своей проблеме"
          description="Выберите раздел, который ближе к вашей ситуации, — там можно оставить короткую заявку."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/private#request-form" variant="secondary" size="md">
            Частным лицам
          </Button>
          <Button href="/business#request-form" variant="secondary" size="md">
            Бизнесу
          </Button>
          <Button href="/serial#request-form" variant="secondary" size="md">
            Серийное производство
          </Button>
        </div>
      </Container>
    </section>
  );
}
