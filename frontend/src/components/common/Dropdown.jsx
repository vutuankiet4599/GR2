import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";

const Dropdown = ({ title = "Dropdown", children, style }) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <div
            className={`relative h-16 w-48 cursor-pointer rounded-md border border-blue-500 bg-white text-zinc-800 shadow transition ease-linear hover:border-indigo-500 focus:border-violet-500 focus:outline-none ${style}`}
            onClick={() => setIsShow(!isShow)}
        >
            <div className="flex items-center justify-between px-6 py-4">
                <p className="text-lg font-bold">{title}</p>
                <FontAwesomeIcon icon={isShow ? faAngleUp : faAngleDown} />
            </div>
            <div className="absolute z-10 flex w-full flex-wrap items-center justify-center">
                {isShow && children}
            </div>
        </div>
    );
};

Dropdown.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    style: PropTypes.string,
};

export default Dropdown;
