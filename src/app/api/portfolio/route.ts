import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** GET /api/portfolio — только опубликованные кейсы, для публичного сайта. */
export async function GET() {
  const cases = await prisma.portfolioCase.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json({ ok: true, cases });
}
