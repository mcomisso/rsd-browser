# RSD Browser — Web App Spec

## Overview
A public-facing Next.js web app for browsing Record Store Day 2026 releases and finding participating stores. Deployed on Vercel.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- No database — all data from API

## API
Base URL: `https://myvinyls-django.fly.dev/api/rsd`

### Endpoints
- `GET /releases/?country=US&page=1&page_size=50` — paginated releases (fields: id, title, artist, label, format, color, size, country, image_url, release_notes)
- `GET /releases/countries/` — list of country codes with releases
- `GET /releases/stats/` — global stats (total_releases, countries_breakdown, etc.)
- `GET /releases/search/?q=laufey` — search releases
- `GET /stores/?country=US` — stores list (fields: id, name, address, city, country, postal_code, latitude, longitude, phone, website)
- `GET /stores/viewport/?sw_lat=X&sw_lng=X&ne_lat=X&ne_lng=X&limit=200` — stores in map bounds
- `GET /stores/nearby/?lat=X&lng=X&radius=50` — nearby stores
- `GET /stores/countries/` — list of country codes with stores
- `GET /stores/stats/` — store statistics
- `GET /availability/` — which countries have releases/stores

No auth required — these are public read-only endpoints.

## Pages

### 1. Home `/`
- Hero section: "Record Store Day 2026 — April 19" with vinyl-themed imagery
- Quick stats bar (total releases, countries, stores)
- Country selector (flags + names)
- Featured releases grid (first 6)
- "Find a Store" CTA → links to /stores
- "Browse Releases" CTA → links to /releases

### 2. Releases `/releases`
- Country filter dropdown (from /releases/countries/)
- Search bar
- Format filter (Vinyl, CD, Cassette)
- Grid/list toggle
- Cards: album art placeholder (use image_url if available, else vinyl icon), artist, title, label, format badge, color info
- Pagination (load more or infinite scroll)
- Click card → release detail modal/sheet

### 3. Stores `/stores`
- Interactive map (use Leaflet with OpenStreetMap — free, no API key)
- Country filter
- List view alongside map
- Store cards: name, address, city, website link, phone
- Click marker → store detail panel
- "Near me" button using browser geolocation
- Viewport-based loading (fetch stores as map pans)

### 4. About `/about`
- What is Record Store Day
- Link to recordstoreday.com
- "Powered by My Vinyl+" with App Store link (https://apple.co/41yJhHM)

## Design
- Dark theme with vinyl/record aesthetic (black, warm amber/gold accents)
- Responsive: mobile-first
- Vinyl record spinning animation on home hero
- Country flags via emoji
- Clean typography, no clutter
- Footer: "Made with ♥ by MCSoftware" + App Store badge

## Deployment
- Vercel (auto-deploy from GitHub)
- Repo: already initialized at this directory
- Remote: create on mcomisso GitHub org or personal

## Key Details
- No `.env` needed — API is public
- Use `next/image` for any images
- Server components where possible, client components for interactive bits (map, search, filters)
- Cache API responses with Next.js fetch cache (revalidate: 300 for releases, 3600 for stats)
