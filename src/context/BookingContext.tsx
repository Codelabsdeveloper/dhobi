import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildEmptyQuantities,
  dryItems,
  getItemDisplayName,
  getUnitPriceForId,
  unitLabelForId,
  washItems,
  washServiceId,
} from "../data/catalog";

export interface OrderLine {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  unitLabel: string;
  lineTotal: number;
}

export interface BookingState {
  quantities: Record<string, number>;
  address: string;
  phone: string;
}

interface BookingContextValue {
  state: BookingState;
  setItemQuantity: (id: string, qty: number) => void;
  adjustItemQuantity: (id: string, delta: number) => void;
  setAddress: (v: string) => void;
  setPhone: (v: string) => void;
  resetFlow: () => void;
  orderLines: OrderLine[];
  totalRupees: number;
  totalUnits: number;
}

const defaultState: BookingState = {
  quantities: buildEmptyQuantities(),
  address: "",
  phone: "",
};

const ORDER_IDS = [
  ...washItems.flatMap((r) => [washServiceId(r.id, "wash"), washServiceId(r.id, "iron")]),
  ...dryItems.map((r) => r.id),
];

function clampQty(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(99, Math.floor(n)));
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(defaultState);

  const setItemQuantity = useCallback((id: string, qty: number) => {
    const safe = clampQty(qty);
    setState((s) => ({
      ...s,
      quantities: { ...s.quantities, [id]: safe },
    }));
  }, []);

  const adjustItemQuantity = useCallback((id: string, delta: number) => {
    setState((s) => {
      const cur = s.quantities[id] ?? 0;
      return {
        ...s,
        quantities: { ...s.quantities, [id]: clampQty(cur + delta) },
      };
    });
  }, []);

  const setAddress = useCallback((v: string) => {
    setState((s) => ({ ...s, address: v }));
  }, []);

  const setPhone = useCallback((v: string) => {
    setState((s) => ({ ...s, phone: v }));
  }, []);

  const resetFlow = useCallback(() => {
    setState(defaultState);
  }, []);

  const { orderLines, totalRupees, totalUnits } = useMemo(() => {
    const lines: OrderLine[] = [];
    let total = 0;
    let units = 0;
    for (const id of ORDER_IDS) {
      const qty = state.quantities[id] ?? 0;
      if (qty <= 0) continue;
      const unitPrice = getUnitPriceForId(id);
      const lineTotal = qty * unitPrice;
      total += lineTotal;
      units += qty;
      lines.push({
        id,
        name: getItemDisplayName(id),
        qty,
        unitPrice,
        unitLabel: unitLabelForId(id),
        lineTotal,
      });
    }
    return { orderLines: lines, totalRupees: total, totalUnits: units };
  }, [state.quantities]);

  const value = useMemo<BookingContextValue>(
    () => ({
      state,
      setItemQuantity,
      adjustItemQuantity,
      setAddress,
      setPhone,
      resetFlow,
      orderLines,
      totalRupees,
      totalUnits,
    }),
    [
      state,
      setItemQuantity,
      adjustItemQuantity,
      setAddress,
      setPhone,
      resetFlow,
      orderLines,
      totalRupees,
      totalUnits,
    ],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
