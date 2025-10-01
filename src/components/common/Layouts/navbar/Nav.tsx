function Nav() {
    return (
        <div className="flex justify-center p-8">
            <nav>
                <span>
                    <a href="gameDetails" className="pr-4">Game Details </a>
                </span>

                <span>
                    <a href="gameForm" className="pr-4">Submit a Game </a>
                </span>

                <span>
                    <a href="gameList" className="pr-4">Game List </a>
                </span>

                <span>
                    <a href="userProfile" className="pr-4">Profile </a>
                </span>
            </nav>
        </div>

    )
};

export default Nav;