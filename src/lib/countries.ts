const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  UK: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  JP: "Japan",
  NL: "Netherlands",
  NETHERLANDS: "Netherlands",
  BE: "Belgium",
  HU: "Hungary",
  TW: "Taiwan",
  AT: "Austria",
  CH: "Switzerland",
  IE: "Ireland",
  IM: "Isle of Man",
  JE: "Jersey",
};

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸",
  GB: "🇬🇧",
  UK: "🇬🇧",
  CA: "🇨🇦",
  AU: "🇦🇺",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IT: "🇮🇹",
  JP: "🇯🇵",
  NL: "🇳🇱",
  NETHERLANDS: "🇳🇱",
  BE: "🇧🇪",
  HU: "🇭🇺",
  TW: "🇹🇼",
  AT: "🇦🇹",
  CH: "🇨🇭",
  IE: "🇮🇪",
  IM: "🇮🇲",
  JE: "🇯🇪",
};

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code] || code;
}

export function getCountryFlag(code: string): string {
  return COUNTRY_FLAGS[code] || "🏳️";
}
