import { Link } from "react-router-dom";
import { Clock, Droplets, Flame, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { IMAGES } from "../constants/images";
import {
  BRAND_NAME,
  BUSINESS_HOURS,
  BUSINESS_OUTLET,
  BUSINESS_PHONE_SECOND_DISPLAY,
  BUSINESS_PHONE_SECOND_E164,
  OKBOYS_PLAY_STORE_URL,
  OKBOYS_PROMO_BLURB,
  SERVICE_AREAS_BLURB,
  SITE_DOMAIN,
  SITE_ORIGIN,
  WHATSAPP_BUSINESS_DISPLAY,
  WHATSAPP_BUSINESS_E164,
} from "../config";

export function MarketingLandingPage() {
  return (
    <div className="marketing-root" id="top">
      <header className="ml-nav">
        <Link to="/" className="ml-wordmark">
          {BRAND_NAME}
        </Link>
        <nav className="ml-nav-links" aria-label="Primary">
          <Link to="/home" className="ml-nav-link">
            Services
          </Link>
          <Link to="/order/service" className="ml-nav-link ml-nav-link--cta">
            Book now
          </Link>
        </nav>
      </header>

      <main>
        <section className="ml-hero">
          <div className="ml-inner ml-hero-grid">
            <div className="ml-hero-copy">
              <p className="ml-eyebrow">Hot-water laundry care</p>
              <h1 className="ml-title">
                Where <span className="ml-title-accent">warmth</span> meets immaculate linen
              </h1>
              <p className="ml-lead">
                We wash with heated, hygienic cycles—gentle on fabric, thorough on stains—then
                press, fold, and pack so everything returns feeling fresh and ready to wear.
              </p>
              <div className="ml-hero-actions">
                <Link to="/order/service" className="ml-btn ml-btn--primary">
                  Schedule a pickup
                </Link>
                <Link to="/order/service" className="ml-btn ml-btn--line">
                  View price list
                </Link>
              </div>
            </div>
            <figure className="ml-hero-figure">
              <img
                src={IMAGES.steamWashHero}
                alt="Shirts hanging on a conveyor line in a bright, professional laundry facility"
                width={1600}
                height={1067}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <div className="ml-inner ml-service-areas-wrap">
          <aside className="ml-service-areas" role="note" aria-label="Areas we operate in">
            <span className="ml-service-areas-icon" aria-hidden>
              <MapPin size={22} strokeWidth={2} />
            </span>
            <p className="ml-service-areas-text">{SERVICE_AREAS_BLURB}</p>
          </aside>
        </div>

        <section className="ml-section ml-section--soft">
          <div className="ml-inner">
            <p className="ml-section-label">Why heated washing</p>
            <h2 className="ml-heading">Heat lifts what cold water leaves behind</h2>
            <p className="ml-prose ml-prose--center">
              Warmer water helps detergents work evenly, relax fibres for a deeper clean, and
              supports hygiene you can feel—especially for everyday wear, towels, and household
              linen. We balance temperature with fabric care so colours stay true and cotton
              stays soft.
            </p>
            <ul className="ml-pillars">
              <li className="ml-pillar">
                <span className="ml-pillar-icon" aria-hidden>
                  <Flame size={22} strokeWidth={1.75} />
                </span>
                <h3>Controlled heat</h3>
                <p>Programmes matched to fabric type—never careless scalding.</p>
              </li>
              <li className="ml-pillar">
                <span className="ml-pillar-icon" aria-hidden>
                  <Droplets size={22} strokeWidth={1.75} />
                </span>
                <h3>Deep rinse</h3>
                <p>Full rinse cycles so soap and residue wash away cleanly.</p>
              </li>
              <li className="ml-pillar">
                <span className="ml-pillar-icon" aria-hidden>
                  <ShieldCheck size={22} strokeWidth={1.75} />
                </span>
                <h3>Hygienic finish</h3>
                <p>Ideal for families, shared homes, and high-touch textiles.</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="ml-section">
          <div className="ml-inner ml-split">
            <figure className="ml-split-media">
              <img
                src={IMAGES.dhobiWorkers}
                alt="Customer receiving cleaned garments in protective bags at the front door"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="ml-split-copy">
              <p className="ml-section-label">Hands-on care</p>
              <h2 className="ml-heading">From dhobi craft to modern convenience</h2>
              <p className="ml-prose">
                Our workflow blends open-air tradition with disciplined, timed washing. Each load
                is checked, treated for stains when needed, and finished with the same attention
                you would give at home—only faster and at scale.
              </p>
              <ul className="ml-checklist">
                <li>
                  <Sparkles size={18} aria-hidden />
                  Separate lights, darks, and delicates
                </li>
                <li>
                  <Clock size={18} aria-hidden />
                  Predictable turnaround you can plan around
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="ml-section ml-section--soft">
          <div className="ml-inner ml-gallery ml-gallery--duo">
            <figure className="ml-gallery-item">
              <img
                src={IMAGES.dhobiFolded}
                alt="Team member in uniform inspecting a finished shirt in a clear garment cover"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure className="ml-gallery-item">
              <img
                src={IMAGES.heroDhobiGhat}
                alt="Industrial laundry room with machines and fresh white linen in a cart"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="ml-section ml-okboys-pre-cta" aria-label="OkBoys pickup and drop">
          <div className="ml-inner">
            <div className="ml-okboys-promo">
              <p className="ml-okboys-promo-text">{OKBOYS_PROMO_BLURB}</p>
              <a
                href={OKBOYS_PLAY_STORE_URL}
                className="ml-okboys-promo-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                OkBoys on Google Play
              </a>
            </div>
          </div>
        </section>

        <section className="ml-cta-band">
          <div className="ml-inner ml-cta-inner">
            <div>
              <h2 className="ml-cta-title">Ready for fresher laundry?</h2>
              <p className="ml-cta-sub">Book in seconds. We will confirm pickup on WhatsApp.</p>
            </div>
            <div className="ml-cta-actions">
              <Link to="/order/service" className="ml-btn ml-btn--primary ml-btn--lg">
                Start your order
              </Link>
              <Link to="/home" className="ml-btn ml-btn--ghost ml-btn--lg">
                Open app home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="ml-footer">
        <div className="ml-inner ml-footer-inner">
          <div className="ml-footer-brand-block">
            <div className="ml-footer-brand-row">
              <span className="ml-wordmark ml-wordmark--footer">{BRAND_NAME}</span>
              <button
                type="button"
                className="ml-footer-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to top
              </button>
            </div>
            <p className="ml-footer-tag">Warm wash · careful fold · reliable pickup</p>
            <p className="ml-footer-domain">
              <a
                href={SITE_ORIGIN}
                className="ml-footer-domain-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE_DOMAIN}
              </a>
            </p>
          </div>
          <div className="ml-footer-aside">
            <address className="ml-footer-address">
              <span className="ml-footer-address-title">Address &amp; contact</span>
              <span className="ml-footer-address-body">
                <span className="ml-footer-establishment">{BUSINESS_OUTLET.establishmentName}</span>
                <br />
                {BUSINESS_OUTLET.line1}
                <br />
                {BUSINESS_OUTLET.line2}
                <br />
                {BUSINESS_OUTLET.line3}
                <br />
                {BUSINESS_OUTLET.line4}
                <br />
                {BUSINESS_OUTLET.state}
                {BUSINESS_OUTLET.pincode ? ` — ${BUSINESS_OUTLET.pincode}` : ""}
                <br />
                <span className="ml-footer-address-meta ml-footer-address-meta--phones">
                  <span className="ml-footer-address-label">Phones</span>
                  <br />
                  <a className="ml-footer-address-link" href={`tel:+${WHATSAPP_BUSINESS_E164}`}>
                    {WHATSAPP_BUSINESS_DISPLAY}
                  </a>
                  <br />
                  <a className="ml-footer-address-link" href={`tel:+${BUSINESS_PHONE_SECOND_E164}`}>
                    {BUSINESS_PHONE_SECOND_DISPLAY}
                  </a>
                </span>
                {BUSINESS_OUTLET.contactPerson ? (
                  <>
                    <br />
                    <span className="ml-footer-address-meta">
                      <span className="ml-footer-address-label">Contact</span>{" "}
                      {BUSINESS_OUTLET.contactPerson}
                    </span>
                  </>
                ) : null}
              </span>
            </address>
            <div className="ml-footer-hours">
              <span className="ml-footer-address-title">Opening hours</span>
              <dl className="ml-footer-hours-list">
                <div className="ml-footer-hours-row">
                  <dt>{BUSINESS_HOURS.weekdayDays}</dt>
                  <dd>{BUSINESS_HOURS.weekdayHours}</dd>
                </div>
                <div className="ml-footer-hours-row">
                  <dt>{BUSINESS_HOURS.weekendDays}</dt>
                  <dd>{BUSINESS_HOURS.weekendHours}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
