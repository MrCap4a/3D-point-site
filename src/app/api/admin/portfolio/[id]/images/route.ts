import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { savePortfolioImage } from "@/lib/portfolio-uploads";

/** POST /api/admin/portfolio/:id/images — загрузить изображение к кейсу. */
export async function POST(request: Request, ctx: RouteContext<"/api/admin/portfolio/[id]/images">) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await ctx.params;
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, message: "Файл не передан." }, { status: 400 });
  }

  try {
    const saved = await savePortfolioImage(file);
    const maxOrder = await prisma.portfolioImage.aggregate({
      where: { caseId: id },
      _max: { sortOrder: true },
    });

    const image = await prisma.portfolioImage.create({
      data: {
        caseId: id,
        filePath: saved.filePath,
        sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
      },
    });

    return NextResponse.json({ ok: true, image });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось загрузить изображение.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
