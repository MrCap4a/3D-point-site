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
  description: z.string().trim().min(1, "Добавьте описание").max(2000),
  // Цена — свободный текст (например "2500 ₽" или "от 1500 ₽"), необязательна.
  price: z.string().trim().max(100).optional().or(z.literal("")),
});

export type PortfolioCaseInput = z.infer<typeof portfolioCaseSchema>;

export const PORTFOLIO_CATEGORY_LABELS: Record<string, string> = {
  RESTORATION: "Восстановление",
  MANUFACTURING: "Изготовление",
  BUSINESS: "Бизнес",
  SERIAL: "Серийное производство",
};
