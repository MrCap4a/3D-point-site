type PlaceholderImageProps = {
  className?: string;
};

/**
 * Нейтральная заглушка на месте реальной фотографии работы. Используется,
 * пока в портфолио нет настоящих фото конкретного кейса — она явно помечена
 * как временная и не должна выдаваться за реальный снимок (см. дизайн-
 * систему: приоритет только на настоящие фотографии выполненных работ).
 */
export function PlaceholderImage({ className = "" }: PlaceholderImageProps) {
  return (
    <div
      className={`flex items-center justify-center bg-[var(--color-bg-2)] ${className}`}
      role="img"
      aria-label="Фотография кейса будет добавлена"
    >
      <span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-text-3)]">
        Фото добавится
      </span>
    </div>
  );
}
