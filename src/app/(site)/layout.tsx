import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";

/**
 * Layout публичной части сайта (все страницы, кроме /admin). Вынесен в
 * отдельную route group "(site)", чтобы админка не наследовала шапку,
 * футер и мобильную CTA-панель клиентского сайта. Это не root layout —
 * html/body уже определены в app/layout.tsx, поэтому типизируем children
 * напрямую, а не через LayoutProps (группа применяется сразу к нескольким
 * маршрутам, а не к одному конкретному сегменту).
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
