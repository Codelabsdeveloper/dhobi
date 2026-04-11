import { Link } from "react-router-dom";
import { Droplets, Flame, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { IMAGES } from "../constants/images";

export function MarketingLandingPage() {
  return (
    <div className="marketing-root" id="top">
      <header className="ml-nav">
        <Link to="/" className="ml-wordmark">
          DoBiWash
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
                <Link to="/home" className="ml-btn ml-btn--line">
                  View price list
                </Link>
              </div>
            </div>
            <figure className="ml-hero-figure">
              <img
                src={IMAGES.steamWashHero}
                alt="Washing machine running a warm, deep-clean cycle"
                width={1600}
                height={1067}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

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
                alt="Laundry team sorting and washing garments"
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
          <div className="ml-inner ml-gallery">
            <figure className="ml-gallery-item ml-gallery-item--tall">
              <img
                src={IMAGES.dhobiFolded}
                alt="Neatly folded stacks of finished laundry"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Pressed &amp; folded</figcaption>
            </figure>
            <figure className="ml-gallery-item">
              <img
                src={IMAGES.heroDhobiGhat}
                alt="Laundry washing and drying in the open air"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Open-air finishing</figcaption>
            </figure>
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
          <span className="ml-wordmark ml-wordmark--footer">DoBiWash</span>
          <p className="ml-footer-tag">Warm wash · careful fold · reliable pickup</p>
          <button
            type="button"
            className="ml-footer-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}
