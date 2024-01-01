import { faAngleDown, faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import Link from "../common/Link";
import AuthService from "../../services/AuthService";
import SessionUtils from "../../utils/SessonUtils";
import { toast } from "react-toastify";
import CartIcon from "./CartIcon/CartIcon";

const Header = () => {
    const [isShow, setIsShow] = useState(false);
    const { data, action } = useContext(AppContext);

    const handleLogout = () => {
        AuthService.logout()
            .then((response) => {
                SessionUtils.reset();
                action.setToken("");
                action.setUser({});
                toast.success(response.message);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    return (
        <div className="flex h-16 w-full items-center justify-between bg-white px-8 text-zinc-900">
            <div className="flex flex-row items-center gap-2 text-xl font-medium">
                <div className="h-8 w-8">
                    <img src="/icon.png" alt="website icon" />
                </div>
                <p>Exchange website</p>
            </div>
            <div className="relative flex cursor-pointer items-center justify-center gap-3">
                <CartIcon style={"mr-8"} />
                {!data.token ? (
                    <>
                        <Link link="/login">Login</Link>
                        <span>/</span>
                        <Link link="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <div className="mx-0 my-auto h-8 w-8 overflow-hidden rounded-full border p-0">
                            <img
                                src={data.user?.avatar ? data.user?.avatar : "/user.png"}
                                alt="user"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold active:bg-slate-200"
                            onClick={() => setIsShow(!isShow)}
                        >
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        {isShow && (
                            <div className="absolute -bottom-24 right-0 z-10 flex w-36 flex-col rounded-b-lg border bg-white shadow">
                                <Link link="/profile">
                                    <div className="flex cursor-pointer items-center justify-between border-b bg-white px-3 py-2 transition-all ease-linear hover:bg-slate-300">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faGear}
                                                className="text-xl font-semibold text-gray-500"
                                            />
                                        </span>

                                        <p className="text-lg font-medium text-black">Setting</p>
                                    </div>
                                </Link>
                                <div
                                    className="flex cursor-pointer items-center justify-between bg-white px-3 py-2 transition-all ease-linear hover:bg-slate-300"
                                    onClick={handleLogout}
                                >
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faSignOut}
                                            className="text-xl font-semibold text-red-500"
                                        />
                                    </span>

                                    <p className="text-lg font-medium text-black">Logout</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
