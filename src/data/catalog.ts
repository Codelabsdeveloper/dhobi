export type PriceUnit = "pair" | "piece";

export interface CatalogRow {
  id: string;
  name: string;
  price: number;
  unit: PriceUnit;
  iconTone: "blue" | "brown" | "pink" | "orange" | "sky" | "yellow" | "tan" | "slate" | "amber";
}

export const WASH_PRIMARY_ID = "wash-iron";

export const washPrimary = {
  id: WASH_PRIMARY_ID,
  label: "Wash - Iron",
  pricePerPair: 60,
} as const;

export const washItems: CatalogRow[] = [
  { id: "pant-shirt", name: "Pant & Shirt", price: 75, unit: "pair", iconTone: "blue" },
  { id: "salwar", name: "Salwar Kameez", price: 75, unit: "pair", iconTone: "blue" },
  { id: "chuni", name: "Chuni", price: 50, unit: "pair", iconTone: "orange" },
  { id: "blouse", name: "Blouse", price: 30, unit: "pair", iconTone: "pink" },
  { id: "saree", name: "Saree", price: 50, unit: "pair", iconTone: "orange" },
  { id: "bedsheet", name: "Bed Sheet", price: 50, unit: "pair", iconTone: "sky" },
  { id: "pillow", name: "Pillow Covers", price: 25, unit: "pair", iconTone: "yellow" },
  { id: "others", name: "Others", price: 50, unit: "pair", iconTone: "tan" },
];

export const dryItems: CatalogRow[] = [
  { id: "blazer", name: "Blazer", price: 250, unit: "piece", iconTone: "slate" },
  { id: "blankets", name: "Blankets", price: 200, unit: "piece", iconTone: "amber" },
];

const ALL_ITEM_IDS: string[] = [
  WASH_PRIMARY_ID,
  ...washItems.map((r) => r.id),
  ...dryItems.map((r) => r.id),
];

export function buildEmptyQuantities(): Record<string, number> {
  const q: Record<string, number> = {};
  for (const id of ALL_ITEM_IDS) q[id] = 0;
  return q;
}

export function getUnitPriceForId(id: string): number {
  if (id === WASH_PRIMARY_ID) return washPrimary.pricePerPair;
  const row = washItems.find((r) => r.id === id) ?? dryItems.find((r) => r.id === id);
  return row?.price ?? 0;
}

export function getItemDisplayName(id: string): string {
  if (id === WASH_PRIMARY_ID) return washPrimary.label;
  return (
    washItems.find((r) => r.id === id)?.name ?? dryItems.find((r) => r.id === id)?.name ?? id
  );
}

export function getCatalogRowById(id: string): CatalogRow | undefined {
  return washItems.find((r) => r.id === id) ?? dryItems.find((r) => r.id === id);
}

export function unitLabelForId(id: string): string {
  if (id === WASH_PRIMARY_ID) return "Pair";
  const row = getCatalogRowById(id);
  return row?.unit === "piece" ? "Piece" : "Pair";
}
