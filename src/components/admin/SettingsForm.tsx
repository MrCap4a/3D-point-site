"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { SITE_SETTING_KEYS, SITE_SETTING_LABELS } from "@/lib/site-settings";

export function SettingsForm({ initialValues }: { initialValues: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const base: Record<string, string> = {};
    SITE_SETTING_KEYS.forEach((key) => {
      base[key] = initialValues[key] ?? "";
    });
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setSaved(false);

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setSaving(false);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {SITE_SETTING_KEYS.map((key) => (
        <div key={key}>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            {SITE_SETTING_LABELS[key]}
          </label>
          <input
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
          />
        </div>
      ))}

      {saved && <p className="text-sm text-green-700">Настройки сохранены.</p>}

      <div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
        >
          {saving ? "Сохраняем..." : "Сохранить"}
        </button>
      </div>
    </form>
  );
}
