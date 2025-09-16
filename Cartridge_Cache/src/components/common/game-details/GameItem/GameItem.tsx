import type { Game } from "../../../types/game";
import { GameItemCard } from "../GameItemCards/GameItemCard";

interface GameItemProps {
    game: Game;
}

export function GameItem({ game }: GameItemProps) {
    return (
      <section className="container">
        <GameItemCard title="Game Name" data={[game.gameName]} />
        <GameItemCard title="Detail" data={[game.detail]} />
        <GameItemCard title="Genre" data={[game.genre]} />
        <GameItemCard title="Ratings" data={[game.ratings]} />
        <GameItemCard title="Platform" data={[game.platform]} />
        <GameItemCard title="Developer" data={[game.developer]} />
        <GameItemCard title="User" data={[game.user]} />
    </section>
    )
}