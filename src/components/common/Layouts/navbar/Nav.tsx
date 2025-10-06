import { NavLink } from "react-router";


interface NavProps {
    isLoggedIn: boolean;
    onLogin: () => void;
}


function Nav({ isLoggedIn, onLogin }: NavProps) {
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
                <a onClick={() => onLogin()}>{isLoggedIn ? "Logout" : "Login / Signup"} </a>
            </nav>
        </div>

    )
};

export default Nav;