import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

const CartIcon = ({ style }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <div
            onMouseOver={() => setIsShow(true)}
            onMouseOut={() => setIsShow(false)}
            className={`relative m-0 h-fit w-fit p-0 text-2xl ${style}`}
        >
            <FontAwesomeIcon icon={faCartShopping} />
            <div className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                2
            </div>
            {isShow && (
                <div className="-bottom-34 absolute right-0 z-10 flex max-h-48 w-96 flex-col-reverse overflow-auto border bg-white shadow">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
            )}
        </div>
    );
};

CartIcon.propTypes = {
    style: PropTypes.string,
};

export default CartIcon;
