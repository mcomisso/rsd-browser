import Link from "next/link";
import VinylSpinner from "@/components/VinylSpinner";

export const metadata = {
  title: "About — RSD Browser",
  description: "About Record Store Day and this app",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-12 flex justify-center">
        <VinylSpinner size={120} />
      </div>

      <h1 className="text-center text-3xl font-bold text-zinc-100 sm:text-4xl">
        About Record Store Day
      </h1>

      <div className="mt-8 space-y-6 text-zinc-400 leading-relaxed">
        <p>
          Record Store Day was conceived in 2007 at a gathering of independent record store
          owners and employees as a way to celebrate and spread the word about the unique
          culture surrounding independently owned record stores. The first Record Store Day
          took place on April 19, 2008.
        </p>

        <p>
          Today, Record Store Day is celebrated on one day each April at thousands of
          independent record stores worldwide. Special vinyl and CD releases are made
          exclusively for the day, and events like live performances, meet-and-greets,
          and in-store celebrations bring communities together.
        </p>

        <p>
          Record Store Day 2026 will be celebrated on{" "}
          <span className="font-semibold text-amber-400">April 19, 2026</span>.
        </p>

        <div className="flex justify-center pt-4">
          <Link
            href="https://recordstoreday.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
          >
            Visit recordstoreday.com
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Powered by */}
      <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
        <p className="text-sm text-zinc-500">Powered by</p>
        <p className="mt-2 text-2xl font-bold text-zinc-100">
          My Vinyl<span className="text-amber-400">+</span>
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          The ultimate app for vinyl collectors and Record Store Day enthusiasts.
        </p>
        <div className="mt-6">
          <Link
            href="https://apple.co/41yJhHM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download on the App Store
          </Link>
        </div>
      </div>
    </div>
  );
}
