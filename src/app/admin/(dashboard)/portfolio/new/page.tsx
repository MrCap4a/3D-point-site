import { PortfolioCaseForm } from "@/components/admin/PortfolioCaseForm";

export default function NewPortfolioCasePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-text)]">Новый кейс</h1>
      <p className="mt-1 text-sm text-[var(--color-text-2)]">
        После сохранения появится возможность прикрепить изображения.
      </p>
      <div className="mt-6 max-w-xl rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
        <PortfolioCaseForm />
      </div>
    </div>
  );
}
