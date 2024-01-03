import PropTypes from "prop-types";
import Image from "../common/Image";
import Button from "../common/Button";
import Link from "../common/Link";
import CartUtils from "../../utils/CartUtils";
import { toast } from "react-toastify";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import ReactStars from "react-rating-star-with-type";

const ProductCard = ({ product }) => {
    const { action } = useContext(AppContext);

    const handleAddToCart = (e) => {
        e.preventDefault();
        let res = CartUtils.insert(product, 1);
        if (res.success) {
            action.setCart(CartUtils.getCart());
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Link link={`/products/${product.id}`}>
            <div className="relative flex h-[26rem] w-60 flex-col items-start justify-start gap-5 overflow-hidden border bg-white p-0 shadow">
                <Image
                    src={
                        product.media
                            ? product.media[0].link
                                ? product.media[0].link
                                : "/product.jpg"
                            : "/product.jpg"
                    }
                    style={"w-full border h-56"}
                />
                <div className="line-clamp-2 max-h-14 w-full text-ellipsis px-5 text-xl font-bold">
                    <p className="h-full w-full">{product.name}</p>
                </div>
                <div className="flex justify-start">
                    <ReactStars
                        value={product.avgRating ? product.avgRating : 0}
                        activeColors={["#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00"]}
                        size={24}
                        isEdit={false}
                        classNames="ps-5"
                    />
                    <p>({product.reviewsCount})</p>
                </div>
                {/* <p className="flex h-fit w-full flex-wrap items-center justify-center gap-3 text-lg"> */}
                <div className="absolute left-0 top-0 h-16 w-16">
                    {product.quantity > 0 ? (
                        // <span className="absolute block h-fit w-fit border bg-green-500 px-2 text-white">
                        <span className="absolute left-[-40px] top-[32px] w-[170px] -rotate-45 transform bg-green-500 text-center text-white">
                            Available
                        </span>
                    ) : (
                        <span className="absolute left-[-40px] top-[32px] w-[170px] -rotate-45 transform bg-green-600 text-center text-white">
                            Out of stock
                        </span>
                    )}
                </div>
                <Button
                    variant="user"
                    title="Add to cart"
                    style={"w-full rounded-none text-base p-1 bottom-0 absolute"}
                    onclick={handleAddToCart}
                />
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
