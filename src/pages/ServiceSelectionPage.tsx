import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../constants/images";
import { CatalogIcon } from "../components/CatalogIcon";
import { dryItems, washItems, washRowForCatalogIcon, washServiceId } from "../data/catalog";
import type { WashCatalogRow } from "../data/catalog";
import { useBooking } from "../context/BookingContext";

const MAX_QTY = 99;

function washIronRowQty(qWash: number, qIron: number): number {
  return Math.max(qWash, qIron);
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

interface WashItemRowProps {
  row: WashCatalogRow;
  qWash: number;
  qIron: number;
  rowQty: number;
  svcActive: boolean;
  onToggleWash: (checked: boolean) => void;
  onToggleIron: (checked: boolean) => void;
  onRowStep: (delta: number) => void;
}

function WashItemRow({
  row,
  qWash,
  qIron,
  rowQty,
  svcActive,
  onToggleWash,
  onToggleIron,
  onRowStep,
}: WashItemRowProps) {
  const iconRow = washRowForCatalogIcon(row);
  const selected = qWash > 0 || qIron > 0;
  const washId = `svc-wash-${row.id}`;
  const ironId = `svc-iron-${row.id}`;

  return (
    <li>
      <div
        className={`catalog-row catalog-row--qty catalog-row--wash-split ${
          selected ? "catalog-row--selected" : ""
        }`}
      >
        <div className="catalog-wash-head">
          <span className="catalog-row-icon-wrap">
            <CatalogIcon row={iconRow} />
          </span>
          <span className="catalog-row-name catalog-row-name--wash-title">{row.name}</span>
        </div>

        <div className="catalog-wash-controls">
          <div className="catalog-wash-svc-grid">
            <div className={`catalog-wash-svc ${qWash > 0 ? "catalog-wash-svc--on" : ""}`}>
              <label className="catalog-wash-svc-label" htmlFor={washId}>
                <input
                  id={washId}
                  type="checkbox"
                  className="catalog-row-check catalog-row-check--inline"
                  checked={qWash > 0}
                  onChange={(e) => onToggleWash(e.target.checked)}
                />
                <span className="catalog-wash-svc-text">
                  Wash <span className="catalog-wash-rate">₹{row.washPrice}</span>
                </span>
              </label>
            </div>

            <div className={`catalog-wash-svc ${qIron > 0 ? "catalog-wash-svc--on" : ""}`}>
              <label className="catalog-wash-svc-label" htmlFor={ironId}>
                <input
                  id={ironId}
                  type="checkbox"
                  className="catalog-row-check catalog-row-check--inline"
                  checked={qIron > 0}
                  onChange={(e) => onToggleIron(e.target.checked)}
                />
                <span className="catalog-wash-svc-text">
                  Iron <span className="catalog-wash-rate">₹{row.ironPrice}</span>
                </span>
              </label>
            </div>
          </div>

          <div className="catalog-wash-stepper-wrap">
            <div className="qty-stepper" aria-label={`Quantity for ${row.name}`}>
              <button
                type="button"
                className="qty-stepper-btn"
                disabled={!svcActive || rowQty <= 0}
                onClick={() => onRowStep(-1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-stepper-val" aria-live="polite">
                {rowQty}
              </span>
              <button
                type="button"
                className="qty-stepper-btn"
                disabled={!svcActive || rowQty >= MAX_QTY}
                onClick={() => onRowStep(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

type ServiceTab = "wash-iron" | "dry-cleaning";

export function ServiceSelectionPage() {
  const navigate = useNavigate();
  const { state, setItemQuantity, adjustItemQuantity, totalRupees } = useBooking();
  const [activeTab, setActiveTab] = useState<ServiceTab>("wash-iron");

  const q = (id: string) => state.quantities[id] ?? 0;

  const toggle = (id: string, checked: boolean) => {
    if (checked) setItemQuantity(id, Math.max(q(id), 1));
    else setItemQuantity(id, 0);
  };

  const toggleWashForRow = (rowId: string, checked: boolean) => {
    const idWash = washServiceId(rowId, "wash");
    const idIron = washServiceId(rowId, "iron");
    const qw = q(idWash);
    const qi = q(idIron);
    if (!checked) {
      setItemQuantity(idWash, 0);
      return;
    }
    const n = Math.max(qw, qi, 1);
    setItemQuantity(idWash, n);
    if (qi > 0) setItemQuantity(idIron, n);
  };

  const toggleIronForRow = (rowId: string, checked: boolean) => {
    const idWash = washServiceId(rowId, "wash");
    const idIron = washServiceId(rowId, "iron");
    const qw = q(idWash);
    const qi = q(idIron);
    if (!checked) {
      setItemQuantity(idIron, 0);
      return;
    }
    const n = Math.max(qw, qi, 1);
    setItemQuantity(idIron, n);
    if (qw > 0) setItemQuantity(idWash, n);
  };

  const stepWashIronRow = (rowId: string, delta: number) => {
    const idWash = washServiceId(rowId, "wash");
    const idIron = washServiceId(rowId, "iron");
    const qw = q(idWash);
    const qi = q(idIron);
    const wOn = qw > 0;
    const iOn = qi > 0;
    if (!wOn && !iOn) return;
    const cur = washIronRowQty(qw, qi);
    const next = Math.max(0, Math.min(MAX_QTY, cur + delta));
    if (next <= 0) {
      setItemQuantity(idWash, 0);
      setItemQuantity(idIron, 0);
      return;
    }
    if (wOn) setItemQuantity(idWash, next);
    if (iOn) setItemQuantity(idIron, next);
  };

  return (
    <div className="page page--cream page--service">
      <h1 className="page-title page-title--selection">Service Selection</h1>

      <div className="page-banner" role="presentation">
        <img src={IMAGES.washingTub} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="service-tabbed">
        <div className="service-tabs" role="tablist" aria-label="Service category">
          <button
            type="button"
            role="tab"
            id="tab-wash-iron"
            className={`service-tab ${activeTab === "wash-iron" ? "service-tab--active" : ""}`}
            aria-selected={activeTab === "wash-iron"}
            aria-controls="panel-wash-iron"
            tabIndex={activeTab === "wash-iron" ? 0 : -1}
            onClick={() => setActiveTab("wash-iron")}
          >
            Wash &amp; iron
          </button>
          <button
            type="button"
            role="tab"
            id="tab-dry-cleaning"
            className={`service-tab ${activeTab === "dry-cleaning" ? "service-tab--active" : ""}`}
            aria-selected={activeTab === "dry-cleaning"}
            aria-controls="panel-dry-cleaning"
            tabIndex={activeTab === "dry-cleaning" ? 0 : -1}
            onClick={() => setActiveTab("dry-cleaning")}
          >
            Dry cleaning
          </button>
        </div>

        <div className="service-tab-panels">
          {activeTab === "wash-iron" ? (
            <section
              id="panel-wash-iron"
              role="tabpanel"
              aria-labelledby="tab-wash-iron"
              className="card card--section service-tab-panel"
            >
              <h2 className="section-head-text section-head-text--solo">Wash &amp; iron</h2>
              <ul className="catalog-list catalog-list--qty">
                {washItems.map((row) => {
                  const idWash = washServiceId(row.id, "wash");
                  const idIron = washServiceId(row.id, "iron");
                  const qW = q(idWash);
                  const qI = q(idIron);
                  const wOn = qW > 0;
                  const iOn = qI > 0;
                  const rowQty = washIronRowQty(qW, qI);
                  return (
                    <WashItemRow
                      key={row.id}
                      row={row}
                      qWash={qW}
                      qIron={qI}
                      rowQty={rowQty}
                      svcActive={wOn || iOn}
                      onToggleWash={(c) => toggleWashForRow(row.id, c)}
                      onToggleIron={(c) => toggleIronForRow(row.id, c)}
                      onRowStep={(d) => stepWashIronRow(row.id, d)}
                    />
                  );
                })}
              </ul>
            </section>
          ) : (
            <section
              id="panel-dry-cleaning"
              role="tabpanel"
              aria-labelledby="tab-dry-cleaning"
              className="card card--section service-tab-panel"
            >
              <h2 className="section-head-text section-head-text--solo">Dry cleaning</h2>
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
          )}
        </div>
      </div>

      <div className="service-footer">
        <p className="service-policy-note" role="note">
          {`Note : MINIMUM ORDER 500/- Delivery charges applies 100/- ON PICK UP & DROP`}
        </p>
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
