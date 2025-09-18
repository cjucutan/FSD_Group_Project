import { GameList } from "../common/game-details/GameDetailsList"
import Nav  from "../common/navbar/Nav"

export function HomePage() {
    return (
        <>
            <Nav />
            <GameList /> 
        </>
    )
}