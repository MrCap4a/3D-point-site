import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioCtaSection } from "@/components/portfolio/PortfolioCtaSection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Портфолио",
  description:
    "Реальные задачи по изготовлению и восстановлению пластиковых деталей, которые мы решили для частных клиентов и бизнеса.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Портфолио — 3Dpoint / 3Дточка",
    description:
      "Реальные задачи по изготовлению и восстановлению пластиковых деталей, которые мы решили для частных клиентов и бизнеса.",
    url: "/portfolio",
  },
};

// Страница читает опубликованные кейсы из БД; без ревалидации Next.js
// закэшировал бы её статически на момент сборки, и новые кейсы из админки
// не появлялись бы без передеплоя. 60 секунд достаточно для небольшого
// сайта и не создаёт заметной нагрузки на SQLite.
export const revalidate = 60;

export default async function PortfolioPage() {
  const cases = await prisma.portfolioCase.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" }, select: { id: true } } },
  });

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-16 sm:py-24">
        <Container>
          <SectionHeading
            label="Работы"
            title="Реальные задачи, которые мы решили"
            description={
              cases.length > 0
                ? "Ниже — примеры задач, которые мы уже решили для наших клиентов."
                : "Мы наполняем этот раздел реальными кейсами. Загляните позже, либо просто расскажите нам о своей задаче — вы можете стать одним из первых опубликованных кейсов."
            }
          />
        </Container>
      </section>

      {cases.length > 0 && (
        <section className="bg-[var(--color-bg)] py-16 sm:py-24">
          <Container>
            <PortfolioGrid items={cases} />
          </Container>
        </section>
      )}

      <PortfolioCtaSection />
    </>
  );
}
