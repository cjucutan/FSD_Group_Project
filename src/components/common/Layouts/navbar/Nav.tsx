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
                <span>
                    <a href="gameForm" className="pr-4">Submit a Game </a>
                </span>

                <span>
                    <a href="gameDetails" className="pr-4">Game Details </a>
                </span>

                <span>
                    <a href="userProfile" className="pr-4">Profile </a>
                </span>
                <span>
                    {isLoggedIn ? (
                        <span>Welcome Back!</span>
                    ) : (
                        <button onClick={onLogin} className="text-blue-500 underline">Login</button>
                    )}
                </span>
            </nav>
        </div>

    )
};

export default Nav;