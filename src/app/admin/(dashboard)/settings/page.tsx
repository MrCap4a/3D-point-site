import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const rows = await prisma.siteSetting.findMany();
  const values = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-text)]">Настройки</h1>
      <p className="mt-1 text-sm text-[var(--color-text-2)]">
        Эти данные используются в футере и других второстепенных местах сайта.
      </p>
      <div className="mt-6 max-w-xl rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
        <SettingsForm initialValues={values} />
      </div>
    </div>
  );
}
