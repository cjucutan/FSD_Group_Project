import * as allGamesRepo from '../../apis/allGames/allGamesRepo';
import type { Game } from '../../components/common/types/games';
import { Platform } from '../../components/common/types/platform';
import { genre } from '../../components/common/types/genre';

export async function getAllGames(): Promise<Game[]> {
    return allGamesRepo.getAllGames();
}

export async function getGameById(gameId: string): Promise<Game | undefined> {
    return allGamesRepo.getGameById(gameId);
}

export async function getGamesByName(name: string): Promise<Game[]> {
    return allGamesRepo.getGamesByName(name);
}

export async function getGamesByGenre(genre: genre): Promise<Game[]> {
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

export async function updateSavedGame(id: string, saved: boolean) {
    return allGamesRepo.updateSavedGame(id, saved);
}

export async function deleteGame(gameId: string): Promise<{message: string}> {
    return allGamesRepo.deleteGame(gameId);
}

export async function validateGame(game: Game) {
    const validationErrors = new Map<string, string>();
    const validPlatforms = Object.values(Platform);
    const validGenres = Object.values(genre);

    if(!game.gameName || game.gameName.length === 0) {
        validationErrors.set('name', 'Game Name cannot be blank');
    }

    if(!game.image || game.image.length === 0) {
        validationErrors.set('image', 'Game Image cannot be blank');
    }

    if(!game.detail || game.detail.length === 0) {
        validationErrors.set('detail', 'Game Detail cannot be blank');
    }

    if(!validGenres.includes(game.genre)) {
        validationErrors.set('genre', 'Invalid Genre');
    }

    if(!game.ratings || game.ratings.length === 0) {
        validationErrors.set('ratings', 'Game Ratings cannot be blank');
    }

    if(!validPlatforms.includes(game.platform)) {
        validationErrors.set('platform', 'Invalid Platform');
    }

    if(!game.developer || game.developer.length === 0) {
        validationErrors.set('developer', 'Game Developer cannot be blank');
    }

    if(!game.user || game.user.length === 0) {
        validationErrors.set('user', 'Game User cannot be blank');
    }

    return validationErrors;
}
