import { useState, useCallback } from 'react';
import type { Game } from '../components/common/types/games';
import { Platform } from '../components/common/types/platform';
import { Genre } from '../components/common/types/genre';

type validationErrors = Map<string, string>;

export function useValidateGame() {
    const [errors, setErrors] = useState<validationErrors>(new Map());

    const validateGame = useCallback((game: Game): boolean => {
        const newErrors: validationErrors = new Map();
        const validPlatforms = Object.values(Platform);
        const validGenres = Object.values(Genre);

        if (!game.gameName?.trim()) {
            newErrors.set('gameName', 'Game Name cannot be blank');
        }

        if (!game.image?.trim()) {
            newErrors.set('image', 'Image URL cannot be blank');
        }

        if (!game.detail?.trim()) {
            newErrors.set('detail', 'Detail cannot be blank');
        }

        if (!validGenres.includes(game.genre)) {
            newErrors.set('genre', 'Invalid genre selected');
        }

        if (!game.ratings?.trim()) {
            newErrors.set('ratings', 'Ratings cannot be blank');
        }

        if (!validPlatforms.includes(game.platform)) {
            newErrors.set('platform', 'Invalid platform selected');
        }

        if (!game.developer?.trim()) {
            newErrors.set('developer', 'Developer cannot be blank');
        }

        if (!game.user?.trim()) {
            newErrors.set('user', 'User cannot be blank');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, []);

    return { errors, validateGame, setErrors };
}