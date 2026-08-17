"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/validation/portfolio";

type ImageItem = { id: string; filePath: string };

type Props = {
  caseId?: string;
  initial?: {
    title: string;
    category: string;
    problemText: string;
    solutionText: string;
    resultText: string;
  };
  initialImages?: ImageItem[];
};

const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]";

export function PortfolioCaseForm({ caseId, initial, initialImages = [] }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(
    initial ?? {
      title: "",
      category: "RESTORATION",
      problemText: "",
      solutionText: "",
      resultText: "",
    }
  );
  const [images, setImages] = useState(initialImages);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const url = caseId ? `/api/admin/portfolio/${caseId}` : "/api/admin/portfolio";
    const method = caseId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await response.json()) as { ok: boolean; message?: string; case?: { id: string } };

    if (!data.ok) {
      setError(data.message ?? "Не удалось сохранить кейс.");
      setSaving(false);
      return;
    }

    setSaving(false);
    if (!caseId && data.case) {
      router.push(`/admin/portfolio/${data.case.id}`);
    } else {
      router.refresh();
    }
  }

  async function handleUploadImage(file: File) {
    if (!caseId) return;
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch(`/api/admin/portfolio/${caseId}/images`, {
      method: "POST",
      body: formData,
    });
    const data = (await response.json()) as { ok: boolean; image?: ImageItem; message?: string };
    if (data.ok && data.image) {
      setImages((prev) => [...prev, data.image!]);
    } else {
      setError(data.message ?? "Не удалось загрузить изображение.");
    }
  }

  async function handleDeleteImage(imageId: string) {
    if (!caseId) return;
    await fetch(`/api/admin/portfolio/${caseId}/images/${imageId}`, { method: "DELETE" });
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">Название</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClasses}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">Категория</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={inputClasses}
        >
          {Object.entries(PORTFOLIO_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
          Проблема клиента
        </label>
        <textarea
          required
          rows={3}
          value={form.problemText}
          onChange={(e) => setForm({ ...form, problemText: e.target.value })}
          className={inputClasses}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">Решение</label>
        <textarea
          required
          rows={3}
          value={form.solutionText}
          onChange={(e) => setForm({ ...form, solutionText: e.target.value })}
          className={inputClasses}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">Результат</label>
        <textarea
          required
          rows={3}
          value={form.resultText}
          onChange={(e) => setForm({ ...form, resultText: e.target.value })}
          className={inputClasses}
        />
      </div>

      {caseId && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            Изображения
          </label>
          <div className="flex flex-wrap gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/portfolio/images/${img.id}`}
                  alt=""
                  className="h-20 w-20 rounded-[var(--radius-sm)] object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white"
                  aria-label="Удалить изображение"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="mt-3 text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUploadImage(file);
              e.target.value = "";
            }}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

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


