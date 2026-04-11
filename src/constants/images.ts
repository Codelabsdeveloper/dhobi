/** Prefix for files in /public (correct when app `base` is a subpath, e.g. GitHub Pages). */
function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}

/** Dhobi / washing themed photos in /public/images (add these files before deploy). */
export const IMAGES = {
  /** Mahalaxmi-style open-air dhobi ghat — laundry drying, sacks, open-air wash. */
  heroDhobiGhat: publicUrl("/images/hero-laundry.jpg"),
  /** Workers in a busy laundry (dhobi) workspace. */
  dhobiWorkers: publicUrl("/images/dhobi-workers.jpg"),
  /** Folded and stacked clothes at a laundry service. */
  dhobiFolded: publicUrl("/images/dhobi-folded.jpg"),
  /** Washing machine / tub — everyday washing step. */
  washingTub: publicUrl("/images/washing-tub.jpg"),
  /** Marketing hero — warm wash, machine care. */
  steamWashHero: publicUrl("/images/steam-wash-hero.jpg"),
} as const;
