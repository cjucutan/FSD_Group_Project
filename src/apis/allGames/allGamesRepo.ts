import { Games } from '../../components/data/gamesList'
import type { Game } from '../../components/common/types/games'
import type { Genre } from '../../components/common/types/genre';
import type { Platform } from '../../components/common/types/platform';

let allGames: Game[] = Games;

export function getAllGames(): Game[] {
    return allGames;
}

export function getGameById(gameId: string): Game | undefined {
    return allGames.find(game => game.id === gameId);
}

export function getGamesByName(name: string): Game[] {
    return allGames.filter(game => 
        game.gameName.toLowerCase().includes(name.toLowerCase())
    );
}

export function getGamesByGenre(genreFilter: Genre): Game[] {
    return allGames.filter(game => 
        game.genre.toLowerCase() === genreFilter.toLowerCase()
    );
}

export function getGamesByPlatform(platformFilter: Platform): Game[] {
    return allGames.filter(game => 
        game.platform.toLowerCase() === platformFilter.toLowerCase()
    );
}

export async function addGame(newGame: Game) {
    const lastGameId = allGames[allGames.length - 1].id;
    newGame.id = (parseInt(lastGameId) + 1).toString();
    allGames.push(newGame);
    return newGame;
}

export async function updateGame(updatedGame: Game) {
    const index = allGames.findIndex((g) => g.id === updatedGame.id);
    if (index === -1) {
        throw new Error(`Game with id ${updatedGame.id} was not found`);
    }
    allGames[index] = updatedGame;
    return allGames[index];
}

export async function updateSavedGame(id: string, saved: boolean) {
    const index = allGames.findIndex((g) => g.id === id);
    if (index === -1) {
        throw new Error(`Game with id ${id} was not found`);
    } else {
        allGames[index].saved = saved;
    }
    const savedIds = allGames.filter(g => g.saved).map(g => g.id);
    localStorage.setItem("savedGames", JSON.stringify(savedIds))

    return allGames[index];
}

export async function deleteGame(gameId: string): Promise<{message: string}> {
    const index = allGames.findIndex((g) => g.id === gameId);
    if (index === -1) {
        throw new Error(`Game with id ${gameId} was not found`);
    }
    allGames.splice(index, 1);
    return { message: `Game with id ${gameId} was deleted` };
}