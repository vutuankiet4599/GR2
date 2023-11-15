import PropTypes from "prop-types";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "../common/Image";

const ThumbnailSlider = ({ images, containerClass, imageSlideClass, previewSlideClass }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const thumbsSwiperRef = useRef(null);

    useEffect(() => {
        if (thumbsSwiperRef.current) {
            setThumbsSwiper(thumbsSwiperRef.current);
        }
    }, [thumbsSwiperRef]);

    return (
        <div className={containerClass}>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image src={image.link} style={imageSlideClass} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="preview mt-2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image src={image.link} style={previewSlideClass} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

ThumbnailSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    containerClass: PropTypes.string,
    imageSlideClass: PropTypes.string,
    previewSlideClass: PropTypes.string,
};

export default ThumbnailSlider;
