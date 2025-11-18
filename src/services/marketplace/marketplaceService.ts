import * as repo from "../../apis/marketplace/marketplaceRepo";
import type { CreateListingDto, ListingDto } from "../../apis/marketplace/marketplaceRepo";

export async function fetchListings(q?: string): Promise<ListingDto[]> {
  return repo.getAllListings(q);
}

export async function addListing(input: CreateListingDto): Promise<ListingDto> {
  return repo.createListing(input);
}

export async function removeListing(id: string): Promise<void> {
  return repo.deleteListing(id);
}
