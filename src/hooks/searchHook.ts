import { useCallback, useEffect, useMemo, useState } from "react";
import type { Game } from "../components/common/types/games";
import { addGame, deleteGame, searchGames, updateGame } from "../services/search/searchService";

type Platform = Game["platform"];

export function useSearch(initial?: {
  query?: string;
  genres?: string[];
  platforms?: Platform[];
  auto?: boolean;
}) {
  const [query, setQuery] = useState(initial?.query ?? "");
  const [genres, setGenres] = useState<string[]>(initial?.genres ?? []);
  const [platforms, setPlatforms] = useState<Platform[]>(initial?.platforms ?? []);
  const [results, setResults] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(() => ({ query, genres, platforms }), [query, genres, platforms]);

  const run = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchGames(filters);
      setResults(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (initial?.auto === false) return;
    void run();
  }, [run, initial?.auto]);

  const create = useCallback(async (g: Game) => { await addGame(g); await run(); }, [run]);
  const patch  = useCallback(async (id: string, p: Partial<Game>) => { await updateGame(id, p); await run(); }, [run]);
  const remove = useCallback(async (id: string) => { await deleteGame(id); await run(); }, [run]);

  return { results, query, setQuery, genres, setGenres, platforms, setPlatforms, isLoading, error, run, create, patch, remove };
}
