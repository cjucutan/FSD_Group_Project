import { NavLink } from "react-router";


interface NavProps {
    isLoggedIn: boolean;
    onLogin: () => void;
}

function Nav({isLoggedIn, onLogin}: NavProps) {
    return (
        <div className="flex justify-center p-8">
            <nav>
                <NavLink to="/CommunityHub" className="pr-3"end>
                    Community Hub
                </NavLink>

                <span>
                    <a href="gameForm" className="pr-4">Submit a Game </a>
                </span>

                <span>
                    <a href="gameList" className="pr-4">Game List </a>
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