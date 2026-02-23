"use client";

import { useState, useEffect, useCallback } from "react";
import type { Release } from "@/lib/types";
import ReleaseCard from "@/components/ReleaseCard";
import ReleaseDetailModal from "@/components/ReleaseDetailModal";
import CountrySelector from "@/components/CountrySelector";

const PAGE_SIZE = 24;
const API = "/api/rsd";

export default function ReleasesClient({
  countries,
  initialCountry,
  initialQuery,
}: {
  countries: string[];
  initialCountry: string;
  initialQuery: string;
}) {
  const [country, setCountry] = useState(initialCountry);
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [format, setFormat] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [releases, setReleases] = useState<Release[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchReleases = useCallback(async (p: number, append: boolean) => {
    setLoading(true);
    try {
      let url: string;
      if (debouncedQuery) {
        url = `${API}/releases/search/?q=${encodeURIComponent(debouncedQuery)}&page=${p}&page_size=${PAGE_SIZE}`;
      } else {
        url = `${API}/releases/?page=${p}&page_size=${PAGE_SIZE}`;
        if (country) url += `&country=${country}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      let results: Release[] = data.results || [];

      if (format) {
        results = results.filter((r: Release) => r.format === format);
      }

      setTotal(data.count || 0);
      setReleases(append ? (prev) => [...prev, ...results] : results);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }, [country, debouncedQuery, format]);

  useEffect(() => {
    setPage(1);
    fetchReleases(1, false);
  }, [fetchReleases]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchReleases(next, true);
  }

  const hasMore = releases.length < total;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold text-zinc-100">Releases</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-zinc-500">Search</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artist, title, label..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div className="w-full sm:w-48">
          <CountrySelector
            countries={countries}
            selected={country}
            onChange={(c) => { setCountry(c); setQuery(""); }}
          />
        </div>
        <div className="w-full sm:w-40">
          <label className="mb-1 block text-xs font-medium text-zinc-500">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full appearance-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-200 transition-colors hover:border-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="">All Formats</option>
            <option value="vinyl">Vinyl</option>
            <option value="cd">CD</option>
            <option value="cassette">Cassette</option>
          </select>
        </div>
        {/* View toggle */}
        <div className="flex gap-1 rounded-lg border border-zinc-700 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "grid" ? "bg-amber-500/20 text-amber-400" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "list" ? "bg-amber-500/20 text-amber-400" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="mb-4 text-sm text-zinc-500">
        {loading && releases.length === 0 ? "Loading..." : `${total.toLocaleString()} releases found`}
      </p>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {releases.map((release) => (
            <ReleaseCard
              key={release.id}
              release={release}
              onClick={() => setSelectedRelease(release)}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-2">
          {releases.map((release) => (
            <button
              key={release.id}
              onClick={() => setSelectedRelease(release)}
              className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-left transition-colors hover:border-amber-500/30 hover:bg-zinc-800/50"
            >
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                {release.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={release.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-600">
                    <svg className="h-6 w-6" viewBox="0 0 200 200" fill="none">
                      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="4" />
                      <circle cx="100" cy="100" r="5" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-100">{release.title}</p>
                <p className="truncate text-xs text-zinc-400">{release.artist} &middot; {release.label}</p>
              </div>
              <span className="flex-shrink-0 rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
                {release.display_format || release.format}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && releases.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-zinc-500">No releases found</p>
          <p className="mt-1 text-sm text-zinc-600">Try a different search or country</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedRelease && (
        <ReleaseDetailModal
          release={selectedRelease}
          onClose={() => setSelectedRelease(null)}
        />
      )}
    </div>
  );
}
