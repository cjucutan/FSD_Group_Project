import { GameList } from "../common/game-details/GameDetailsList"
import {GameFormPreview} from "../common/game-form/gameFormPreview"
import AllGames from "../common/games/games"
import UserProfileSection from "../common/user-profile/user-profile"
import { CommunityHub } from "../common/Community_Hub/CommunityHub"

export function HomePage() {

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <>
                <AllGames />
                <GameList />
                <GameFormPreview />
                <UserProfileSection />
                <CommunityHub />
            </>
        </div>
    )
}