import type { Game } from "../types/games";
import AllGamesItem from "./allGamesItem";


interface GameListProps {
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export default function AllGamesList({ games, setGames }: GameListProps) {
  const onGameSaved = (id: string, saved: boolean) => {
    const data = [...games];
    const index = data.findIndex((x) => x.id == id);
    if (index > -1) {
      const game = data[index];
      game.saved = saved;
      data.splice(index, 1, game);
    }

    setGames(data);
  };

  return (
    <section className="games-list">
      {games.map((x) => (
        <AllGamesItem
          game={x}
          key={x.id}
          onGameSaved={onGameSaved}
        />
      ))}
    </section>
  );
}