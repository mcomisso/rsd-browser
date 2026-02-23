import type {
  Release,
  Store,
  PaginatedResponse,
  ReleaseStats,
  StoreStats,
} from "./types";

const BASE_URL = "https://myvinyls-django.fly.dev/api/rsd";

async function fetchAPI<T>(
  path: string,
  params?: Record<string, string | number>,
  revalidate: number = 300
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  const res = await fetch(url.toString(), { next: { revalidate } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getReleases(
  country?: string,
  page: number = 1,
  pageSize: number = 24
): Promise<PaginatedResponse<Release>> {
  const params: Record<string, string | number> = {
    page,
    page_size: pageSize,
  };
  if (country) params.country = country;
  return fetchAPI("/releases/", params);
}

export async function searchReleases(
  query: string,
  page: number = 1,
  pageSize: number = 24
): Promise<PaginatedResponse<Release>> {
  return fetchAPI("/releases/search/", { q: query, page, page_size: pageSize });
}

export async function getReleaseCountries(): Promise<string[]> {
  return fetchAPI("/releases/countries/", {}, 3600);
}

export async function getReleaseStats(): Promise<ReleaseStats> {
  return fetchAPI("/releases/stats/", {}, 3600);
}

export async function getStores(
  country?: string
): Promise<Store[]> {
  const params: Record<string, string | number> = {};
  if (country) params.country = country;
  return fetchAPI("/stores/", params);
}

export async function getStoresViewport(
  sw_lat: number,
  sw_lng: number,
  ne_lat: number,
  ne_lng: number,
  limit: number = 200
): Promise<Store[]> {
  return fetchAPI("/stores/viewport/", {
    sw_lat,
    sw_lng,
    ne_lat,
    ne_lng,
    limit,
  });
}

export async function getStoresNearby(
  lat: number,
  lng: number,
  radius: number = 50
): Promise<Store[]> {
  return fetchAPI("/stores/nearby/", { lat, lng, radius });
}

export async function getStoreCountries(): Promise<string[]> {
  return fetchAPI("/stores/countries/", {}, 3600);
}

export async function getStoreStats(): Promise<StoreStats> {
  return fetchAPI("/stores/stats/", {}, 3600);
}
