import PropTypes from "prop-types";
import Image from "../common/Image";
import Button from "../common/Button";
import Link from "../common/Link";
const ProductCard = ({ product }) => {
    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log("Added with event: " + e);
    };
    return (
        <Link link={`/products/${product.id}`}>
            <div className="flex h-fit w-60 flex-col items-center justify-start gap-5 border bg-white p-0 shadow">
                <Image
                    src={
                        product.media
                            ? product.media[0].link
                                ? product.media[0].link
                                : "/product.jpg"
                            : "/product.jpg"
                    }
                    style={"w-full border h-54"}
                />
                <p className="text-xl font-bold">{product.name}</p>
                <p className="flex h-fit w-full flex-wrap items-center justify-center gap-3 text-lg">
                    <span>{product.quantity}</span>
                    {product.quantity > 0 ? (
                        <span className="block h-fit w-fit border bg-green-500 px-2 text-white">
                            Available
                        </span>
                    ) : (
                        <span className="block h-fit w-fit border bg-red-600 px-2 text-white">
                            Out of stock
                        </span>
                    )}
                </p>
                <Button
                    variant="user"
                    title="Add to cart"
                    style={"w-full rounded-none text-base p-1"}
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
