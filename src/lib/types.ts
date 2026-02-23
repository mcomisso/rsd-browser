export interface Release {
  id: number;
  musicbrainz_id: string | null;
  title: string;
  artist: string;
  label: string;
  format: string;
  display_format: string;
  limited_edition: boolean;
  retail_price: string | null;
  country: string;
  event_name: string;
  event_year: string;
  image_url: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  phone: string;
  website: string;
  is_participating: boolean;
}

export interface ReleaseStats {
  total_releases: number;
  vinyl_releases: number;
  cd_releases: number;
  cassette_releases: number;
  limited_editions: number;
  average_price: string | null;
  labels_count: number;
  events_count: number;
  countries_count: number;
  countries_breakdown: { country: string; count: number }[];
}

export interface StoreStats {
  total_stores: number;
  participating_stores: number;
  countries_count: number;
  cities_count: number;
  top_countries: { country: string; count: number }[];
}
