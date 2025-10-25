import { useEffect, useState } from 'react';
import * as gamesService from '../services/allGames/allGamesService';
import type { Game } from '../components/common/types/games';
import { toast } from 'react-toastify';

export function useAllGames(dependencies: unknown[]) {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>();

    const fetchGames = async () => {
        try {
            const result = await gamesService.getAllGames();
            
            const savedIds: string[] = JSON.parse(localStorage.getItem('savedGames') || '[]');
            const updatedGames = result.map(game => ({
                ...game,
                saved: savedIds.includes(game.id),
            }));

            setGames(updatedGames);
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };

    const toggleSavedGame = async (game: Game) => {
        try {
            const updatedGame = await gamesService.toggleSavedGame(game);

            setGames(prev => prev.map(g => g.id === game.id ? updatedGame : g));

            const message = updatedGame.saved
                ? "Added new item to saved games."
                : "Removed item from saved games.";

            toast(message, {
                position: "bottom-center",
                theme: "light",
                hideProgressBar: true,
                autoClose: 2500,
            });
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };


    useEffect(() => {
        fetchGames();
    }, [...dependencies]);

    return {
        games,
        error,
        fetchGames,
        toggleSavedGame,
    };
}