import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Единый контейнер контента с максимальной шириной 1280px, согласно
 * дизайн-системе (много свободного пространства вместо плотного 900px
 * контейнера старого лендинга).
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
