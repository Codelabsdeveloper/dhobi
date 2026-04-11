/** Digits only, with leading 91 for India when possible. */
export function normalizeIndiaMsisdn(input: string): string {
  const d = input.replace(/\D/g, "");
  if (d.length === 10) return `91${d}`;
  if (d.length === 12 && d.startsWith("91")) return d;
  if (d.length === 11 && d.startsWith("0")) return `91${d.slice(1)}`;
  return d;
}

/** Human-friendly +91 display for order text. */
export function formatIndiaPhoneDisplay(input: string): string {
  const raw = input.trim();
  if (!raw) return "—";
  const d = normalizeIndiaMsisdn(raw);
  if (d.length >= 12 && d.startsWith("91")) {
    return `+91 ${d.slice(2)}`;
  }
  if (d.length === 10) {
    return `+91 ${d}`;
  }
  return raw;
}

/** Rough check for Indian mobile (10 digits, or 91 + 10 digits). */
export function isValidIndiaMobile(input: string): boolean {
  const d = normalizeIndiaMsisdn(input);
  const national = d.startsWith("91") && d.length === 12 ? d.slice(2) : d.length === 10 ? d : "";
  return national.length === 10 && /^[6-9]\d{9}$/.test(national);
}
