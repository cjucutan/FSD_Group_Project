import { useMemo, useState } from 'react';
import type { Game } from '../components/common/types/games';
import type { Platform } from '../components/common/types/platform';
import type { Genre } from '../components/common/types/genre';

interface FilterOptions {
    searchTerm: string;
    genre: Genre | "All";
    platform: Platform | "All";
}

export function useFilteredGames(
    games: Game[],
    filterFn?: ((game: Game) => boolean) | null
) {
    const [filters, setFilters] = useState<FilterOptions>({
        searchTerm: "",
        genre: "All",
        platform: "All"
    });

    const filteredGames = useMemo(() => {
        let result = games;

        // Custom filter (e.g. saved games only)
        if (filterFn) {
            result = result.filter(filterFn);
        }

        const { searchTerm, genre, platform } = filters;

        // Genre filter
        if (genre !== "All") {
            result = result.filter(g => g.genre === genre);
        }

        // Platform filter
        if (platform !== "All") {
            result = result.filter(g => g.platform === platform);
        }

        // Search filter
        if (searchTerm.trim() !== "") {
            const text = searchTerm.toLowerCase();

            result = result.filter(g => 
                g.gameName.toLowerCase().includes(text) ||
                g.genre.toLowerCase().includes(text) ||
                g.platform.toLowerCase().includes(text)
            );
        }

        return result;
    }, [games, filters, filterFn]);

    // Update functions
    const setSearchTerm = (searchTerm: string) =>
        setFilters(prev => ({ ...prev, searchTerm }));

    const setGenre = (genre: Genre | "All") =>
        setFilters(prev => ({ ...prev, genre }));

    const setPlatform = (platform: Platform | "All") =>
        setFilters(prev => ({ ...prev, platform }));

    return {
        filteredGames,
        filters,
        setSearchTerm,
        setGenre,
        setPlatform
    };
}
