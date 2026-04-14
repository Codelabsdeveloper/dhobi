import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Phone } from "lucide-react";
import { IMAGES } from "../constants/images";
import { useBooking } from "../context/BookingContext";

export function BookingDetailsPage() {
  const navigate = useNavigate();
  const { state, setAddress, setPhone } = useBooking();

  const canSubmit = state.address.trim().length > 3 && state.phone.trim().length >= 8;

  return (
    <div className="page page--booking page--form">
      <header className="subnav">
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <span className="time-pill">03:41</span>
      </header>

      <figure className="form-hero-figure">
        <img
          src={IMAGES.dhobiFolded}
          alt="Laundry professional inspecting a finished garment in protective packaging"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <h1 className="page-title page-title--booking">Booking Details</h1>

      <div className="input-card">
        <span className="input-card-icon">
          <Home size={20} />
        </span>
        <input
          className="input-card-field"
          placeholder="Enter Address"
          value={state.address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="street-address"
        />
      </div>

      <div className="input-card">
        <span className="input-card-icon">
          <Phone size={20} />
        </span>
        <input
          className="input-card-field"
          placeholder="Enter Phone Number"
          value={state.phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <div className="spacer-grow" />

      <div className="page-footer-btn">
        <button
          type="button"
          className="btn btn-primary btn-block btn-lg"
          disabled={!canSubmit}
          onClick={() => navigate("/order/summary")}
        >
          Confirm Booking
        </button>
      </div>

      <p className="page-foot-link">
        <Link to="/home">Cancel and return home</Link>
      </p>
    </div>
  );
}
