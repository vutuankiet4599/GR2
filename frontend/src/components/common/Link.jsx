import PropTypes from "prop-types";
import { Link as ReactLink } from "react-router-dom";

const Link = ({ link, children, style }) => {
    return (
        <ReactLink to={link} className={`text-lg font-light no-underline ${style}`}>
            {children}
        </ReactLink>
    );
};

Link.propTypes = {
    link: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    style: PropTypes.string,
};

export default Link;
