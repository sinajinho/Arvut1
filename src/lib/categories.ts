export const categories = [
  { label: "Processors (CPU)", urlSlug: "processors-cpu", dbSlug: "cpus" },
  { label: "Motherboards", urlSlug: "motherboards", dbSlug: "motherboards" },
  { label: "Graphics Cards (GPU)", urlSlug: "graphics-cards-gpu", dbSlug: "gpus" },
  { label: "Memory (RAM)", urlSlug: "memory-ram", dbSlug: "ram" },
  { label: "Internal Drives (SSD)", urlSlug: "internal-drives-ssd", dbSlug: "ssds" },
  { label: "Power Supplies (PSU)", urlSlug: "power-supplies-psu", dbSlug: "power-supplies" },
  { label: "Cases", urlSlug: "cases", dbSlug: "cases" },
  { label: "Coolers", urlSlug: "coolers", dbSlug: "coolers" },
] as const;

export function getDbSlug(urlSlug: string): string | undefined {
  return categories.find((c) => c.urlSlug === urlSlug)?.dbSlug;
}

export function getCategoryLabel(urlSlug: string): string | undefined {
  return categories.find((c) => c.urlSlug === urlSlug)?.label;
}
