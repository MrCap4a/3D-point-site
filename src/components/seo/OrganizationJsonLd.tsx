const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3-dpoint.ru";

/**
 * Структурированные данные Organization для поисковиков. Намеренно не
 * включают телефон, адрес или соцсети — эти данные ещё не подтверждены для
 * нового сайта (см. раздел "Настройки" в админке, где они будут заданы
 * администратором). Добавлять их сюда заранее означало бы выдумывать
 * коммерческие контактные данные, чего нельзя делать без подтверждения.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "3Dpoint / 3Дточка",
    url: siteUrl,
    description:
      "Изготовление и восстановление пластиковых деталей под ключ методом FDM 3D-печати.",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
