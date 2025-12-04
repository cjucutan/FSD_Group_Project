import type { Game } from "../types/games";
import AllGamesItem from "./allGamesItem";


interface GameListProps {
  games: Game[];
  onGameSaved: (game: Game) => void;
  onGameDeleted: (id: string) => void;
}

export default function AllGamesList({ games, onGameSaved, onGameDeleted }: GameListProps) {
  
  return (
    <section className="games-list">
      {games.map(games => (
        <AllGamesItem
          key={games.id}
          game={games}
          onGameSaved={onGameSaved}
          onGameDeleted={onGameDeleted}
        />
      ))}
    </section>
  );
}