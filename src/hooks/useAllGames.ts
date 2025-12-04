import { useEffect, useState, useCallback } from 'react';
import * as gamesService from '../services/allGames/allGamesService';
import type { Game } from '../components/common/types/games';
import { toast } from 'react-toastify';

export function useAllGames(dependencies: unknown[] = []) {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);

    // --- Fetch all games from backend ---
    const fetchGames = useCallback(async () => {
        try {
            const result = await gamesService.getAllGames(); 
            setGames(result);
            setError(null);
        } catch (errorObject: any) {
            setError(errorObject?.message || "Failed to load games.");
        }
    }, []);

    // --- Toggle saved on backend ---
    const toggleSavedGame = useCallback(
    async (game: Game, sessionToken: string) => {
        try {
            // Backend returns FULL updated game list
            const updatedGames = await gamesService.toggleSavedGame(game, sessionToken);

            // Since backend returns Game[], just replace it
            setGames(updatedGames);

            // Toast feedback
            const updated = updatedGames.find(g => g.id === game.id);

            if (updated) {
                toast(
                    updated.saved
                        ? "Added new item to saved games."
                        : "Removed item from saved games.",
                    {
                        position: "bottom-center",
                        theme: "light",
                        hideProgressBar: true,
                        autoClose: 2500,
                    }
                );
            }

            setError(null);
        } catch (errorObject: any) {
            setError(errorObject?.message || "Failed to update saved status.");
        }
    },
    []
);

    // --- Delete a game on backend ---
    const deleteGame = useCallback(
        async (id: string, sessionToken: string) => {
            try {
                await gamesService.deleteGame(id, sessionToken);
                setGames((prev) => prev.filter((g) => g.id !== id)); // remove from local state
                toast.success("Game deleted successfully!", {
                    position: "bottom-center",
                    theme: "light",
                    hideProgressBar: true,
                    autoClose: 2500,
                });
            } catch (errorObject: any) {
                console.error("Error deleting game:", errorObject);
                setError(errorObject?.message || "Failed to delete game.");
                toast.error("Failed to delete game.", {
                    position: "bottom-center",
                    theme: "light",
                    hideProgressBar: true,
                    autoClose: 2500,
                });
            }
        },
        []
    );

    // --- Load games on mount or dependency change ---
    useEffect(() => {
        fetchGames();
    }, [fetchGames, ...dependencies]);

    return {
        games,
        error,
        fetchGames,
        toggleSavedGame,
        deleteGame
    };
}
