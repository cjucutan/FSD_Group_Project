import type { Game } from '../components/common/types/games';
import { toast } from 'react-toastify';
import { useFormState } from '../hooks/useForm';
import * as GameService from '../services/allGames/allGamesService';
import { Genre } from '../components/common/types/genre';
import { Platform } from '../components/common/types/platform';
import { useValidateGame } from './gameValidation';

const DEFAULT_GAME: Game = {
    id: "",
    gameName: "",
    image: "",
    detail: '',
    genre: Genre.ACTION,
    ratings: "",
    platform: Platform.PC,
    developer: "",
    user: "",
}

export function useGameForm(initialGame: Game = DEFAULT_GAME) {
    const {
        formData: gameData,
        setFormData: setGameData,
        handleChange, 
        clearFieldError,
        clearAllErrors,
        resetForm,
        isSubmitting,
        setIsSubmitting
    } = useFormState<Game>(initialGame)

    const { errors, validateGame } = useValidateGame();

    const validate = () => {
        return validateGame(gameData); 
};


    const onSubmitForm = async (formMode: "add" | "edit") => {
    if (!validate()) return false;

    setIsSubmitting(true);

    try {
        if (formMode === "add") {
            const result = await GameService.addGame(gameData);
            toast.success(`Added new Game: ${result.gameName}!`);
            setGameData(result);
        } else {
            const updated = await GameService.updateGame(gameData);
            toast.success(`Updated Game: ${updated.gameName}!`);
            setGameData(updated);
        }

        return true; 
    } catch {
        toast.error(`Failed to ${formMode === "add" ? "add" : "update"} game.`);
        return false;
    } finally {
        setIsSubmitting(false);
    }
};


    return {
        gameData,
        setGameData,
        isSubmitting,
        handleChange,
        clearFieldError,
        clearAllErrors,
        resetForm,
        onSubmitForm,
        errors,
    };
}