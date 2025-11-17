import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGameForm } from '../../hooks/gameForm';
import GameForm from '../common/game-form/gameForm';
import * as GameService from "../../services/allGames/allGamesService"

export default function editGamePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        gameData,
        setGameData,
        handleChange,
        errors,
        isSubmitting,
        onSubmitForm,
    } = useGameForm();

    useEffect (() => {
        async function loadGame() {
            if (!id) return;
            const game = await GameService.getGameById(id);
            console.log("Loaded game", game);
            if (game) {
                setGameData(game);
            } else {
                navigate("/addGames");
            }
        }
        loadGame();
    }, [id, setGameData, navigate]);

    const handleSubmit = async () => {
        console.log("Submitting edit form", gameData.id, gameData.gameName);
        const result = await onSubmitForm("edit");
        if (result) navigate("/allGames");
    };

    if(!gameData.id) return <p>Loading game...</p>

    return (
        <div className='container'>
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
