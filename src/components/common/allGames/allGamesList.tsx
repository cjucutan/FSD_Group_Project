import type { Game } from "../types/games";
import AllGamesItem from "./allGamesItem";


interface GameListProps {
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export default function AllGamesList({ games, setGames }: GameListProps) {
  const onGameSaved = (id: string, saved: boolean) => {
    setGames((prev) => prev.map((g) => (g.id ===id ? { ...g, saved} : g)));
  };

  return (
    <section className="games-list">
      {games.map((g) => (
        <AllGamesItem
          game={g}
          key={g.id}
          onGameSaved={onGameSaved}
        />
      ))}
    </section>
  );
}