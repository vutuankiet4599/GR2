import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const SidebarItem = ({ icon, title, link, isShow = true }) => {
    return (
        <Link to={link} className="w-full">
            <div className="rounded-md px-6 py-4 m-0 flex gap-3 items-center justify-start text-xl hover:bg-white hover:text-black bg-indigo-400 text-white transition-all duration-300 ease-linear">
                {icon && (
                    <div>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                )}
                {isShow && <div>{title}</div>}
            </div>
        </Link>
    );
};

SidebarItem.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    link: PropTypes.string,
    isShow: PropTypes.bool,
};
