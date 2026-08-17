import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma Client. В dev-режиме Next.js пересоздаёт модули при
 * hot-reload, поэтому кладём инстанс в globalThis, чтобы не открывать новое
 * соединение с БД на каждое изменение файла.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
