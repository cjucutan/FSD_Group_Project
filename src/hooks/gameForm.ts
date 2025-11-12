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
            let result: Game;
            if(formMode === "add") {
                result = await GameService.addGame(gameData);
                toast.success(`Added new Game: ${result.gameName}!`);
            } else {
                result = await GameService.updateGame(gameData);
                toast.success(`Updated Game: ${result.gameName}!`);
            }
        

            setGameData(result);
            return result;
        } catch (error) {
            toast.error(`Failed to ${formMode === "add" ? "add" : "update"} game. Please try again.`);
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