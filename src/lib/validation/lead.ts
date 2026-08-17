import { z } from "zod";

/**
 * Серверная валидация заявки. Форма — не полноценное ТЗ, поэтому набор
 * обязательных полей минимален: имя, способ связи и краткое описание.
 * Остальное (компания, объём партии, файлы) — опционально в зависимости
 * от категории, но валидация не привязывает жёсткие ограничения к
 * категории на уровне схемы, чтобы не плодить дублирующиеся схемы —
 * бизнес-смысл различий уже выражен в самих формах на клиенте.
 */
export const leadCategorySchema = z.enum(["PRIVATE", "BUSINESS", "SERIAL"]);
export const contactMethodValues = ["telegram", "phone", "email", "other"] as const;

export const leadFormSchema = z.object({
  category: leadCategorySchema,
  name: z.string().trim().min(1, "Укажите имя").max(120),
  contactValue: z.string().trim().min(2, "Укажите способ связи").max(200),
  description: z.string().trim().min(1, "Кратко опишите задачу").max(4000),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  batchSize: z.string().trim().max(200).optional().or(z.literal("")),
  // Honeypot-поле: обычный пользователь его не видит и не заполняет.
  website: z.string().max(0, "Заявка отклонена").optional().or(z.literal("")),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 МБ на файл
export const MAX_FILES_PER_LEAD = 5;

export const ALLOWED_FILE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
  "model/stl",
  "application/sla",
  "application/vnd.ms-pki.stl",
  "application/octet-stream", // некоторые .stl приходят с этим типом
]);
