"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Store } from "@/lib/types";

// Custom marker icon
const storeIcon = new L.Icon({
  iconUrl: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="24" height="32">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="#f59e0b"/>
      <circle cx="12" cy="11" r="5" fill="#18181b"/>
    </svg>
  `),
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32],
});

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  const prevCenter = useRef(center);
  const prevZoom = useRef(zoom);

  useEffect(() => {
    if (prevCenter.current[0] !== center[0] || prevCenter.current[1] !== center[1] || prevZoom.current !== zoom) {
      map.flyTo(center, zoom, { duration: 1 });
      prevCenter.current = center;
      prevZoom.current = zoom;
    }
  }, [map, center, zoom]);

  return null;
}

export default function StoreMap({
  stores,
  center,
  zoom,
  selectedStore,
  onSelectStore,
}: {
  stores: Store[];
  center: [number, number];
  zoom: number;
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
}) {
  // Limit markers for performance
  const visibleStores = stores.slice(0, 500);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapController center={center} zoom={zoom} />
      {visibleStores.map((store) => (
        <Marker
          key={store.id}
          position={[store.latitude, store.longitude]}
          icon={storeIcon}
          eventHandlers={{
            click: () => onSelectStore(store),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <p className="font-bold text-zinc-100">{store.name}</p>
              <p className="mt-1 text-sm text-zinc-400">
                {store.address}<br />{store.city} {store.postal_code}
              </p>
              <div className="mt-2 flex gap-3">
                {store.website && (
                  <a
                    href={store.website.startsWith("http") ? store.website : `https://${store.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-amber-400"
                  >
                    Website
                  </a>
                )}
                {store.phone && (
                  <a href={`tel:${store.phone}`} className="text-xs text-zinc-400">
                    {store.phone}
                  </a>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
