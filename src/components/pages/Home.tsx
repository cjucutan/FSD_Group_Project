import { GameList } from "../common/game-details/GameDetailsList"
import {GameFormPreview} from "../common/game-form/game-form"
import AllGames from "../common/games/games"
import UserProfileSection from "../common/user-profile/user-profile"

export function HomePage() {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <>
                <AllGames />
                <GameList />
                <GameFormPreview />
                <UserProfileSection />
            </>
        </div>
    )
}