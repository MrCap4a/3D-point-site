import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { portfolioCaseSchema } from "@/lib/validation/portfolio";

/** GET /api/admin/portfolio — все кейсы, включая скрытые, по порядку. */
export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const cases = await prisma.portfolioCase.findMany({
    orderBy: { sortOrder: "asc" },
    include: { images: true },
  });
  return NextResponse.json({ ok: true, cases });
}

/** POST /api/admin/portfolio — создать новый кейс (по умолчанию скрыт). */
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const parsed = portfolioCaseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Проверьте поля." },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.portfolioCase.aggregate({ _max: { sortOrder: true } });

  const created = await prisma.portfolioCase.create({
    data: {
      ...parsed.data,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });

  return NextResponse.json({ ok: true, case: created });
}
