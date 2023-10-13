import {
    faAngleDown,
    faGear,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = () => {
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="w-full h-16 bg-white text-zinc-900 flex items-center justify-between px-8">
            <div className="flex flex-row items-center gap-2 text-xl font-medium">
                <div className="w-8 h-8">
                    <img src="/icon.png" alt="website icon" />
                </div>
                <p>Admin page</p>
            </div>
            <div className="flex items-center justify-center gap-3 relative cursor-pointer">
                <div className="w-8 h-8 rounded-full my-auto mx-0 p-0 border overflow-hidden">
                    <img src="/user.png" alt="user" className="object-cover" />
                </div>
                <div
                    className="text-xl font-bold active:bg-slate-200 rounded-full flex justify-center items-center w-12 h-12"
                    onClick={() => setIsShow(!isShow)}
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                {isShow && (
                    <div className="w-36 border rounded-b-lg bg-white absolute -bottom-24 right-0 shadow flex flex-col z-10">
                        <div className="border-b flex items-center justify-between px-3 py-2 bg-white hover:bg-slate-300 transition-all ease-linear cursor-pointer">
                            <span>
                                <FontAwesomeIcon
                                    icon={faGear}
                                    className="text-xl font-semibold text-gray-500"
                                />
                            </span>

                            <p className="text-lg font-medium text-black">
                                Setting
                            </p>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 bg-white hover:bg-slate-300 transition-all ease-linear cursor-pointer">
                            <span>
                                <FontAwesomeIcon
                                    icon={faSignOut}
                                    className="text-xl font-semibold text-red-500"
                                />
                            </span>

                            <p className="text-lg font-medium text-black">
                                Logout
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
