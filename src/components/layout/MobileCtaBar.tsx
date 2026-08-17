"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getPrimaryCta } from "@/lib/nav";

/**
 * Закреплённая снизу CTA-панель только для мобильных экранов (на lg и выше
 * основной CTA уже всегда виден в шапке). Скрыта на /admin — админка не
 * должна показывать клиентский CTA.
 */
export function MobileCtaBar() {
  const pathname = usePathname() ?? "/";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const cta = getPrimaryCta(pathname);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 p-3 backdrop-blur-sm lg:hidden">
      <Button href={cta.href} size="md" className="w-full">
        {cta.label}
      </Button>
    </div>
  );
}
