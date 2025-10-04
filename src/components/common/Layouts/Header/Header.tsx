import { Button } from "../../ui/Button";
import { NavLink } from "react-router";

function Header() {
    return (
        <header className="flex justify-center text-[60px]">
            <NavLink to="/" end>
                <Button>Cartridge Cache</Button>
            </NavLink>
        </header>
    )
};

export default Header;