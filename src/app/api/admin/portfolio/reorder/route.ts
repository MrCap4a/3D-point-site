import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

const bodySchema = z.object({ order: z.array(z.string()).min(1) });

/** PATCH /api/admin/portfolio/reorder — обновить порядок отображения кейсов. */
export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Некорректные данные." }, { status: 400 });
  }

  await prisma.$transaction(
    parsed.data.order.map((id, index) =>
      prisma.portfolioCase.update({ where: { id }, data: { sortOrder: index } })
    )
  );

  return NextResponse.json({ ok: true });
}
