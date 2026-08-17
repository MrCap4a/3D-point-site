/**
 * Простая in-memory защита от спама/автоматических отправок по IP.
 * Для одного небольшого сервера этого достаточно; при масштабировании на
 * несколько инстансов потребуется вынести состояние во внешнее хранилище
 * (например Redis) — но это не блокирует текущий этап.
 */
const attempts = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000; // 10 минут
const MAX_REQUESTS_PER_WINDOW = 5;

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (attempts.get(identifier) ?? []).filter(
    (ts) => now - ts < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    attempts.set(identifier, timestamps);
    return true;
  }

  timestamps.push(now);
  attempts.set(identifier, timestamps);
  return false;
}
