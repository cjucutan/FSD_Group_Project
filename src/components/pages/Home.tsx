import { GameList } from "../common/game-details/GameDetailsList"
import Nav  from "../common/navbar/Nav"
import Footer from "../common/Footer/Footer"
import Header from "../common/Header/Header"
import AllGames from "../common/games/games"

export function HomePage() {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <>
                <Header />
                <Nav />
                <AllGames />
                <GameList />
                <Footer />
            </>
        </div>
    )
}