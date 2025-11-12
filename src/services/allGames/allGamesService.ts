import * as allGamesRepo from '../../apis/allGames/allGamesRepo';
import type { Game } from '../../components/common/types/games';
import { Platform } from '../../components/common/types/platform';
import { Genre } from '../../components/common/types/genre';

export async function getAllGames(): Promise<Game[]> {
    return allGamesRepo.getAllGames();
}

export async function getGameById(gameId: string): Promise<Game | undefined> {
    return allGamesRepo.getGameById(gameId);
}

export async function getGamesByName(name: string): Promise<Game[]> {
    return allGamesRepo.getGamesByName(name);
}

export async function getGamesByGenre(genre: Genre): Promise<Game[]> {
    return allGamesRepo.getGamesByGenre(genre);
}

export async function getGamesByPlatform(platform: Platform): Promise<Game[]> {
    return allGamesRepo.getGamesByPlatform(platform);
}

export async function addGame(game: Game) {
    return allGamesRepo.addGame(game);
}

export async function updateGame(game: Game){
    return allGamesRepo.updateGame(game);
}

export async function toggleSavedGame(game: Game) {
    const newSaved = !game.saved
    game.saved = newSaved;
    return await allGamesRepo.updateSavedGame(game.id, game.saved);
}

export async function deleteGame(gameId: string): Promise<{message: string}> {
    return allGamesRepo.deleteGame(gameId);
}


