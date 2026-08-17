import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

const statusSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "DONE", "ARCHIVED"]),
});

/** PATCH /api/admin/leads/:id/status — смена статуса заявки. */
export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/admin/leads/[id]/status">
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  const parsed = statusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Некорректный статус." }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ ok: true, lead });
  } catch {
    return NextResponse.json({ ok: false, message: "Заявка не найдена." }, { status: 404 });
  }
}
