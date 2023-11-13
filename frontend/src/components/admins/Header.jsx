import { faAngleDown, faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";
import SessionUtils from "../../utils/SessonUtils";

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
                console.log(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="mb-5 flex h-24 w-full items-center justify-between rounded-b-md bg-indigo-500 px-8 text-white shadow">
            <div className=" text-2xl font-medium">
                <p>Admin page</p>
            </div>
            <div className="relative flex cursor-pointer items-center justify-center gap-3">
                <div className="mx-0 my-auto h-14 w-14 overflow-hidden rounded-full border p-0">
                    <img
                        src={data.user?.avatar ? data.user.avatar : "/user.png"}
                        alt="user"
                        className="object-cover"
                    />
                </div>
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-4xl font-bold active:bg-sky-400"
                    onClick={() => setIsShow(!isShow)}
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                {isShow && (
                    <div className="absolute -bottom-24 right-0 z-10 flex w-36 flex-col rounded-b-lg border bg-white shadow">
                        <div className="flex cursor-pointer items-center justify-between border-b bg-white px-3 py-2 transition-all ease-linear hover:bg-slate-300">
                            <span>
                                <FontAwesomeIcon
                                    icon={faGear}
                                    className="text-xl font-semibold text-gray-500"
                                />
                            </span>

                            <p className="text-lg font-medium text-black">Setting</p>
                        </div>
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
            </div>
        </div>
    );
};

export default Header;
