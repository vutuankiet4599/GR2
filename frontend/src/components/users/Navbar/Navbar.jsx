import { faHome, faMessage, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavbarItem } from "./NavbarItem";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";

const Navbar = () => {
    const { data } = useContext(AppContext);
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
            {data.token && (
                <NavbarItem
                    title="Chat"
                    icon={faMessage}
                    link="/chat"
                    style={"hover:bg-zinc-700 hover:text-zinc-50"}
                />
            )}
        </div>
    );
};

export default Navbar;
