import {
  Bath,
  BedDouble,
  Footprints,
  Layers,
  Shirt,
  Snowflake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { CatalogRow } from "../data/catalog";

const toneClass: Record<CatalogRow["iconTone"], string> = {
  blue: "catalog-icon--blue",
  brown: "catalog-icon--brown",
  pink: "catalog-icon--pink",
  orange: "catalog-icon--orange",
  sky: "catalog-icon--sky",
  yellow: "catalog-icon--yellow",
  tan: "catalog-icon--tan",
  slate: "catalog-icon--slate",
  amber: "catalog-icon--amber",
};

const iconMap: Record<string, LucideIcon> = {
  "pant-shirt": Shirt,
  salwar: Layers,
  chuni: Sparkles,
  blouse: Shirt,
  saree: Layers,
  bedsheet: BedDouble,
  pillow: BedDouble,
  others: Footprints,
  blazer: Shirt,
  blankets: Snowflake,
};

export function CatalogIcon({ row, size = 20 }: { row: CatalogRow; size?: number }) {
  const Icon = iconMap[row.id] ?? Bath;
  return (
    <span className={`catalog-icon ${toneClass[row.iconTone]}`}>
      <Icon size={size} strokeWidth={2} aria-hidden />
    </span>
  );
}

export function BasketIcon({ size = 22 }: { size?: number }) {
  return (
    <span className="catalog-icon catalog-icon--blue">
      <Bath size={size} strokeWidth={2} aria-hidden />
    </span>
  );
}

export function RadioDot({ selected }: { selected: boolean }) {
  return <span className={`service-radio ${selected ? "service-radio--on" : ""}`} aria-hidden />;
}
