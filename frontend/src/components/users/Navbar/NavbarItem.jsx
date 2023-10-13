import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const NavbarItem = ({ title = "", link = "#", icon, style }) => {
    return (
        <Link to={link}>
            <div
                className={`w-fit h-full px-4 py-3 flex items-center justify-center text-xl ${style}`}
            >
                <div className="flex gap-2">
                    {icon && <FontAwesomeIcon icon={icon} />}
                    <p>{title}</p>
                </div>
            </div>
        </Link>
    );
};

NavbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.object,
    style: PropTypes.string,
};
