/**
 * Business WhatsApp — digits only for wa.me / APIs.
 * Override at build time with VITE_WHATSAPP_BUSINESS_E164 (digits only, no +).
 */
const e164FromEnv = import.meta.env.VITE_WHATSAPP_BUSINESS_E164?.replaceAll(/\D/g, "").trim();
export const WHATSAPP_BUSINESS_E164 = e164FromEnv || "919620554794";

/**
 * Human-readable number for UI copy.
 * Override with VITE_WHATSAPP_BUSINESS_DISPLAY (e.g. +91 98765 43210).
 */
export const WHATSAPP_BUSINESS_DISPLAY =
  import.meta.env.VITE_WHATSAPP_BUSINESS_DISPLAY?.trim() || "+91 9620554794";
