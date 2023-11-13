import PropTypes from "prop-types";
import Image from "../../common/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ image }) => {
    return (
        <div className="min-h-12 m-0 flex w-full items-center justify-center border-b p-0 duration-500 hover:bg-slate-100">
            <Image src={image ? image : "/product.jpg"} style={"w-12 h-12 border-r"} />
            <p className="text-wrap h-12 flex-grow px-2 text-lg font-medium text-zinc-900">
                Product name
            </p>
            <div className="flex h-12 w-12 cursor-pointer items-center justify-center border-l">
                <FontAwesomeIcon icon={faXmark} className="text-orange-400" size="lg" />
            </div>
        </div>
    );
};

CartItem.propTypes = {
    image: PropTypes.string,
};

export default CartItem;
