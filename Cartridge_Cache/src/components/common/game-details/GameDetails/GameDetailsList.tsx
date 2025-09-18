import { games } from "../../../data/game";
import { GameItem } from "../GameItem/GameItem";

export function GameList() {
  return (
    <section className="game-list">
      {games.map((x) => (
        <GameItem game={x} key={x.id} />
      ))}
    </section>
  );
}