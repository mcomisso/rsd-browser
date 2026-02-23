import Link from "next/link";
import VinylSpinner from "@/components/VinylSpinner";
import { getReleaseStats, getReleases, getStoreStats, getReleaseCountries } from "@/lib/api";
import { getCountryFlag, getCountryName } from "@/lib/countries";
import ReleaseCard from "@/components/ReleaseCard";

export default async function HomePage() {
  const [releaseStats, storeStats, featured, countries] = await Promise.all([
    getReleaseStats(),
    getStoreStats(),
    getReleases(undefined, 1, 6),
    getReleaseCountries(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.05),transparent_70%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 sm:px-6 md:flex-row md:py-28">
          <div className="flex-1 text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500">
              April 19, 2026
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Record Store Day
              <span className="block text-amber-400">2026</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-zinc-400">
              Explore {releaseStats.total_releases.toLocaleString()} exclusive releases from{" "}
              {releaseStats.countries_count} countries. Find a participating store near you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="/releases"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
              >
                Browse Releases
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/stores"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-amber-500/50 hover:text-amber-400"
              >
                Find a Store
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <VinylSpinner size={280} />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
          <StatCard label="Releases" value={releaseStats.total_releases.toLocaleString()} />
          <StatCard label="Countries" value={String(releaseStats.countries_count)} />
          <StatCard label="Stores" value={storeStats.total_stores.toLocaleString()} />
          <StatCard label="Labels" value={String(releaseStats.labels_count)} />
        </div>
      </section>

      {/* Country Selector */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-xl font-bold text-zinc-100">Browse by Country</h2>
        <div className="flex flex-wrap gap-2">
          {countries.map((code) => (
            <Link
              key={code}
              href={`/releases?country=${code}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-amber-500/50 hover:text-amber-400"
            >
              <span>{getCountryFlag(code)}</span>
              {getCountryName(code)}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Releases */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-100">Featured Releases</h2>
          <Link
            href="/releases"
            className="text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featured.results.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-6">
      <p className="text-2xl font-bold text-amber-400 sm:text-3xl">{value}</p>
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  );
}
