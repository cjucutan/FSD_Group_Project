import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as marketplaceService from "../services/marketplace/marketplaceService";
import type { Listing } from "../components/common/types/marketplace";

export function useMarketplace(searchQuery: string) {
  const { isSignedIn, getToken } = useAuth();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!isSignedIn) {
        setListings([]);
        setError("You must be signed in to view listings.");
        return;
      }

      setLoading(true);
      try {
        const token = await getToken();
        const data = await marketplaceService.fetchListings(
          searchQuery,
          token ?? undefined
        );
        setListings(data);
        setError(null);
      } catch {
        setError("Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [searchQuery, isSignedIn, getToken]);

  const add = async (input: {
    title: string;
    platform: string;
    price: number;
    note?: string;
  }) => {
    if (!isSignedIn) {
      setError("You must be signed in to add a listing.");
      return;
    }

    try {
      const token = await getToken();
      const created = await marketplaceService.createListing(
        input,
        token ?? undefined
      );
      setListings((prev) => [created, ...prev]);
      setError(null);
    } catch {
      setError("Failed to create listing.");
    }
  };

  const remove = async (_id: string) => {
  };

  return { listings, loading, error, add, remove };
}
