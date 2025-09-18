import { GameList } from "../common/game-details/GameDetailsList"
import Nav  from "../common/navbar/Nav"
import Footer from "../common/Footer/Footer"
import Header from "../common/Header/Header"

export function HomePage() {
    return (
        <>
            <Header />
            <Nav />
            <GameList /> 
            <Footer />
        </>
    )
}