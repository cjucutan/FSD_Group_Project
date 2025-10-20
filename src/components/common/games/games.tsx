import { Games } from '../../data/gamesList';
import gameImage from '../../data/images/games.jpg';

export default function AllGames() {
    return (
        <section className="flex flex-row justify-center items-end space-x-8 p-4">
            {Games.slice(0, 5).map(({ id, gameName }) => (
                <div key={id} className="flex flex-col items-center">
                    <img src={gameImage} height= "200" width="300" alt="Game cover" className="game-image" />
                    <h3 className="text-center font-bold text-lg mt-2">{gameName}</h3>
                </div>
            ))}
            <div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold" onClick={() => window.location.href = "/allGames"}>See More Games</button>
            </div>
        </section>
    );
}