import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useGameForm } from "../../hooks/gameForm";
import GameForm from "../common/game-form/gameForm";
import * as GameService from "../../services/allGames/allGamesService";

export default function EditGamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken, isSignedIn } = useAuth();

  const {
    gameData,
    setGameData,
    handleChange,
    errors,
    isSubmitting,
    onSubmitForm,
  } = useGameForm();

  useEffect(() => {
    async function loadGame() {
      // ✅ Use Clerk session instead of localStorage
      if (!isSignedIn) {
        navigate("/login");
        return;
      }

      if (!id) return;

      try {
        const token = await getToken();
        if (!token) {
          console.warn("No Clerk token found — redirecting to login.");
          navigate("/login");
          return;
        }

        const game = await GameService.getGameById(id, token);
        console.log("Loaded game:", game);

        if (game) {
          setGameData(game);
        } else {
          navigate("/addGames");
        }
      } catch (error) {
        console.error("Error loading game:", error);
        navigate("/addGames");
      }
    }

    loadGame();
  }, [id, isSignedIn, getToken, navigate, setGameData]);

  const handleSubmit = async () => {
    console.log("Submitting edit form:", gameData.id, gameData.gameName);
    const result = await onSubmitForm("edit");
    if (result) navigate("/allGames");
  };

  if (!gameData.id) return <p>Loading game...</p>;

  return (
    <div className="container">
      <h1>Edit {gameData.gameName}</h1>

      <GameForm
        gameData={gameData}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
