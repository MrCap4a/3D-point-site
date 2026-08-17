import type { ReactNode } from "react";

export const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] placeholder:text-[var(--color-text-3)]";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-[var(--color-text-3)]">{hint}</p>}
    </div>
  );
}
