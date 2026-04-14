import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Search,
  SendHorizontal,
  Smile,
  Paperclip,
  Video,
} from "lucide-react";
import { WHATSAPP_BUSINESS_DISPLAY } from "../config";
import { useBooking } from "../context/BookingContext";
import { formatIndiaPhoneDisplay } from "../utils/phone";

export function WhatsAppConfirmPage() {
  const { state, orderLines, totalRupees, totalUnits } = useBooking();

  return (
    <div className="page page--wa">
      <header className="wa-topbar">
        <div className="wa-topbar-left">
          <span className="wa-back" aria-hidden>
            <ArrowLeft size={22} />
          </span>
          <span className="wa-avatar" aria-hidden />
          <div className="wa-topbar-titles">
            <span className="wa-chat-name">DoBiWash</span>
            <span className="wa-chat-sub">To {formatIndiaPhoneDisplay(state.phone)}</span>
          </div>
        </div>
        <div className="wa-topbar-actions">
          <Video size={22} />
          <Phone size={20} />
          <MoreVertical size={20} />
        </div>
      </header>

      <div className="wa-body">
        <div className="wa-bubble-wrap">
          <div className="wa-bubble">
            <div className="wa-bubble-title">
              <span className="wa-bubble-ico" aria-hidden>
                🧺
              </span>
              <span>Laundry Order</span>
            </div>
            <div className="wa-bubble-lines">
              {orderLines.map((line) => (
                <p key={line.id}>
                  <strong>{line.name}</strong> ×{line.qty} — ₹{line.lineTotal}
                </p>
              ))}
              <p>
                <strong>Total:</strong> ₹{totalRupees} ({totalUnits} units)
              </p>
              <p>
                <strong>Address:</strong> {state.address.trim() || "—"}
              </p>
              <p>
                <strong>Phone:</strong> {state.phone.trim() || "—"}
              </p>
            </div>
            <hr className="wa-bubble-rule" />
            <p className="wa-bubble-cta">
              Send in WhatsApp from {WHATSAPP_BUSINESS_DISPLAY} — chat opens to your number above.
            </p>
            <span className="wa-bubble-time">12:34</span>
          </div>
        </div>
      </div>

      <footer className="wa-inputbar">
        <span className="wa-input-icon" aria-hidden>
          <Smile size={22} />
        </span>
        <div className="wa-input-fake" role="textbox" aria-label="Message">
          Type a message
        </div>
        <span className="wa-input-icon" aria-hidden>
          <Paperclip size={22} />
        </span>
        <span className="wa-input-icon wa-input-icon--muted" aria-hidden>
          <Search size={22} />
        </span>
        <span className="wa-send" aria-hidden>
          <SendHorizontal size={20} />
        </span>
      </footer>

      <p className="wa-done">
        <Link to="/home" className="btn btn-ghost btn-block">
          Done — back to home
        </Link>
      </p>
    </div>
  );
}
