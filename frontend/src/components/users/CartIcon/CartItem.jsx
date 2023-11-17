import PropTypes from "prop-types";
import Image from "../../common/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CartUtils from "../../../utils/CartUtils";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { toast } from "react-toastify";

const CartItem = ({ product }) => {
    const { action } = useContext(AppContext);

    const handleRemoveCartItem = () => {
        let response = CartUtils.remove(product);
        if (response.success) {
            action.setCart(CartUtils.getCart());
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className="min-h-12 m-0 flex w-full items-center justify-center border-b p-0 duration-500 hover:bg-slate-100">
            <Image
                src={
                    product.media
                        ? product.media[0].link
                            ? product.media[0].link
                            : "/product.jpg"
                        : "/product.jpg"
                }
                style={"w-12 h-12 border-r"}
            />
            <p className="text-wrap h-12 flex-grow px-2 text-lg font-medium text-zinc-900">
                {product.name}
            </p>
            <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center border-l"
                onClick={handleRemoveCartItem}
            >
                <FontAwesomeIcon icon={faXmark} className="text-orange-400" size="lg" />
            </div>
        </div>
    );
};

CartItem.propTypes = {
    product: PropTypes.object,
};

export default CartItem;
