import * as allGamesRepo from '../../apis/allGames/allGamesRepo';
import type { Game } from '../../components/common/types/games';

export async function getAllGames(): Promise<Game[]> {
    return allGamesRepo.getAllGames();
}

export async function getGameById(gameId: string, sessionToken: string): Promise<Game | undefined> {
    return allGamesRepo.getGameById(gameId, sessionToken);
}

export async function addGame(game: Game, sessionToken: string) {
    return allGamesRepo.addGame(game, sessionToken);
}

export async function updateGame(game: Game, sessionToken: string): Promise<Game> {
    return allGamesRepo.updateGame(game, sessionToken);
}

export async function toggleSavedGame(game: Game, sessionToken: string) {
    const newSaved = !game.saved
    game.saved = newSaved;
    return await allGamesRepo.updateSavedGame(game.id, game.saved, sessionToken);
}

export async function deleteGame(gameId: string, sessionToken: string): Promise<void> {
    await allGamesRepo.deleteGame(gameId, sessionToken);
}


