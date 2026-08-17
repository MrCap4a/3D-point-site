import Link from "next/link";
import { BRAND } from "@/lib/nav";

type BrandLogoProps = {
  inverse?: boolean;
  className?: string;
};

/**
 * Дуэт-логотип бренда: "3Dpoint" и "3Дточка" воспринимаются как равнозначные
 * части названия, а не как основное название + маленький серый перевод.
 */
export function BrandLogo({ inverse = false, className = "" }: BrandLogoProps) {
  const textColor = inverse ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text)]";
  const dividerColor = inverse ? "text-[var(--color-accent)]" : "text-[var(--color-accent)]";

  return (
    <Link
      href="/"
      className={`flex items-baseline gap-2 text-base font-semibold tracking-[-0.01em] ${textColor} ${className}`}
      aria-label="3Dpoint / 3Дточка — на главную"
    >
      <span>{BRAND.en}</span>
      <span className={dividerColor} aria-hidden="true">
        /
      </span>
      <span>{BRAND.ru}</span>
    </Link>
  );
}
