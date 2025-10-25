import type { Game } from "../types/games";
import AllGamesItem from "./allGamesItem";


interface GameListProps {
  games: Game[];
  onGameSaved: (game: Game) => void;
}

export default function AllGamesList({ games, onGameSaved }: GameListProps) {
  
  return (
    <section className="games-list">
      {games.map(games => (
        <AllGamesItem
          key={games.id}
          game={games}
          onGameSaved={onGameSaved}
        />
      ))}
    </section>
  );
}