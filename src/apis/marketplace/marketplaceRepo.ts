import { MARKETPLACE_TESTDATA } from "../../components/data/mockMarketPlace";
import type { MarketplaceItem } from "../../components/common/types/marketplace";

const LS_KEY = "marketplaceItems";

function read(): MarketplaceItem[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    localStorage.setItem(LS_KEY, JSON.stringify(MARKETPLACE_TESTDATA));
    return MARKETPLACE_TESTDATA;
  }
  try {
    return JSON.parse(raw) as MarketplaceItem[];
  } catch {
    localStorage.setItem(LS_KEY, JSON.stringify(MARKETPLACE_TESTDATA));
    return MARKETPLACE_TESTDATA;
  }
}

function write(items: MarketplaceItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

async function getAll(): Promise<MarketplaceItem[]> {
  return read();
}

async function getById(id: string): Promise<MarketplaceItem | undefined> {
  return read().find(i => i.id === id);
}

async function create(item: Omit<MarketplaceItem, "id" | "createdAt">): Promise<MarketplaceItem> {
  const items = read();
  const newItem: MarketplaceItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  write(items);
  return newItem;
}

async function update(id: string, patch: Partial<MarketplaceItem>): Promise<MarketplaceItem | undefined> {
  const items = read();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return undefined;
  items[idx] = { ...items[idx], ...patch };
  write(items);
  return items[idx];
}

async function remove(id: string): Promise<boolean> {
  const items = read();
  const next = items.filter(i => i.id !== id);
  write(next);
  return next.length !== items.length;
}

export const marketplaceRepo = {
  getAll,
  getById,
  create,
  update,
  remove,
};
