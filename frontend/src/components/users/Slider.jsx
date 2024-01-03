import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const Slider = ({ items }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <Carousel
                infinite={true}
                autoPlay={false}
                containerClass="carousel-container w-full mx-auto px-12"
                itemClass="carousel-image-item"
                autoPlaySpeed={6000}
                responsive={responsive}
            >
                {items.map((item, index) => (
                    <ProductCard product={item} key={index} />
                ))}
            </Carousel>
        </>
    );
};

Slider.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
};

export default Slider;
