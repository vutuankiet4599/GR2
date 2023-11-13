import { faArrowLeft, faArrowRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";

const Banner = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextImage = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToImage = (imageIndex) => {
        setCurrentIndex(imageIndex);
    };
    return (
        <div className="group relative m-auto my-0 h-[450px] w-full max-w-[1400px]">
            <div
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
                className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
            ></div>
            <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
                <FontAwesomeIcon icon={faArrowLeft} onClick={prevImage} size="lg" />
            </div>
            <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
                <FontAwesomeIcon icon={faArrowRight} onClick={nextImage} size="lg" />
            </div>
            <div className="-mt-10 flex justify-center gap-4 py-2">
                {images.map((image, imageIndex) => (
                    <div
                        key={imageIndex}
                        onMouseOver={() => goToImage(imageIndex)}
                        className="cursor-pointer text-xs"
                    >
                        <FontAwesomeIcon
                            icon={faCircle}
                            className={` ${
                                currentIndex !== imageIndex ? "text-gray-800" : "text-white"
                            }`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

Banner.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Banner;
