import type { Game } from '../common/types/games';
import { Genre } from '../common/types/genre';
import { Platform } from '../common/types/platform';
import AllGamesList from '../common/allGames/allGamesList';
import { Input } from '../common/ui/Input';
import { Select } from '../common/ui/Select';
import { useAllGames } from '../../hooks/useAllGames';
import { useFilteredGames } from '../../hooks/useFilteredGames';
import { Link } from 'react-router';

interface GameProps {
    gameDependencies: any[];
    gameFilterFn: ((game: Game) => boolean) | null;
}

export default function DisplayAllGames({ gameDependencies, gameFilterFn }: GameProps) {
    const { games, toggleSavedGame } = useAllGames(gameDependencies);

    const {
        filteredGames,
        setSearchTerm,
        setGenre,
        setPlatform
    } = useFilteredGames(games, gameFilterFn);

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-black">

            <div className='flex justify-end'>
                <Link
                    to="/addGames"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    + Create Game
                </Link>
            </div>

            <div className="flex justify-between gap-6">
                <Input
                    className="w-full"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search games..."
                />

                <Select
                    className="w-40"
                    onChange={(e) => setGenre(e.target.value as Genre | "All")}
                >
                    <option value="All">All Genres</option>
                    {Object.values(Genre).map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </Select>

                <Select
                    className="w-40"
                    onChange={(e) => setPlatform(e.target.value as Platform | "All")}
                >
                    <option value="All">All Platforms</option>
                    {Object.values(Platform).map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </Select>
            </div>

            <span>{filteredGames.length} games found</span>

            <AllGamesList
                games={filteredGames}
                onGameSaved={toggleSavedGame}
            />
        </div>
    );
}

