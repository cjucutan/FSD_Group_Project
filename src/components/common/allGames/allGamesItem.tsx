import { Share, Star } from "lucide-react";
import type { Game } from "../types/games";
import AllGamesCard from "./allGamesCard";
import { Button } from "../ui/Button";
import image from "../../data/images/games.jpg";

interface allGamesItemProps {
  game: Game;
  onGameSaved: (id: string, saved: boolean) => void;
}

export default function AllGamesItem({ game, onGameSaved }: allGamesItemProps) {
  return (
    <section className="game-item my-4 border p-4 rounded bg-stone-100">
      <div className="flex flex-col">
        <div className="flex justify-items-center my-2 text-center justify-between">
          <div className="text-2xl">
            {game.gameName} - {game.genre}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => {console.log("Toggling save for", game.gameName, "=>", !game.saved);
            onGameSaved(game.id, !game.saved)}}>{game.saved ? <Star fill="orange" /> : <Star />}</Button>
            <Button>
              <Share />
            </Button>
            
          </div>
        </div>
        <div className="flex mb-4">
          <img
            src={image}
            alt="Game image"
            className="w-48 h-48 object-cover rounded-lg ml-2"
          />
        </div>

        <div className="flex gap-4">
          <AllGamesCard
            data={[game.genre, game.ratings, game.detail, game.platform, game.developer, game.user]}
            title={game.gameName}
          />
        </div>
      </div>
    </section>
  );
}