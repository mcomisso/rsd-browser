"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import type { Store } from "@/lib/types";
import CountrySelector from "@/components/CountrySelector";

const StoreMap = dynamic(() => import("./StoreMap"), { ssr: false });

const API = "/api/rsd";

export default function StoresClient({ countries }: { countries: string[] }) {
  const [country, setCountry] = useState("US");
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8, -98.6]);
  const [mapZoom, setMapZoom] = useState(4);

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${API}/stores/?country=${country}`;
      const res = await fetch(url);
      const data = await res.json();
      setStores(data);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }, [country]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Center map on country change
  useEffect(() => {
    const centers: Record<string, [number, number]> = {
      US: [39.8, -98.6],
      UK: [54.0, -2.0],
      CA: [56.0, -96.0],
      AU: [-25.0, 135.0],
      DE: [51.0, 10.0],
      FR: [46.0, 2.0],
      IT: [42.0, 12.0],
      JP: [36.0, 138.0],
      NL: [52.0, 5.0],
      NETHERLANDS: [52.0, 5.0],
      BE: [50.5, 4.5],
      HU: [47.0, 19.0],
      TW: [23.5, 121.0],
      AT: [47.5, 14.5],
      CH: [46.8, 8.2],
      IE: [53.0, -8.0],
    };
    setMapCenter(centers[country] || [39.8, -98.6]);
    setMapZoom(country === "US" || country === "CA" || country === "AU" ? 4 : 6);
  }, [country]);

  const [locating, setLocating] = useState(false);

  function handleNearMe() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapCenter([latitude, longitude]);
        setMapZoom(10);
        try {
          const url = `${API}/stores/nearby/?lat=${latitude}&lng=${longitude}&radius=50`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("API error");
          const data = await res.json();
          setStores(Array.isArray(data) ? data : []);
        } catch {
          // Keep existing stores on error
        } finally {
          setLocating(false);
        }
      },
      () => {
        // Geolocation denied or failed
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="flex w-full flex-col border-b border-zinc-800 bg-zinc-900/50 lg:w-96 lg:border-b-0 lg:border-r">
        <div className="flex flex-col gap-3 border-b border-zinc-800 p-4">
          <h1 className="text-xl font-bold text-zinc-100">Stores</h1>
          <CountrySelector
            countries={countries}
            selected={country}
            onChange={setCountry}
          />
          <button
            onClick={handleNearMe}
            disabled={locating}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locating ? (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            {locating ? "Locating..." : "Near Me"}
          </button>
          <p className="text-xs text-zinc-500">
            {loading ? "Loading..." : `${stores.length} stores found`}
          </p>
        </div>

        {/* Store list */}
        <div className="flex-1 overflow-y-auto">
          {stores.slice(0, 100).map((store) => (
            <button
              key={store.id}
              onClick={() => {
                setSelectedStore(store);
                setMapCenter([store.latitude, store.longitude]);
                setMapZoom(14);
              }}
              className={`w-full border-b border-zinc-800 p-4 text-left transition-colors hover:bg-zinc-800/50 ${
                selectedStore?.id === store.id ? "bg-amber-500/5 border-l-2 border-l-amber-500" : ""
              }`}
            >
              <p className="font-medium text-zinc-200">{store.name}</p>
              <p className="mt-0.5 text-sm text-zinc-500">
                {store.address}, {store.city}
              </p>
              <div className="mt-2 flex items-center gap-3">
                {store.website && (
                  <a
                    href={store.website.startsWith("http") ? store.website : `https://${store.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    Website
                  </a>
                )}
                {store.phone && (
                  <a
                    href={`tel:${store.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-zinc-400 hover:text-zinc-300"
                  >
                    {store.phone}
                  </a>
                )}
              </div>
            </button>
          ))}
          {stores.length > 100 && (
            <p className="p-4 text-center text-xs text-zinc-500">
              Showing first 100 of {stores.length} stores. Zoom the map to see more.
            </p>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 min-h-[300px]">
        <StoreMap
          stores={stores}
          center={mapCenter}
          zoom={mapZoom}
          selectedStore={selectedStore}
          onSelectStore={setSelectedStore}
        />
      </div>
    </div>
  );
}
