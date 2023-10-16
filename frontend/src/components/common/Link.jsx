import PropTypes from "prop-types";
import { Link as ReactLink } from "react-router-dom";

const Link = ({ link, title, style }) => {
    return (
        <ReactLink
            to={link}
            className={`no-underline text-lg font-light ${style}`}
        >
            {title}
        </ReactLink>
    );
};

Link.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.string,
};

export default Link;
