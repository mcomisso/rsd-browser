import { getReleaseCountries } from "@/lib/api";
import ReleasesClient from "./ReleasesClient";

export const metadata = {
  title: "Releases — RSD Browser",
  description: "Browse Record Store Day 2026 releases",
};

export default async function ReleasesPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; q?: string }>;
}) {
  const params = await searchParams;
  const countries = await getReleaseCountries();

  return (
    <ReleasesClient
      countries={countries}
      initialCountry={params.country || ""}
      initialQuery={params.q || ""}
    />
  );
}
