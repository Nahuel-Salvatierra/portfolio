const DEFAULT_SITE_URL = "https://nahuel-salvatierra.github.io/portfolio";
const BASE_PATH = "/portfolio";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const cleaned = withProtocol.replace(/\/$/, "");

  if (cleaned.endsWith(BASE_PATH)) return cleaned;
  return `${cleaned}${BASE_PATH}`;
}
