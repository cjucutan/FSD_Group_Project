import { GameList } from "../common/game-details/GameDetails/GameDetailsList"
import AllGames from "../common/games/games"

export function HomePage() {
    return (
        <>
            <AllGames />
            <GameList /> 
        </>
    )
}