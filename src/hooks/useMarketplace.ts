import { useCallback, useEffect, useMemo, useState } from "react";
import * as svc from "../services/marketplace/marketplaceService";
import type { ListingDto } from "../apis/marketplace/marketplaceRepo";

export function useMarketplace(searchQuery?: string) {
  const [listings, setListings] = useState<ListingDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (q?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await svc.fetchListings(q);
      setListings(data);
    } catch (e) {
      setError((e as Error).message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(searchQuery); }, [load, searchQuery]);

  const filtered = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return listings;
    return listings.filter(l =>
      [l.title, l.platform, String(l.price), l.note ?? ""].join(" ").toLowerCase().includes(q)
    );
  }, [listings, searchQuery]);

  const add = async (input: Omit<ListingDto, "id" | "dateCreated">) => {
    const created = await svc.addListing(input);
    setListings(prev => [created, ...prev]);
  };

  const remove = async (id: string) => {
    await svc.removeListing(id);
    setListings(prev => prev.filter(l => l.id !== id));
  };

  return { listings, filtered, loading, error, add, remove, reload: () => load(searchQuery) };
}
