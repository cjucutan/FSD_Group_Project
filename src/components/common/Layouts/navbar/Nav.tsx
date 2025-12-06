import { NavLink } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';

export default function Nav() {
    const { isSignedIn } = useAuth();

    return (
        <div className="flex justify-center p-8">
            {isSignedIn ? (
                <>
                    <nav className="mr-4">
                        <NavLink to="/allGames" className="pr-4">All Games</NavLink>
                        <NavLink to="/savedGames" className="pr-4">Saved Games</NavLink>
                    </nav>

                    <nav className="mr-4">
                        <NavLink to="/CommunityHub" className="pr-3" end>Community Hub</NavLink>
                        <NavLink to="/marketplace" className="pr-4" end>Cartridge Cart</NavLink>
                        <NavLink to="/userProfile" className="pr-4">Profile</NavLink>
                    </nav>
                </>
            ) : (
                <></>
            )}
            <span>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </span>
        </div>
    );
}