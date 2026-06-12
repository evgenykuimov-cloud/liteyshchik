const attempts = new Map<string, number[]>();

export function checkRateLimit(key: string, limit = 4, windowMs = 60_000) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) return false;
  attempts.set(key, [...recent, now]);
  return true;
}
