import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/validation/portfolio";
import { prisma } from "@/lib/prisma";

/**
 * Превью портфолио на главной. Показывает до трёх реальных опубликованных
 * кейсов из БД (заполняются через админку). Если кейсов ещё нет, секция не
 * рендерится — на главной не должно быть пустых честных заглушек в трёх
 * разных местах сразу.
 */
export async function PortfolioPreview() {
  const cases = await prisma.portfolioCase.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    take: 3,
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });

  if (cases.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-2)] py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Работы" title="Примеры решённых задач" />
          <Button href="/portfolio" variant="secondary" size="md">
            Смотреть все работы
          </Button>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {cases.map((item) => (
            <div key={item.id}>
              {item.images[0] ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)]">
                  <Image
                    src={`/api/portfolio/images/${item.images[0].id}`}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderImage className="aspect-[4/3] w-full rounded-[var(--radius-md)]" />
              )}
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-3)]">
                {PORTFOLIO_CATEGORY_LABELS[item.category] ?? item.category}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-2)]">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
