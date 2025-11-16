import type { Game } from '../../components/common/types/games'
import type { BaseResponse } from '../../components/common/types/BaseResponse';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export async function getAllGames() {
    const gameResponse: Response = await fetch(`${BASE_URL}/games`);
    if (!gameResponse.ok) {
        throw new Error(`Error fetching games: ${gameResponse.statusText}`);
    }
    
    const json: BaseResponse<Game[]> = await gameResponse.json();
    console.log(json.data);
    return json.data;
}


export async function getGameById(id: string): Promise<Game | undefined> {
    const gameResponse: Response = await fetch(`${BASE_URL}/games/${id}`);
    
    if (!gameResponse.ok) {
        throw new Error(`Error fetching game with id ${id}: ${gameResponse.statusText}`);
    }

    const json: BaseResponse<Game> = await gameResponse.json();
    return json.data;
}

export async function addGame(Game: Game) {
    const { id, ...body } = Game;
    const addResponse: Response = await fetch(`${BASE_URL}/games`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!addResponse.ok) {
        throw new Error(`Error adding game: ${addResponse.statusText}`);
    }

    const json: BaseResponse<Game> = await addResponse.json();
    return json.data;
}

export async function updateGame(Game: Game) {
    const { id, ...body } = Game;
    const updateResponse: Response = await fetch(`${BASE_URL}/games/${Game.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!updateResponse.ok) {
        throw new Error(`Error updating game with id ${Game.id}: ${updateResponse.statusText}`);
    }

    const json: BaseResponse<Game> = await updateResponse.json();
    return json.data;
}

export async function updateSavedGame(id: string, saved: boolean): Promise<Game[]> {
    const updateSaveResponse: Response = await fetch(`${BASE_URL}/games/updateSaved/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ saved }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!updateSaveResponse.ok) {
        throw new Error(`Error updating saved status for game with id ${id}: ${updateSaveResponse.statusText}`);
    }

    const json: BaseResponse<Game[]> = await updateSaveResponse.json();
    return json.data;
}

export async function deleteGame(id: string): Promise<void> {
    const deleteResponse: Response = await fetch(`${BASE_URL}/games/${id}`, {
        method: 'DELETE',
    });

    if (!deleteResponse.ok) {
        throw new Error(`Error deleting game with id ${id}: ${deleteResponse.statusText}`);
    }  
}