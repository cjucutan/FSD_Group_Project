import { useEffect, useState } from "react";
import { getAllGames } from "../../../apis/allGames/allGamesRepo";
import type { Game } from "../../common/types/games";
import gameImage from "../../data/images/games.jpg";

export default function AllGames() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getAllGames();
                setGames(data);
            } catch (err: any) {
                console.error("Failed to fetch games:", err);
                setError("Failed to load games. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <p className="text-center p-4">Loading games...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 p-4">{error}</p>;
    }

    return (
        <section className="flex flex-row justify-center items-end space-x-8 p-4">
            {games.slice(0, 5).map(({ id, gameName }) => (
                <div key={id} className="flex flex-col items-center">
                    <img
                        src={gameImage}
                        height="200"
                        width="300"
                        alt={gameName}
                        className="rounded shadow-md object-cover"
                    />
                    <h3 className="text-center font-bold text-lg mt-2">{gameName}</h3>
                </div>
            ))}
            <div>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold"
                    onClick={() => (window.location.href = "/allGames")}
                >
                    See More Games
                </button>
            </div>
        </section>
    );
}