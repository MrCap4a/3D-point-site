"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { NAV_LINKS, getPrimaryCta } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const cta = getPrimaryCta(pathname ?? "/");

  // Закрываем мобильное меню при смене маршрута. Сброс состояния при смене
  // пропса выполняется прямо во время рендера (без setState в эффекте),
  // как рекомендует React, чтобы избежать лишнего каскадного ре-рендера.
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    if (menuOpen) {
      setMenuOpen(false);
    }
  }

  // Блокируем прокрутку фона, пока полноэкранное меню открыто.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <BrandLogo />

          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-hover)]"
                      : "text-[var(--color-text-2)] hover:bg-[var(--color-bg-2)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href={cta.href} size="md">
              {cta.label}
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text)] lg:hidden"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </Container>
    </header>

    {menuOpen && (
      <div
        id="mobile-menu"
        className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col bg-[var(--color-bg-deep)] px-6 py-10 sm:top-20 lg:hidden"
      >
        <nav className="flex flex-col gap-6" aria-label="Мобильная навигация">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-medium text-[var(--color-text-inverse)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          <Button href={cta.href} size="lg" className="w-full">
            {cta.label}
          </Button>
        </div>
      </div>
    )}
    </>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M5 5L17 17M17 5L5 17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M3 6H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 11H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 16H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
