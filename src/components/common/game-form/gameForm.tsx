import type { Game } from '../types/games';
import { Genre } from '../types/genre';
import { Platform } from '../types/platform';

interface Props {
    gameData: Game;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    errors: Map<string, string>;
    isSubmitting: boolean;
}

export default function GameForm({ gameData, onChange, errors, isSubmitting }: Props) {
    return (
        <form className="space-y-6 bg-grey-800 p-6 rounded-lg shadow-lg border border-grey-700">

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game Name</label>
                <input
                    type="text"
                    name="gameName"
                    value={gameData.gameName}
                    onChange={onChange}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                {errors.has("gameName") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("name")}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={gameData.image}
                    onChange={onChange}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                {errors.has("image") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("image")}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game Detail / Description</label>
                <textarea
                    name="detail"
                    value={gameData.detail}
                    onChange={onChange}
                    rows={3}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                {errors.has("detail") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("detail")}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game Genre</label>
                <select
                    name="genre"
                    value={gameData.genre}
                    onChange={onChange}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                    {Object.values(Genre).map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                {errors.has("genre") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("genre")}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game Ratings</label>
                <input
                    type="text"
                    name="ratings"
                    value={gameData.ratings}
                    onChange={onChange}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                {errors.has("ratings") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("ratings")}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game Platform</label>
                <select
                    name="platform"
                    value={gameData.platform}
                    onChange={onChange}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                    {Object.values(Platform).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                {errors.has("platform") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("platform")}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game Developer</label>
                <input
                    type="text"
                    name="developer"
                    value={gameData.developer}
                    onChange={onChange}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                {errors.has("developer") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("developer")}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Game User</label>
                <input
                    type="text"
                    name="user"
                    value={gameData.user}
                    onChange={onChange}
                    className="p-2 rounded bg-grey-700 text-white border border-grey-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                {errors.has("user") && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.get("user")}</span>
                )}
            </div>

            {/* Disabled submit styling */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded font-semibold text-white transition ${
                    isSubmitting
                        ? "bg-grey-400 cursor-not-allowed opacity-50"
                        : "bg-sky-800 hover:bg-blue-900"
                }`}
            >
                {isSubmitting ? "Saving..." : "Save Game"}
            </button>
        </form>
    );
}