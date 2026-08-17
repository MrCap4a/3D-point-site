import { randomUUID } from "node:crypto";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? "./uploads";
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 МБ

/**
 * Изображения портфолио — в отличие от файлов заявок — предназначены для
 * публичного показа на сайте, поэтому раздаются через отдельный публичный
 * роут (см. app/api/portfolio/images/[id]/route.ts), а не через админский
 * доступ с проверкой авторизации.
 */
export async function savePortfolioImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Неподдерживаемый формат изображения.");
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Изображение слишком большое (максимум 10 МБ).");
  }

  const dir = path.join(process.cwd(), UPLOADS_DIR, "portfolio");
  await mkdir(dir, { recursive: true });

  const ext = path.extname(file.name).slice(0, 10) || ".jpg";
  const safeName = `${randomUUID()}${ext}`;
  const fullPath = path.join(dir, safeName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(fullPath, buffer);

  return { filePath: path.join("portfolio", safeName) };
}

export function resolvePortfolioImagePath(filePath: string): string {
  // UPLOADS_DIR настраивается через переменную окружения и указывает на
  // каталог вне /src, поэтому это чтение не должно попадать в трассировку
  // серверного бандла (см. предупреждение Turbopack про Dynamic filesystem
  // access) — файлы читаются в рантайме, а не собираются со сборкой.
  return path.join(/* turbopackIgnore: true */ process.cwd(), UPLOADS_DIR, filePath);
}
