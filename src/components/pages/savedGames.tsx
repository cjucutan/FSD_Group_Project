import { Link } from 'react-router';
import AllGamesList from '../common/allGames/allGamesList';
import { useAllGames } from '../../hooks/useAllGames';
import { useFilteredGames } from '../../hooks/useFilteredGames';

export default function SavedGames() {
    const { games, toggleSavedGame } = useAllGames([]);

    const { filteredGames } = useFilteredGames(
        games,
        (game) => game.saved === true
    );

    const NoGamesFound = () => (
        <div className="text-center mt-20 text-white">
            <h3>No Games Saved.</h3>
            <div className="mt-4">
                <Link to="/allGames" className="text-blue-500 underline">
                    See All Games
                </Link>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-black">
            {filteredGames.length === 0 ? (
                <NoGamesFound />
            ) : (
                <div className="p-16">
                    <AllGamesList
                        games={filteredGames}
                        onGameSaved={toggleSavedGame}
                    />
                </div>
            )}
        </div>
    );
}
