/** DoBiWash business WhatsApp — digits only, no + (host / sender identity in copy). */
export const WHATSAPP_BUSINESS_E164 = "919620554794";

/** Same number for display inside messages. */
export const WHATSAPP_BUSINESS_DISPLAY = "+91 9620554794";

/** Physical outlet / footer — edit to match your real shop details. */
export const BUSINESS_OUTLET = {
  shopNumber: "Shop No. 12, Ground Floor",
  street: "Karve Road",
  crossLandmark: "Opp. Kothrud Bus Stand · Near City Pride",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411038",
  contactPerson: "Arun Patil",
} as const;

/** Shop opening hours (footer). */
export const BUSINESS_HOURS = {
  weekdayDays: "Mon – Fri",
  weekdayHours: "9:00 am – 9:00 pm",
  weekendDays: "Sat – Sun",
  weekendHours: "9:00 am – 2:00 pm",
} as const;
