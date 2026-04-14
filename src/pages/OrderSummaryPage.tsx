import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Wind } from "lucide-react";
import { IMAGES } from "../constants/images";
import { getCatalogRowById } from "../data/catalog";
import type { OrderLine } from "../context/BookingContext";
import { BasketIcon, CatalogIcon } from "../components/CatalogIcon";
import { useBooking } from "../context/BookingContext";
import { BRAND_NAME, WHATSAPP_BUSINESS_DISPLAY, WHATSAPP_BUSINESS_E164 } from "../config";
import { formatIndiaPhoneDisplay, isValidIndiaMobile } from "../utils/phone";

function LineIcon({ lineId }: { lineId: string }) {
  const row = getCatalogRowById(lineId);
  if (row) return <CatalogIcon row={row} size={18} />;
  return (
    <span className="catalog-icon catalog-icon--blue" aria-hidden>
      <Wind size={18} strokeWidth={2} />
    </span>
  );
}

function buildCustomerOrderMessage(
  lines: OrderLine[],
  total: number,
  address: string,
  customerPhoneDisplay: string,
) {
  const itemsBlock = lines
    .map((l) => `• ${l.name} ×${l.qty} (${l.unitLabel}) — ₹${l.lineTotal}`)
    .join("\n");
  return [
    `*Your laundry order – ${BRAND_NAME}*`,
    "",
    "Thank you! Here is your order summary:",
    "",
    itemsBlock,
    "",
    `*Total: ₹${total}*`,
    "",
    `Pickup address: ${address}`,
    "",
    `My mobile (for pickup coordination): ${customerPhoneDisplay}`,
    "",
    `Reply on WhatsApp: ${WHATSAPP_BUSINESS_DISPLAY}`,
  ].join("\n");
}

export function OrderSummaryPage() {
  const navigate = useNavigate();
  const { state, orderLines, totalRupees, totalUnits } = useBooking();

  const openWhatsApp = () => {
    if (!isValidIndiaMobile(state.phone)) {
      window.alert("Please enter a valid 10-digit Indian mobile number on the booking screen.");
      navigate("/order/booking");
      return;
    }

    if (orderLines.length === 0) {
      navigate("/order/service");
      return;
    }

    const text = buildCustomerOrderMessage(
      orderLines,
      totalRupees,
      state.address.trim() || "—",
      formatIndiaPhoneDisplay(state.phone.trim()),
    );
    const url = `https://wa.me/${WHATSAPP_BUSINESS_E164}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    navigate("/order/confirm");
  };

  return (
    <div className="page page--summary page--form">
      <header className="subnav">
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <span className="time-pill time-pill--outline">03:41</span>
      </header>

      <figure className="form-hero-figure form-hero-figure--compact">
        <img
          src={IMAGES.dhobiWorkers}
          alt="Customer receiving cleaned garments at the door from a delivery professional"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <h1 className="page-title page-title--summary">Order Summary</h1>

      <div className="card card--summary">
        <div className="summary-category">
          <BasketIcon />
          <span>Your order</span>
        </div>
        {orderLines.length === 0 ? (
          <p className="summary-empty">
            No items selected.{" "}
            <Link to="/order/service">Go back to services</Link>
          </p>
        ) : (
          <ul className="summary-list summary-list--order">
            {orderLines.map((line) => (
              <li key={line.id} className="summary-list-row summary-list-row--order">
                <LineIcon lineId={line.id} />
                <span className="summary-name">
                  {line.name}{" "}
                  <span className="summary-qty">×{line.qty}</span>
                </span>
                <span className="summary-price">₹{line.lineTotal}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="summary-totals card card--inline">
        <div>
          <span className="muted">Items &amp; quantities</span>
          <p className="summary-strong">
            {orderLines.length} line{orderLines.length === 1 ? "" : "s"} · {totalUnits} total units
          </p>
        </div>
        <div className="summary-total-amount">₹{totalRupees}</div>
      </div>

      <div className="page-footer-btn">
        <button
          type="button"
          className="btn btn-whatsapp btn-block btn-lg"
          disabled={orderLines.length === 0}
          onClick={openWhatsApp}
        >
          <MessageCircle size={22} fill="currentColor" className="wa-icon" />
          Order via WhatsApp
        </button>
      </div>

      <p className="page-foot-link">
        <Link to="/home">Back to home</Link>
      </p>
    </div>
  );
}
