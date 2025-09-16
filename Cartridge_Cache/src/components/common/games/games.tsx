import './games.css';
import games from '../../data/games.json';

export default function AllGames() {
    return (
        <div>
        {Object.entries(games).map(([gameName, image]) => (
            <div key={gameName} className="game-card">
                <img src={image} alt={gameName} className="game-image" />
                <h3 className="game-title">{gameName}</h3>
            </div>
        ))}
        </div>
    )
}