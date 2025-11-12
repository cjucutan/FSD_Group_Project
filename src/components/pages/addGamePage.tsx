import { useNavigate } from 'react-router';
import { useGameForm } from '../../hooks/gameForm';
import GameForm from '../common/game-form/gameForm';

export default function addGamePage() {
    const navigate = useNavigate();
    const {
        gameData,
        handleChange,
        errors,
        isSubmitting,
        onSubmitForm,
        resetForm,
    } = useGameForm();

    const handleSubmit = async () => {
        const result = await onSubmitForm("add");
        if (result) navigate("/allGames");
    };

    return (
        <div className='container'>
            <h1>Add New Game</h1>

            <GameForm
                gameData={gameData}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                errors={errors}
                isSubmitting={isSubmitting}
            />

            <button disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? "Saving..." : "Add Game"}
            </button>

            <button onClick={resetForm}>
                Reset
            </button>
        </div>
    );
}
