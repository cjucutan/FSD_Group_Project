export type MarketCondition = "New" | "Used" | "Digital";
export type MarketPlatform = "PC" | "PS5" | "Xbox" | "Switch" | "Any";

export interface MarketplaceItem {
  id: string;
  title: string;
  platform: MarketPlatform;
  price: number;
  condition: MarketCondition;
  seller: string;
  image: string;
  description: string;
  saved?: boolean;
  createdAt: string;
}
