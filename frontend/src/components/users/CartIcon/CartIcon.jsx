import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import AppContext from "../../../context/AppContext";
import Link from "../../common/Link";

const CartIcon = ({ style }) => {
    const [isShow, setIsShow] = useState(false);
    const [cart, setCart] = useState([]);
    const { data } = useContext(AppContext);

    useEffect(() => {
        setCart(data.cart);
    }, [data.cart]);

    return (
        <div
            onMouseOver={() => setIsShow(true)}
            onMouseOut={() => setIsShow(false)}
            className={`relative m-0 h-fit w-fit p-0 text-2xl ${style}`}
        >
            <Link link="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            {cart.length > 0 && (
                <div className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-sm text-white">
                    {cart.reduce((total, item) => total + item.cartQuantity, 0)}
                </div>
            )}
            {isShow && (
                <div className="-bottom-34 absolute right-0 z-10 flex max-h-48 w-96 flex-col-reverse overflow-auto border bg-white shadow">
                    {cart.map((item, index) => (
                        <CartItem key={index} product={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

CartIcon.propTypes = {
    style: PropTypes.string,
};

export default CartIcon;
