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

export async function getAllListings(): Promise<ListingDto[]> {
  const res = await fetch(`${BASE}/marketplace/listings`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  const json = await res.json();
  return json.data as ListingDto[];
}

export async function createListing(payload: CreateListingDto): Promise<ListingDto> {
  const res = await fetch(`${BASE}/marketplace/listings/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create listing");
  const json = await res.json();
  return json.data as ListingDto;
}

export async function deleteListing(id: string): Promise<void> {
  const res = await fetch(`${BASE}/marketplace/listings/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete listing");
}
