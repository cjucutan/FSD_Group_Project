import { GameList } from "../common/game-details/GameDetailsList"
import Nav  from "../common/navbar/Nav"
import Header from "../common/Header/Header"

export function HomePage() {
    return (
        <>
            <Header />
            <Nav />
            <GameList /> 
        </>
    )
}