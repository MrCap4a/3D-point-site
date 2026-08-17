import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

const bodySchema = z.object({ isPublished: z.boolean() });

/** PATCH /api/admin/portfolio/:id/publish — опубликовать/скрыть кейс. */
export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/portfolio/[id]/publish">) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await ctx.params;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Некорректные данные." }, { status: 400 });
  }

  try {
    const updated = await prisma.portfolioCase.update({
      where: { id },
      data: { isPublished: parsed.data.isPublished },
    });
    return NextResponse.json({ ok: true, case: updated });
  } catch {
    return NextResponse.json({ ok: false, message: "Кейс не найден." }, { status: 404 });
  }
}
