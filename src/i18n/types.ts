export type Locale = "en" | "fa" | "ar";

export type Direction = "ltr" | "rtl";

export const LOCALES: { code: Locale; label: string; dir: Direction }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "fa", label: "فارسی", dir: "rtl" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

export const RTL_LOCALES: Locale[] = ["fa", "ar"];

export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getDirection(locale: Locale): Direction {
  return isRTL(locale) ? "rtl" : "ltr";
}
