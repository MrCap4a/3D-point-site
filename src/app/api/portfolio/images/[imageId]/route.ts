import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { resolvePortfolioImagePath } from "@/lib/portfolio-uploads";

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

/**
 * Публичная раздача изображений опубликованных кейсов портфолио. Файлы
 * заявок (uploads/leads) намеренно НЕ раздаются через публичный роут —
 * только изображения портфолио, которые по смыслу предназначены для показа
 * на сайте.
 */
export async function GET(_request: Request, ctx: RouteContext<"/api/portfolio/images/[imageId]">) {
  const { imageId } = await ctx.params;
  const image = await prisma.portfolioImage.findUnique({
    where: { id: imageId },
    include: { case: true },
  });

  if (!image || !image.case.isPublished) {
    return NextResponse.json({ ok: false, message: "Изображение не найдено." }, { status: 404 });
  }

  try {
    const buffer = await readFile(resolvePortfolioImagePath(image.filePath));
    const ext = path.extname(image.filePath).toLowerCase();
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": MIME_BY_EXT[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Файл не найден." }, { status: 404 });
  }
}
