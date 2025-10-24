import { useMemo, useState } from 'react';
import type { Game } from '../components/common/types/games';
import type { Platform } from '../components/common/types/platform';
import type { Genre } from '../components/common/types/genre';

interface FilterOptions {
    searchTerm: string;
    genres: Genre | "All";
    platforms: Platform | "All";
}

export function useFilteredGames(games: Game[], genres: Genre[], filterFn?: ((game: Game) => boolean) | null) {
    const [filters, setFilters] = useState<FilterOptions>({
        searchTerm: "",
        genres: "All",
        platforms: "All"
    });

    const filteredGames = useMemo(() => {
        let result = [...games];

        if (filterFn) {
            result = result.filter(filterFn);
        }

        const { searchTerm, genres, platforms } = filters;

        if (genres !== "All") {
            result = result.filter(game => game.genre === genres);
        }

        if (platforms !== "All") {
            result = result.filter(game => game.platform === platforms);
        }

        if (searchTerm.trim() !== "") {
            const st = searchTerm.toLowerCase();
            result = result.filter(game =>
                game.gameName.toLowerCase().includes(st) ||
                game.genre.toLowerCase().includes(st) ||
                game.platform.toLowerCase().includes(st)
            );
        }

        return result;
    }, [games, filters, filterFn]);

    const searchTerm = (searchTerm: string) => {
        setFilters(prev => ({ ...prev, searchTerm }));
    };

    const setGenre = (genre: Genre | "All") => {
        setFilters(prev => ({ ...prev, genres: genre }));
    };

    const setPlatform = (platform: Platform | "All") => {
        setFilters(prev => ({ ...prev, platforms: platform }));
    };

    return {
        filteredGames,
        searchTerm,
        setGenre,
        setPlatform,
        filters
    };
}