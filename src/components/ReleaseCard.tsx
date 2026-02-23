import type { Release } from "@/lib/types";

const FORMAT_COLORS: Record<string, string> = {
  vinyl: "bg-amber-500/20 text-amber-400",
  cd: "bg-blue-500/20 text-blue-400",
  cassette: "bg-purple-500/20 text-purple-400",
};

export default function ReleaseCard({
  release,
  onClick,
}: {
  release: Release;
  onClick?: () => void;
}) {
  const formatClass = FORMAT_COLORS[release.format] || "bg-zinc-700 text-zinc-300";

  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 text-left transition-all hover:border-amber-500/30 hover:bg-zinc-800/50"
    >
      {/* Album Art Area */}
      <div className="relative aspect-square w-full bg-zinc-800">
        {release.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={release.image_url}
            alt={`${release.artist} - ${release.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <svg
              className="h-16 w-16 text-zinc-700 transition-transform group-hover:scale-110"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="3" />
              <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="5" fill="currentColor" />
              {[60, 75].map((r) => (
                <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              ))}
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="truncate text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
          {release.title}
        </p>
        <p className="truncate text-sm text-zinc-400">{release.artist}</p>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${formatClass}`}>
            {release.display_format || release.format}
          </span>
          <span className="text-xs text-zinc-500">{release.label}</span>
        </div>
      </div>
    </button>
  );
}
