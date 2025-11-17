import * as allGamesRepo from '../../apis/allGames/allGamesRepo';
import type { Game } from '../../components/common/types/games';

export async function getAllGames(): Promise<Game[]> {
    return allGamesRepo.getAllGames();
}

export async function getGameById(gameId: string): Promise<Game | undefined> {
    return allGamesRepo.getGameById(gameId);
}

export async function addGame(game: Game) {
    return allGamesRepo.addGame(game);
}

export async function updateGame(game: Game): Promise<Game> {
    return allGamesRepo.updateGame(game);
}

export async function toggleSavedGame(game: Game) {
    const newSaved = !game.saved
    game.saved = newSaved;
    return await allGamesRepo.updateSavedGame(game.id, game.saved);
}

export async function deleteGame(gameId: string): Promise<void> {
    await allGamesRepo.deleteGame(gameId);
}


