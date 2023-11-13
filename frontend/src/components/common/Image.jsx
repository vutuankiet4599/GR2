import PropTypes from "prop-types";

const Image = ({ src, loading, alt, style }) => {
    return (
        <div className={`m-0 p-0 ${style} overflow-hidden`}>
            <img
                src={src}
                alt={alt}
                loading={loading ? loading : "lazy"}
                className="h-full w-full object-cover"
            />
        </div>
    );
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    loading: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.string,
};

export default Image;
