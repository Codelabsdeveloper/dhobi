/** Brand shown in the app, WhatsApp copy, and page titles. */
export const BRAND_NAME = "Dobiwash";

/** Public website hostname (no scheme). */
export const SITE_DOMAIN = "dobiwash.com";

/** Canonical site URL for links and meta. */
export const SITE_ORIGIN = `https://${SITE_DOMAIN}` as const;

/** Pickup / delivery localities (marketing landing + app home). */
export const SERVICE_AREAS_BLURB =
  "Presently available in Yapral, Sainikpuri, Dr. A.S. Rao Nagar, Balaji Nagar, Shaili Gardens.";

/** Google Play — OkBoys app (pickup & drop). */
export const OKBOYS_PLAY_STORE_URL =
  "https://play.google.com/store/search?q=okboys&c=apps&hl=en_IN" as const;

/** Shown next to Play Store link on home + marketing footer. */
export const OKBOYS_PROMO_BLURB =
  'To book pick up and drop you can also use the "OkBoys" application.';

/** Dobiwash business WhatsApp — digits only, no + (host / sender identity in copy). */
export const WHATSAPP_BUSINESS_E164 = "919100163776";

/** Same number for display inside messages. */
export const WHATSAPP_BUSINESS_DISPLAY = "+91 9100163776";

/** Second business line for calls (digits only, +91). Shown in footer with primary number. */
export const BUSINESS_PHONE_SECOND_E164 = "919347018406";

/** Display form for second line. */
export const BUSINESS_PHONE_SECOND_DISPLAY = "+91 9347018406";

/** Physical outlet / footer — matches shop registration (A1 Laundry Shop). */
export const BUSINESS_OUTLET = {
  establishmentName: "A1 LAUNDRY SHOP",
  line1: "01-05, Jyothi Nagar Colony",
  line2: "Behind Ram Mandir, Balaji Nagar",
  line3: "Shameerpet, Medchal",
  line4: "(Malkajgiri), Alwal, Yapral",
  state: "Telangana",
  /** Leave empty to hide in footer when unknown */
  pincode: "",
  /** Leave empty to hide the contact line */
  contactPerson: "",
} as const;

/** Shop opening hours (footer). */
export const BUSINESS_HOURS = {
  weekdayDays: "Mon – Fri",
  weekdayHours: "9:00 am – 9:00 pm",
  weekendDays: "Sat – Sun",
  weekendHours: "9:00 am – 2:00 pm",
} as const;
