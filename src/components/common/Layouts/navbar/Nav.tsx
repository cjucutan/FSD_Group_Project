import { NavLink } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';



function Nav() {
    return (
        <div className="flex justify-center p-8">
            <nav>
                <span>
                    <a href="allGames" className="pr-4">All Games </a>
                </span>
                <span>
                    <a href="savedGames" className="pr-4">Saved Games </a>
                </span>
            </nav>
            <nav>
                <NavLink to="/CommunityHub" className="pr-3"end>
                    Community Hub
                </NavLink>

                <span>
                    <NavLink to="/marketplace" className="pr-4" end>
                        Cartridge Cart
                    </NavLink>
                </span>

                <span>
                    <a href="userProfile" className="pr-4">Profile </a>
                </span>
            </nav>
                <span>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </span>
        </div>
    )
};

export default Nav;