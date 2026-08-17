import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

/** GET /api/admin/leads?category=&status= — список заявок для админки. */
export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  const leads = await prisma.lead.findMany({
    where: {
      ...(category ? { category: category as never } : {}),
      ...(status ? { status: status as never } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { files: true },
  });

  return NextResponse.json({ ok: true, leads });
}
