/**
 * Фиксированный набор известных ключей настроек — намеренно не даём
 * администратору вводить произвольные ключи, чтобы не разойтись с тем,
 * что реально отображается на публичном сайте (см. архитектуру админки:
 * "не дать случайно сломать структуру сайта").
 */
export const SITE_SETTING_KEYS = ["phone", "telegram", "email"] as const;
export type SiteSettingKey = (typeof SITE_SETTING_KEYS)[number];

export const SITE_SETTING_LABELS: Record<SiteSettingKey, string> = {
  phone: "Телефон",
  telegram: "Telegram",
  email: "Email",
};
