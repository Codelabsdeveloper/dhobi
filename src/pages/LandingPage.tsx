import { Link } from "react-router-dom";
import { Shirt, Sparkles, Wind } from "lucide-react";
import { IMAGES } from "../constants/images";

export function LandingPage() {
  return (
    <div className="page page--landing">
      <figure className="landing-hero-media">
        <img
          src={IMAGES.heroDhobiGhat}
          alt="Industrial laundry with machines and stacked white linen"
          width={1400}
          height={788}
          decoding="async"
          fetchPriority="high"
        />
      </figure>

      <div className="landing-content">
        <header className="landing-header">
          <div className="landing-brand">
            <span className="landing-logo">
              <Shirt size={28} strokeWidth={2.2} />
            </span>
            <span className="landing-brand-name">DoBiWash</span>
          </div>
          <span className="time-pill time-pill--light">09:41</span>
        </header>

        <div className="landing-main">
          <div className="landing-main-col">
            <section className="landing-hero">
              <h1 className="landing-title">Laundry Services</h1>
              <p className="landing-tagline">Fast • Affordable • Reliable</p>
            </section>

            <section className="landing-tabs" aria-label="Service categories">
              <div className="landing-tab landing-tab--active">
                <span className="landing-tab-icon landing-tab-icon--wash">
                  <Sparkles size={22} />
                </span>
                <span className="landing-tab-label">WASH</span>
              </div>
              <div className="landing-tab">
                <span className="landing-tab-icon landing-tab-icon--muted">
                  <Wind size={22} />
                </span>
                <span className="landing-tab-label">Wash - Iron</span>
              </div>
              <div className="landing-tab">
                <span className="landing-tab-icon landing-tab-icon--muted">
                  <Shirt size={22} />
                </span>
                <span className="landing-tab-label">Dry Cleaning</span>
              </div>
            </section>
          </div>

          <section className="landing-preview">
            <h2 className="landing-section-title">WASH</h2>
            <div className="landing-divider" />
            <ul className="landing-mini-list">
              <li>
                <span>Pant &amp; Shirt</span>
                <span>₹60</span>
              </li>
              <li>
                <span>Salwar Kameez</span>
                <span>₹60</span>
              </li>
              <li>
                <span>Bed Sheet</span>
                <span>₹30</span>
              </li>
            </ul>
            <h2 className="landing-section-title landing-section-title--spaced">DRY CLEANING</h2>
            <div className="landing-divider" />
            <ul className="landing-mini-list">
              <li>
                <span>Blazer</span>
                <span>₹250</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="landing-mood-strip" role="presentation">
          <img src={IMAGES.dhobiWorkers} alt="" loading="lazy" decoding="async" />
          <img src={IMAGES.dhobiFolded} alt="" loading="lazy" decoding="async" />
          <img src={IMAGES.washingTub} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="landing-cta-wrap">
        <Link to="/order/service" className="btn btn-primary btn-block">
          Place order
        </Link>
        <p className="landing-back-welcome">
          <Link to="/">← Elegant welcome page</Link>
        </p>
        </div>
      </div>
    </div>
  );
}
