import games from '../../data/games.json';
import gameImage from '../../data/images/games.png';

export default function AllGames() {
    return (
        <section>
            {games.map(({ id, gameName }) => (
                <div key={id} className="game-card">
                    <img src={gameImage} alt="Game cover" className="game-image" />
                    <h3 className="game-title">{gameName}</h3>
                </div>
            ))}

            <div className="all-games-footer">
                <button className="load-more">See More Games</button>
            </div>
        </section>
    );
}