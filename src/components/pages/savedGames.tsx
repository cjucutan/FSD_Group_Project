import { Link } from 'react-router';
import type { Game } from '../common/types/games';
import AllGamesList from '../common/allGames/allGamesList';

interface GameProps {
    games: Game[];
    setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export default function SavedGames({ games, setGames }: GameProps) {
    const savedGames = games.filter(g => g.saved);
    const NoGamesFound = () => {
        return (
            <div className="text-center mt-20 text-white">
                <div>
                    <h3>No Games Saved.</h3>
                </div>
                <div className="text-center mt-4">
                    <Link to="/allGames" className="text-blue-500 underline">
                        See All Games
                    </Link>
                </div>
            </div>
        );
    }
        return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-black">
            {savedGames.length === 0 ? ( <NoGamesFound />) : (
            <div className="p-16">
                <AllGamesList games={savedGames} setGames={setGames} />
            </div>
            )}
        </div>
    );
}