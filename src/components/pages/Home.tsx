import AllGames from "../common/games/games"
import UserProfileSection from "../common/user-profile/user-profile"
import { CommunityHub } from "../common/Community_Hub/CommunityHub"
import { CartridgeCartPage } from "../common/marketplace/CartridgeCartPage"

export function HomePage() {

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <>
                <AllGames />
                <CartridgeCartPage />
                <UserProfileSection />
                <CommunityHub />
            </>
        </div>
    )
}
