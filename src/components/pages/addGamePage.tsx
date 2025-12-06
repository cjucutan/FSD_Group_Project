import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useGameForm } from "../../hooks/gameForm";
import GameForm from "../common/game-form/gameForm";

export default function AddGamePage() {
  const { user } = useUser();   // gives you Clerk user object
  const { isSignedIn } = useAuth();

  const {
    gameData,
    setGameData,
    handleChange,
    errors,
    isSubmitting,
    onSubmitForm,
  } = useGameForm();

  useEffect(() => {
    if (isSignedIn && user) {
      // Autofill userId and username from Clerk
      setGameData((prev) => ({
        ...prev,
        userId: user.id, // store userId in "user" or "userId" field depending on your schema
        username: user.username || user.fullName || user.primaryEmailAddress?.emailAddress || "UnnamedUser",
      }));
    }
  }, [isSignedIn, user, setGameData]);

  const handleSubmit = async () => {
    const success = await onSubmitForm("add");
    if (success) alert("Game added successfully!");
  };

  return (
    <div className="container">
      <h1>Add New Game</h1>
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
