import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavbarItem } from "./NavbarItem";

const Navbar = () => {
    return (
        <div className="mb-5 flex h-20 w-full bg-zinc-900 px-6 text-white">
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
            <NavbarItem
                title="Search"
                icon={faSearch}
                link="/search"
                style={"hover:bg-zinc-700 hover:text-zinc-50"}
            />
        </div>
    );
};

export default Navbar;
