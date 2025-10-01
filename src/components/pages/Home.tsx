import { GameList } from "../common/game-details/GameDetailsList"
import {GameFormPreview} from "../common/game-form/game-form"
import AllGames from "../common/games/games"
import UserProfileSection from "../common/user-profile/user-profile"
import { CommunityHub } from "../common/Community_Hub/CommunityHub"
import { Layout } from "../common/Layouts/Layout"
import { useState } from "react";

export function HomePage() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const onLogin = () => {
        setLoggedIn(!loggedIn);
    };
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <>
                <Layout isLoggedIn={loggedIn} onLogin={onLogin}/>
                <AllGames />
                <GameList />
                <GameFormPreview />
                <UserProfileSection />
                <CommunityHub />
            </>
        </div>
    )
}