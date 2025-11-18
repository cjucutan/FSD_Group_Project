const BASE = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export type ListingDto = {
  id: string;
  title: string;
  platform: string;
  price: number;
  note?: string;
  dateCreated?: string;
};

export type CreateListingDto = Omit<ListingDto, "id" | "dateCreated">;

export async function getAllListings(q?: string): Promise<ListingDto[]> {
  const url = new URL(`${BASE}/marketplace/listings`);
  if (q && q.trim()) url.searchParams.set("q", q.trim());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch listings");
  const json = await res.json();
  return json.data as ListingDto[];
}

export async function createListing(payload: CreateListingDto): Promise<ListingDto> {
  const res = await fetch(`${BASE}/marketplace/listings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create listing");
  const json = await res.json();
  return json.data as ListingDto;
}

export async function deleteListing(id: string): Promise<void> {
  const res = await fetch(`${BASE}/marketplace/listings/delete/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete listing");
}
