import i18n from '../i18n';

// Define the function with TypeScript annotations
export function dateText(dateStr: string, type: "long" | "short" = "long"): string {
  const date = new Date(dateStr);
  const locale = i18n.language; // Fetching the current language set in i18n

  // Define options for Intl.DateTimeFormat
  const optionsLong: Intl.DateTimeFormatOptions = {
    month: "long", // "March" or "Marzo"
    day: "2-digit", // "27"
    year: "numeric", // "2024"
    hour: "2-digit", // "23" (for 11 PM)
    minute: "2-digit", // "52"
    hourCycle: 'h23', // Use 24-hour cycle
  };

  const optionsShort: Intl.DateTimeFormatOptions = {
    month: "short", // "Mar" or "Mar."
    day: "2-digit", // "27"
    year: "numeric", // "2024"
  };

  // Choose options based on type
  const options = type === "long" ? optionsLong : optionsShort;

  // Format date based on current locale and selected options
  const readable = new Intl.DateTimeFormat(locale, options).format(date);

  return readable; // Outputs based on type, e.g., "March 27, 2024, 23:52" or "27 Mar 2024"
}
