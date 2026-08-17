import { z } from "zod";

/**
 * Валидация кейса портфолио для админки. Намеренно не включает технические
 * поля (материал, параметры печати) — согласно архитектуре, администратор
 * заполняет только название, категорию и три коротких смысловых блока.
 */
export const portfolioCategorySchema = z.enum([
  "RESTORATION",
  "MANUFACTURING",
  "BUSINESS",
  "SERIAL",
]);

export const portfolioCaseSchema = z.object({
  title: z.string().trim().min(1, "Укажите название кейса").max(200),
  category: portfolioCategorySchema,
  problemText: z.string().trim().min(1, "Опишите проблему клиента").max(2000),
  solutionText: z.string().trim().min(1, "Опишите решение").max(2000),
  resultText: z.string().trim().min(1, "Опишите результат").max(2000),
});

export type PortfolioCaseInput = z.infer<typeof portfolioCaseSchema>;

export const PORTFOLIO_CATEGORY_LABELS: Record<string, string> = {
  RESTORATION: "Восстановление",
  MANUFACTURING: "Изготовление",
  BUSINESS: "Бизнес",
  SERIAL: "Серийное производство",
};
