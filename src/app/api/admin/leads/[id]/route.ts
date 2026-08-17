import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

/** GET /api/admin/leads/:id — детали одной заявки с файлами. */
export async function GET(_request: Request, ctx: RouteContext<"/api/admin/leads/[id]">) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await ctx.params;
  const lead = await prisma.lead.findUnique({ where: { id }, include: { files: true } });

  if (!lead) {
    return NextResponse.json({ ok: false, message: "Заявка не найдена." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead });
}
