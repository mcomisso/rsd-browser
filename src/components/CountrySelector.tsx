"use client";

import { getCountryFlag, getCountryName } from "@/lib/countries";

export default function CountrySelector({
  countries,
  selected,
  onChange,
  label = "Country",
}: {
  countries: string[];
  selected: string;
  onChange: (country: string) => void;
  label?: string;
}) {
  return (
    <div className="relative">
      <label className="mb-1 block text-xs font-medium text-zinc-500">{label}</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 pr-10 text-sm text-zinc-200 transition-colors hover:border-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      >
        <option value="">All Countries</option>
        {countries.map((code) => (
          <option key={code} value={code}>
            {getCountryFlag(code)} {getCountryName(code)}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 bottom-2.5 h-4 w-4 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
