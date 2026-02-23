"use client";

import type { Release } from "@/lib/types";

export default function ReleaseDetailModal({
  release,
  onClose,
}: {
  release: Release;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-zinc-800/80 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Art */}
        <div className="aspect-square w-full bg-zinc-800">
          {release.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={release.image_url}
              alt={`${release.artist} - ${release.title}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
              <svg className="h-32 w-32 text-zinc-700" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="3" />
                <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="5" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-zinc-100">{release.title}</h2>
          <p className="mt-1 text-lg text-amber-400">{release.artist}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Detail label="Label" value={release.label} />
            <Detail label="Format" value={release.display_format || release.format} />
            <Detail label="Countries" value={release.countries?.join(', ') || '—'} />
            <Detail label="Event" value={release.event_name} />
            {release.retail_price && (
              <Detail label="Price" value={release.retail_price} />
            )}
            {release.limited_edition && (
              <Detail label="Edition" value="Limited Edition" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-sm text-zinc-200">{value}</p>
    </div>
  );
}
