import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterPrivateValues<T>(values: T): T {
  if (!values || typeof values !== "object") {
    return values;
  }

  if (values instanceof File) return values;

  if (Array.isArray(values)) {
    return values.map((item) => filterPrivateValues(item)) as any;
  }

  return Object.fromEntries(
    Object.entries(values as any)
      .filter(([key]) => !key.startsWith("_"))
      .map(([key, value]) => [key, filterPrivateValues(value)])
  ) as T;
}
