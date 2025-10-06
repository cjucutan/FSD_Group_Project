import type { Game } from '../common/types/games';
import { genre } from '../common/types/genre';
import AllGamesList from '../common/allGames/allGamesList';
import { Input } from '../common/ui/Input';
import  { Select} from '../common/ui/Select';
import { useEffect, useState } from 'react';

interface GameProps {
    games: Game[];
    setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export default function DisplayAllGames({ games, setGames }: GameProps) {
    const [filterOptions, setFilterOptions] = useState<string[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>(games)

    const onFilterChange = (filterValue: string) => {
    setFilteredGames(filterValue === "All" ? games : games.filter((x) => x.genre.includes(filterValue)));
  };

    const onSearchUpdate = (searchTerm: string) => {
    const st = searchTerm.toLowerCase();
    setFilteredGames(games.filter((x) => x.gameName.toLowerCase().includes(st) || x.genre.toLowerCase().includes(st)));
  };

    useEffect(() => {
        console.log("games updated", games.filter(g => g.saved));
        setFilteredGames(games);
        const Genre = [...Object.values(genre)].filter((filter) => games.findIndex((x) => x.genre == filter) != -1);
        setFilterOptions(["All", ...Genre]);
    }, [games]);

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-black">
            <div className="flex justify-between gap-6">
                <Input
                    className="w-full"
                    onChange={(e) => onSearchUpdate(e.target.value)}
                    placeholder="Search games..."
                />
                <Select
                    className="w-40"
                    onChange={(e) => onFilterChange(e.target.value)}>
                    {filterOptions.map((x) => (
                        <option key={x}>{x}</option>
                    ))}
                </Select>
            </div>
            <span> {games.length} games found</span>
            <AllGamesList
                games={filteredGames}
                setGames={setGames}
            />
        </div>
    );
}
