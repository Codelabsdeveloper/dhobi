import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wind } from "lucide-react";
import { IMAGES } from "../constants/images";
import {
  dryItems,
  washItems,
  washPrimary,
  WASH_PRIMARY_ID,
} from "../data/catalog";
import { CatalogIcon, RadioDot } from "../components/CatalogIcon";
import { useBooking } from "../context/BookingContext";

const MAX_QTY = 99;

function unitSuffixForPrice(unit: "pair" | "piece") {
  return unit === "pair" ? "Pair" : "Piece";
}

interface ItemQtyRowProps {
  id: string;
  label: string;
  price: number;
  priceUnitLabel: string;
  icon: ReactNode;
  qty: number;
  onToggle: (checked: boolean) => void;
  onStep: (delta: number) => void;
}

function ItemQtyRow({
  id,
  label,
  price,
  priceUnitLabel,
  icon,
  qty,
  onToggle,
  onStep,
}: ItemQtyRowProps) {
  const checked = qty > 0;
  const inputId = `item-${id}`;

  return (
    <li>
      <div
        className={`catalog-row catalog-row--qty ${checked ? "catalog-row--selected" : ""}`}
      >
        <label className="catalog-row-select" htmlFor={inputId}>
          <input
            id={inputId}
            type="checkbox"
            className="catalog-row-check"
            checked={checked}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <span className="catalog-row-icon-wrap">{icon}</span>
          <span className="catalog-row-name">{label}</span>
        </label>
        <span className="catalog-row-price catalog-row-price--qty">
          ₹{price}
          <span className="catalog-row-unit">/{priceUnitLabel}</span>
        </span>
        <div className="qty-stepper" aria-label={`Quantity for ${label}`}>
          <button
            type="button"
            className="qty-stepper-btn"
            disabled={qty <= 0}
            onClick={() => onStep(-1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-stepper-val" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            className="qty-stepper-btn"
            disabled={qty >= MAX_QTY}
            onClick={() => onStep(1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}

export function ServiceSelectionPage() {
  const navigate = useNavigate();
  const { state, setItemQuantity, adjustItemQuantity, totalRupees } = useBooking();

  const q = (id: string) => state.quantities[id] ?? 0;

  const toggle = (id: string, checked: boolean) => {
    if (checked) setItemQuantity(id, Math.max(q(id), 1));
    else setItemQuantity(id, 0);
  };

  return (
    <div className="page page--cream page--service">
      <h1 className="page-title page-title--selection">Service Selection</h1>

      <div className="page-banner" role="presentation">
        <img src={IMAGES.washingTub} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="service-cards-row">
        <section className="card card--section">
          <div className="section-head">
            <RadioDot selected />
            <h2 className="section-head-text">WASH</h2>
          </div>

          <ul className="catalog-list catalog-list--qty">
            <ItemQtyRow
              id={WASH_PRIMARY_ID}
              label={washPrimary.label}
              price={washPrimary.pricePerPair}
              priceUnitLabel="Pair"
              icon={
                <span className="catalog-icon catalog-icon--blue" aria-hidden>
                  <Wind size={20} strokeWidth={2} />
                </span>
              }
              qty={q(WASH_PRIMARY_ID)}
              onToggle={(c) => toggle(WASH_PRIMARY_ID, c)}
              onStep={(d) => adjustItemQuantity(WASH_PRIMARY_ID, d)}
            />
            {washItems.map((row) => (
              <ItemQtyRow
                key={row.id}
                id={row.id}
                label={row.name}
                price={row.price}
                priceUnitLabel={unitSuffixForPrice(row.unit)}
                icon={<CatalogIcon row={row} />}
                qty={q(row.id)}
                onToggle={(c) => toggle(row.id, c)}
                onStep={(d) => adjustItemQuantity(row.id, d)}
              />
            ))}
          </ul>
        </section>

        <section className="card card--section">
          <h2 className="section-head-text section-head-text--solo">
            DRY CLEANING
          </h2>
          <ul className="catalog-list catalog-list--tight catalog-list--qty">
            {dryItems.map((row) => (
              <ItemQtyRow
                key={row.id}
                id={row.id}
                label={row.name}
                price={row.price}
                priceUnitLabel="Piece"
                icon={<CatalogIcon row={row} />}
                qty={q(row.id)}
                onToggle={(c) => toggle(row.id, c)}
                onStep={(d) => adjustItemQuantity(row.id, d)}
              />
            ))}
          </ul>
        </section>
      </div>

      <div className="service-footer">
        {totalRupees > 0 ? (
          <p className="service-subtotal">
            Subtotal: <strong>₹{totalRupees}</strong>
          </p>
        ) : (
          <p className="service-hint">Select items and set quantities to continue.</p>
        )}

        <div className="page-actions">
          <Link to="/home" className="btn btn-ghost">
            Home
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            disabled={totalRupees <= 0}
            onClick={() => navigate("/order/booking")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
