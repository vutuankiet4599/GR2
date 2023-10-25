import { useContext, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import {
    faAngleLeft,
    faAngleRight,
    faHome,
    faListAlt,
    faThList,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import AppContext from "../../../context/AppContext";

const Sidebar = ({ style }) => {
    const [isShow, setIsShow] = useState(true);
    const { data } = useContext(AppContext);

    return (
        <div
            className={
                (isShow ? "w-64" : "w-fit") +
                " " +
                "min-h-screen flex flex-col bg-indigo-500 relative" +
                " " +
                style
            }
        >
            <div
                className="cursor-pointer w-12 h-12 rounded-full absolute top-8 -right-6 text-white bg-indigo-400 flex items-center justify-center text-3xl font-bold"
                onClick={() => setIsShow(!isShow)}
            >
                <FontAwesomeIcon icon={isShow ? faAngleRight : faAngleLeft} />
            </div>
            <Link to="/admin">
                <div className="w-full flex gap-3 py-3 border-b-2 border-b-white mb-3">
                    <div className="w-24 h-24 rounded-full">
                        <img
                            src="/icon.png"
                            alt="web"
                            className="object-fill"
                        />
                    </div>

                    {isShow && (
                        <div className="flex items-center">
                            <p className="text-xl font-bold text-white">
                                Website for exchange
                            </p>
                        </div>
                    )}
                </div>
            </Link>

            <div className="flex flex-col grow px-3 items-center gap-2">
                {data.user?.role?.name == "SUPER_ADMIN" && (
                    <>
                        <SidebarItem
                            icon={faHome}
                            title="Home"
                            link="/admin"
                            isShow={isShow}
                        />
                        <SidebarItem
                            icon={faUser}
                            title="User"
                            link="/admin/users"
                            isShow={isShow}
                        />
                        <SidebarItem
                            icon={faListAlt}
                            title="Category"
                            link={"/admin/categories"}
                            isShow={isShow}
                        />
                    </>
                )}
                {data.user?.role?.name == "OWNER" && (
                    <>
                        <SidebarItem
                            icon={faThList}
                            title="Product"
                            link="/owner/products"
                            isShow={isShow}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    style: PropTypes.string,
};

export default Sidebar;
