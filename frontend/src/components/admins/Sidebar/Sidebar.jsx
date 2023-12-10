import { useContext, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import {
    faAngleLeft,
    faAngleRight,
    faCartFlatbed,
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
                "relative flex min-h-screen flex-col bg-indigo-500" +
                " " +
                style
            }
        >
            <div
                className="absolute -right-6 top-8 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-indigo-400 text-3xl font-bold text-white"
                onClick={() => setIsShow(!isShow)}
            >
                <FontAwesomeIcon icon={isShow ? faAngleRight : faAngleLeft} />
            </div>
            <Link to="/admin">
                <div className="mb-3 flex w-full gap-3 border-b-2 border-b-white py-3">
                    <div className="h-24 w-24 rounded-full">
                        <img src="/icon.png" alt="web" className="object-fill" />
                    </div>

                    {isShow && (
                        <div className="flex items-center">
                            <p className="text-xl font-bold text-white">Website for exchange</p>
                        </div>
                    )}
                </div>
            </Link>

            <div className="flex grow flex-col items-center gap-2 px-3">
                {data.user?.role?.name == "SUPER_ADMIN" && (
                    <>
                        <SidebarItem icon={faHome} title="Home" link="/admin" isShow={isShow} />
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

                        <SidebarItem
                            icon={faCartFlatbed}
                            title="Orders"
                            link="/owner/orders"
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
