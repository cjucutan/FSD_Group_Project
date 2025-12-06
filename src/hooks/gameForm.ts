import { useAuth } from "@clerk/clerk-react";
import type { Game } from "../components/common/types/games";
import { toast } from "react-toastify";
import { useFormState } from "../hooks/useForm";
import * as GameService from "../services/allGames/allGamesService";
import { Genre } from "../components/common/types/genre";
import { Platform } from "../components/common/types/platform";
import { useValidateGame } from "./gameValidation";

const DEFAULT_GAME: Game = {
  id: "",
  gameName: "",
  image: "",
  detail: "",
  genre: Genre.ACTION,
  ratings: "",
  platform: Platform.PC,
  developer: "",
  user: "",
  userId: "",
  price: "",
  saved: false, // optional but good to keep consistent
};

export function useGameForm(initialGame: Game = DEFAULT_GAME) {
  const { getToken } = useAuth(); // Clerk hook for current session
  const {
    formData: gameData,
    setFormData: setGameData,
    handleChange,
    clearFieldError,
    clearAllErrors,
    resetForm,
    isSubmitting,
    setIsSubmitting,
  } = useFormState<Game>(initialGame);

  const { errors, validateGame } = useValidateGame();

  const validate = () => validateGame(gameData);

  const onSubmitForm = async (formMode: "add" | "edit") => {
    if (!validate()) return false;

    setIsSubmitting(true);

    try {
      const token = await getToken(); // Retrieve Clerk token
      if (!token) throw new Error("Missing Clerk session token");

      let result: Game;
      if (formMode === "add") {
        result = await GameService.addGame(gameData, token);
        toast.success(`Added new Game: ${result.gameName}!`);
      } else {
        result = await GameService.updateGame(gameData, token);
        toast.success(`Updated Game: ${result.gameName}!`);
      }

      setGameData(result);
      return true;
    } catch (error: any) {
      console.error("Game form submission error:", error);
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
