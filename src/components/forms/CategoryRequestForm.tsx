import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RequestFormFields } from "@/components/forms/RequestFormFields";
import type { ClientType } from "@/components/forms/types";

type CategoryRequestFormProps = {
  clientType: ClientType;
  title: string;
  description: string;
};

/**
 * Форма заявки на отдельной коммерческой странице (/private, /business,
 * /serial). Категория определяется самой страницей и не требует от
 * пользователя дополнительного выбора — в отличие от формы-диспетчера
 * на главной.
 */
export function CategoryRequestForm({
  clientType,
  title,
  description,
}: CategoryRequestFormProps) {
  return (
    <section id="request-form" className="scroll-mt-20 bg-[var(--color-bg)] py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading align="center" label="Обратная связь" title={title} description={description} />
          <RequestFormFields clientType={clientType} />
        </div>
      </Container>
    </section>
  );
}
