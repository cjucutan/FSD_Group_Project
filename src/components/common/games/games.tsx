import { games } from '../../data/gamesList';
import gameImage from '../../data/images/games.jpg';

export default function AllGames() {
    return (
        <section>
            {games.slice(0, 5).map(({ id, gameName }) => (
                <div key={id} className="flex items-center justify-space-around flex-col m-4s">
                    <img src={gameImage} height= "200" width="300" alt="Game cover" className="game-image" />
                    <h3 className="text-center font-bold text-lg">{gameName}</h3>
                </div>
            ))}

            <div>
                <button className="flex items-center justify-space-evenly">See More Games</button>
            </div>
        </section>
    );
}