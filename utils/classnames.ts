export type ClassValue = string | number | boolean | null | undefined;

/**
 * Simple classname concatenation utility.
 * Filters out falsy values and joins the remaining strings.
 * Note: For Tailwind CSS projects, prefer using the cn function from lib/utils/cn.ts
 * which includes tailwind-merge for proper class merging.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
