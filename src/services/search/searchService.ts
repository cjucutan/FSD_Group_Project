import type { Game } from "../../components/common/types/games";
import { searchRepo, type SearchFilters } from "../../apis/search/searchRepo";

function norm(v: unknown) {
  return String(v ?? "").trim().toLowerCase();
}

export async function searchGames(filters: SearchFilters): Promise<Game[]> {
  const all = await searchRepo.getAll();
  const q = norm(filters.query);

  const byQuery = q
    ? all.filter(g => {
        const hay = `${g.gameName} ${g.genre} ${g.platform} ${g.developer}`.toLowerCase();
        return hay.includes(q);
      })
    : all;

  const byGenre = filters.genres?.length
    ? byQuery.filter(g => g.genre ? filters.genres!.map(norm).includes(norm(g.genre)) : false)
    : byQuery;

  const byPlatform = filters.platforms?.length
    ? byGenre.filter(g => g.platform ? filters.platforms!.includes(g.platform) : false)
    : byGenre;

  return byPlatform;
}

export async function addGame(game: Game) {
  if (!game.id || !game.gameName) throw new Error("id and gameName are required");
  return searchRepo.create(game);
}

export async function updateGame(id: string, patch: Partial<Game>) {
  if (!id) throw new Error("id required");
  return searchRepo.update(id, patch);
}

export async function deleteGame(id: string) {
  if (!id) throw new Error("id required");
  return searchRepo.remove(id);
}
