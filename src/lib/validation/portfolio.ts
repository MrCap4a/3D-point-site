import { z } from "zod";

/**
 * Валидация кейса портфолио для админки. Оформление в духе объявлений
 * (название, фото, описание, необязательная цена) — без категорий и без
 * технических полей материалов/параметров печати.
 */
export const portfolioCaseSchema = z.object({
  title: z.string().trim().min(1, "Укажите название кейса").max(200),
  description: z.string().trim().min(1, "Добавьте описание").max(2000),
  // Цена — свободный текст (например "2500 ₽" или "от 1500 ₽"), необязательна.
  price: z.string().trim().max(100).optional().or(z.literal("")),
});

export type PortfolioCaseInput = z.infer<typeof portfolioCaseSchema>;
