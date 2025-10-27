import { useEffect, useState } from "react";
import { marketplaceService, type MarketFilters } from "../services/marketplace/marketplaceService";
import type { MarketplaceItem } from "../components/common/types/marketplace";

function useDebounced<T>(value: T, ms: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export function useMarketplace(initial?: Partial<MarketFilters>) {
  const [filters, setFilters] = useState<MarketFilters>({
    q: "",
    platform: "Any",
    condition: "Any",
    maxPrice: null,
    savedOnly: false,
    sort: "recent",
    ...initial,
  });

  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounced(filters, 150);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    marketplaceService.list(debounced)
      .then(list => { if (alive) setItems(list); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [debounced]);

  async function toggleSaved(id: string) {
    const updated = await marketplaceService.toggleSaved(id);
    if (!updated) return;
    setItems(prev => prev.map(i => (i.id === id ? updated : i)));
  }

  async function addItem(input: Omit<MarketplaceItem, "id" | "createdAt">) {
    const created = await marketplaceService.create(input);
    setItems(prev => [created, ...prev]);
  }

  async function removeItem(id: string) {
    const ok = await marketplaceService.remove(id);
    if (ok) setItems(prev => prev.filter(i => i.id !== id));
  }

  return {
    filters,
    setFilters,
    items,
    loading,
    toggleSaved,
    addItem,
    removeItem,
  };
}
