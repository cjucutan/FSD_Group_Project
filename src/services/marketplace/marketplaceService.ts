import type { Listing } from "../../components/common/types/marketplace";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

export type ListingInput = {
  title: string;
  platform: string;
  price: number;
  note?: string;
};

async function fetchWithAuth(
  path: string,
  options: RequestInit = {},
  token?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}

export async function fetchListings(
  q: string,
  token?: string
): Promise<Listing[]> {
  const params = q ? `?q=${encodeURIComponent(q)}` : "";
  const json = await fetchWithAuth(
    `/marketplace/listings${params}`,
    { method: "GET" },
    token
  );
  return json.data as Listing[];
}

export async function createListing(
  input: ListingInput,
  token?: string
): Promise<Listing> {
  const json = await fetchWithAuth(
    `/marketplace/listings/create`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token
  );
  return json.data as Listing;
}
