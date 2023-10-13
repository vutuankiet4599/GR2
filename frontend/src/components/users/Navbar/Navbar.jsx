import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavbarItem } from "./NavbarItem";

const Navbar = () => {
    return (
        <div className="flex bg-zinc-900 text-white w-full h-20 mb-5 px-6">
            <NavbarItem
                title="Home"
                icon={faHome}
                link="/"
                style={"hover:bg-zinc-700 hover:text-zinc-50"}
            />
            <NavbarItem
                title="About me"
                icon={faUser}
                link="/"
                style={"hover:bg-zinc-700 hover:text-zinc-50"}
            />
        </div>
    );
};

export default Navbar;
