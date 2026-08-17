export const BRAND = {
  en: "3Dpoint",
  ru: "3Дточка",
} as const;

export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/private", label: "Частным лицам" },
  { href: "/business", label: "Бизнесу" },
  { href: "/serial", label: "Серийное производство" },
  { href: "/portfolio", label: "Портфолио" },
];

export type PrimaryCta = {
  label: string;
  href: string;
};

/**
 * Основной CTA сайта всегда ведёт к разговору о задаче, а не к звонку/покупке.
 * На странице серийного производства формулировка отличается ("Обсудить
 * производство"), на остальных — единая формулировка "Рассказать о задаче".
 * Якорь #request-form ведёт к форме заявки в конце текущей страницы; со
 * страницы портфолио (где своей формы нет) CTA ведёт на форму-диспетчер
 * на главной.
 */
export function getPrimaryCta(pathname: string): PrimaryCta {
  if (pathname.startsWith("/serial")) {
    return { label: "Обсудить производство", href: "/serial#request-form" };
  }

  if (pathname.startsWith("/portfolio")) {
    return { label: "Рассказать о задаче", href: "/#request-form" };
  }

  if (pathname.startsWith("/private")) {
    return { label: "Рассказать о задаче", href: "/private#request-form" };
  }

  if (pathname.startsWith("/business")) {
    return { label: "Рассказать о задаче", href: "/business#request-form" };
  }

  return { label: "Рассказать о задаче", href: "/#request-form" };
}
