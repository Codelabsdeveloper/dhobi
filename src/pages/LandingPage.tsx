import { Link } from "react-router-dom";
import { MapPin, Shirt, Sparkles, Wind } from "lucide-react";
import { IMAGES } from "../constants/images";
import { BRAND_NAME, OKBOYS_PLAY_STORE_URL, OKBOYS_PROMO_BLURB, SERVICE_AREAS_BLURB } from "../config";

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
            <span className="landing-brand-name">{BRAND_NAME}</span>
          </div>
        </header>

        <div className="landing-main">
          <div className="landing-main-col">
            <section className="landing-hero">
              <h1 className="landing-title">Laundry Services</h1>
              <p className="landing-tagline">Fast • Affordable • Reliable</p>
            </section>

            <aside className="landing-service-areas" role="note" aria-label="Areas we operate in">
              <span className="landing-service-areas-icon" aria-hidden>
                <MapPin size={20} strokeWidth={2.2} />
              </span>
              <p className="landing-service-areas-text">{SERVICE_AREAS_BLURB}</p>
            </aside>

            <aside className="landing-okboys-promo" aria-label="OkBoys pickup and drop app">
              <p className="landing-okboys-promo-text">{OKBOYS_PROMO_BLURB}</p>
              <a
                href={OKBOYS_PLAY_STORE_URL}
                className="landing-okboys-promo-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                OkBoys on Google Play
              </a>
            </aside>

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
                <span className="landing-tab-label">Iron</span>
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
                <span>Pant / shirt (wash)</span>
                <span>₹15 ea.</span>
              </li>
              <li>
                <span>Salwar kameez</span>
                <span>₹75 wash</span>
              </li>
              <li>
                <span>Bed sheet</span>
                <span>₹50 wash</span>
              </li>
            </ul>
            <h2 className="landing-section-title landing-section-title--spaced">DRY CLEANING</h2>
            <div className="landing-divider" />
            <ul className="landing-mini-list">
              <li>
                <span>Saree</span>
                <span>₹200</span>
              </li>
              <li>
                <span>Blazer / jacket</span>
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
          <Link to="/">← Home page</Link>
        </p>
        </div>
      </div>
    </div>
  );
}
