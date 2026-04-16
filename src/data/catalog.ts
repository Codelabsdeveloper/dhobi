export type PriceUnit = "pair" | "piece";

export interface CatalogRow {
  id: string;
  name: string;
  price: number;
  unit: PriceUnit;
  iconTone: "blue" | "brown" | "pink" | "orange" | "sky" | "yellow" | "tan" | "slate" | "amber";
}

/** Garment row with separate wash and iron unit prices. */
export interface WashCatalogRow {
  id: string;
  name: string;
  washPrice: number;
  ironPrice: number;
  unit: PriceUnit;
  iconTone: CatalogRow["iconTone"];
}

export const washItems: WashCatalogRow[] = [
  { id: "pant", name: "Pant", washPrice: 15, ironPrice: 15, unit: "piece", iconTone: "blue" },
  { id: "shirt", name: "Shirt", washPrice: 15, ironPrice: 15, unit: "piece", iconTone: "blue" },
  {
    id: "salwar",
    name: "Salwar kameez",
    washPrice: 75,
    ironPrice: 75,
    unit: "piece",
    iconTone: "blue",
  },
  {
    id: "dupatta",
    name: "Chunni",
    washPrice: 20,
    ironPrice: 10,
    unit: "piece",
    iconTone: "orange",
  },
  { id: "blouse", name: "Blouse", washPrice: 30, ironPrice: 20, unit: "piece", iconTone: "pink" },
  { id: "saree", name: "Saree", washPrice: 130, ironPrice: 40, unit: "piece", iconTone: "orange" },
  { id: "bedsheet", name: "Bed sheet", washPrice: 50, ironPrice: 20, unit: "piece", iconTone: "sky" },
  {
    id: "pillow",
    name: "Pillow cover",
    washPrice: 15,
    ironPrice: 15,
    unit: "piece",
    iconTone: "yellow",
  },
  {
    id: "others",
    name: "Others",
    washPrice: 30,
    ironPrice: 20,
    unit: "piece",
    iconTone: "tan",
  },
];

export const dryItems: CatalogRow[] = [
  { id: "dry-saree", name: "Saree", price: 200, unit: "piece", iconTone: "orange" },
  { id: "patu-saree", name: "Patu saree", price: 250, unit: "piece", iconTone: "orange" },
  { id: "dry-blouse", name: "Blouse", price: 100, unit: "piece", iconTone: "pink" },
  { id: "blazer", name: "Blazer / jacket", price: 250, unit: "piece", iconTone: "slate" },
  { id: "blanket-single", name: "Blanket (single)", price: 200, unit: "piece", iconTone: "amber" },
  { id: "blanket-double", name: "Blanket (double)", price: 300, unit: "piece", iconTone: "amber" },
];

export function washServiceId(itemId: string, kind: "wash" | "iron"): string {
  return `${itemId}-${kind}`;
}

function parseWashServiceId(
  id: string,
): { baseId: string; kind: "wash" | "iron" } | null {
  if (id.endsWith("-wash")) return { baseId: id.slice(0, -"-wash".length), kind: "wash" };
  if (id.endsWith("-iron")) return { baseId: id.slice(0, -"-iron".length), kind: "iron" };
  return null;
}

const WASH_ORDER_IDS: string[] = washItems.flatMap((r) => [
  washServiceId(r.id, "wash"),
  washServiceId(r.id, "iron"),
]);

const ALL_ITEM_IDS: string[] = [...WASH_ORDER_IDS, ...dryItems.map((r) => r.id)];

export function washRowForCatalogIcon(row: WashCatalogRow): CatalogRow {
  return {
    id: row.id,
    name: row.name,
    price: row.washPrice,
    unit: row.unit,
    iconTone: row.iconTone,
  };
}

export function buildEmptyQuantities(): Record<string, number> {
  const q: Record<string, number> = {};
  for (const id of ALL_ITEM_IDS) q[id] = 0;
  return q;
}

export function getUnitPriceForId(id: string): number {
  const svc = parseWashServiceId(id);
  if (svc) {
    const row = washItems.find((r) => r.id === svc.baseId);
    if (!row) return 0;
    return svc.kind === "wash" ? row.washPrice : row.ironPrice;
  }
  return dryItems.find((r) => r.id === id)?.price ?? 0;
}

export function getItemDisplayName(id: string): string {
  const svc = parseWashServiceId(id);
  if (svc) {
    const row = washItems.find((r) => r.id === svc.baseId);
    const name = row?.name ?? svc.baseId;
    const svcLabel = svc.kind === "wash" ? "Wash" : "Iron";
    return `${name} (${svcLabel})`;
  }
  return dryItems.find((r) => r.id === id)?.name ?? id;
}

export function getCatalogRowById(id: string): CatalogRow | undefined {
  const dry = dryItems.find((r) => r.id === id);
  if (dry) return dry;
  const svc = parseWashServiceId(id);
  if (!svc) return undefined;
  const row = washItems.find((r) => r.id === svc.baseId);
  return row ? washRowForCatalogIcon(row) : undefined;
}

export function unitLabelForId(id: string): string {
  const svc = parseWashServiceId(id);
  if (svc) {
    const row = washItems.find((r) => r.id === svc.baseId);
    return row?.unit === "piece" ? "Piece" : "Pair";
  }
  const row = dryItems.find((r) => r.id === id);
  return row?.unit === "piece" ? "Piece" : "Pair";
}
