import { marketplaceRepo } from "../../apis/marketplace/marketplaceRepo";
import type { MarketplaceItem, MarketPlatform, MarketCondition } from "../../components/common/types/marketplace";

export type MarketFilters = {
  q?: string;
  platform?: MarketPlatform | "Any";
  condition?: MarketCondition | "Any";
  maxPrice?: number | null;
  savedOnly?: boolean;
  sort?: "recent" | "priceAsc" | "priceDesc";
};

function matches(item: MarketplaceItem, f: MarketFilters) {
  if (f.savedOnly && !item.saved) return false;
  if (f.platform && f.platform !== "Any" && item.platform !== f.platform) return false;
  if (f.condition && f.condition !== "Any" && item.condition !== f.condition) return false;
  if (typeof f.maxPrice === "number" && item.price > f.maxPrice) return false;

  const q = (f.q ?? "").trim().toLowerCase();
  if (q) {
    const hay = `${item.title} ${item.description} ${item.seller}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function sort(items: MarketplaceItem[], how: MarketFilters["sort"]) {
  if (how === "priceAsc") return [...items].sort((a, b) => a.price - b.price);
  if (how === "priceDesc") return [...items].sort((a, b) => b.price - a.price);
  return [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

async function list(filters: MarketFilters): Promise<MarketplaceItem[]> {
  const all = await marketplaceRepo.getAll();
  const filtered = all.filter(i => matches(i, filters));
  return sort(filtered, filters.sort ?? "recent");
}

async function toggleSaved(id: string): Promise<MarketplaceItem | undefined> {
  const item = await marketplaceRepo.getById(id);
  if (!item) return undefined;
  return marketplaceRepo.update(id, { saved: !item.saved });
}

async function create(input: Omit<MarketplaceItem, "id" | "createdAt">) {
  return marketplaceRepo.create(input);
}

async function remove(id: string) {
  return marketplaceRepo.remove(id);
}

export const marketplaceService = {
  list,
  toggleSaved,
  create,
  remove,
};
