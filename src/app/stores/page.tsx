import { getStoreCountries } from "@/lib/api";
import StoresClient from "./StoresClient";

export const metadata = {
  title: "Stores — RSD Browser",
  description: "Find Record Store Day 2026 participating stores near you",
};

export default async function StoresPage() {
  const countries = await getStoreCountries();
  return <StoresClient countries={countries} />;
}
