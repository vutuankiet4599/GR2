import Table from "../../../components/common/Table";
import Image from "../../../components/common/Image";
import Input from "../../../components/common/Input";
import { useContext, useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import AppContext from "../../../context/AppContext";
import CartUtils from "../../../utils/CartUtils";
import { toast } from "react-toastify";
import OrderService from "../../../services/OrderService";
import ToastValidateError from "../../../services/ToastValidateError";

const Cart = () => {
    const { data, action } = useContext(AppContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(data.cart);
    }, [data.cart]);

    const handleChangeCartQuantity = (e, index) => {
        let newCart = [...cart];
        newCart[index].cartQuantity = e.target.value;
        setCart(newCart);
    };

    const handleUpdateCart = () => {
        cart.map((product) => {
            CartUtils.update(product, product.cartQuantity);
        });
        action.setCart(cart);
        toast.success(`Cart updated successfully`);
    };

    const handleRemoveFromCart = (product) => {
        let response = CartUtils.remove(product);
        if (response.success) {
            let newCart = CartUtils.getCart();
            action.setCart(newCart);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const handleOrder = () => {
        OrderService.insert(cart)
            .then((response) => {
                action.setCart([]);
                CartUtils.deleteCart();
                toast.success(response.message);
            })
            .catch((error) => {
                ToastValidateError.toastAll(error);
            });
    };

    return (
        <div className="-my-4 flex min-h-screen w-full flex-col items-center justify-start bg-slate-50 px-12 py-8 text-zinc-900">
            <div className="mb-8 flex w-full border bg-white px-8 py-6">
                <p className="text-4xl font-bold text-orange-500">Cart page</p>
            </div>
            <div className="flex w-full gap-3">
                <div className="flex w-2/3 flex-col gap-3 border bg-white px-8 py-6">
                    <Table
                        headers={[
                            "No.",
                            "Product image",
                            "Product name",
                            "Order quantity",
                            "Remove",
                        ]}
                        data={cart.map((item, index) => ({
                            no: item.id,
                            image: (
                                <Image
                                    src={
                                        item.media
                                            ? item.media[0].link
                                                ? item.media[0].link
                                                : "/product.jpg"
                                            : "/product.jpg"
                                    }
                                    style="w-24 h-24"
                                />
                            ),
                            name: item.name,
                            quantity: (
                                <Input
                                    type="number"
                                    value={item.cartQuantity}
                                    onChange={(e) => handleChangeCartQuantity(e, index)}
                                />
                            ),
                            remove: (
                                <Button
                                    title="Remove"
                                    variant="error"
                                    onclick={() => handleRemoveFromCart(item)}
                                />
                            ),
                        }))}
                    />
                    <Button
                        title="Update"
                        variant="user"
                        style={"w-48"}
                        onclick={handleUpdateCart}
                    />
                </div>
                <div className="flex h-fit w-1/3 flex-col gap-3 border bg-white px-8 py-6">
                    <p className="text-2xl font-bold text-orange-500">Cart detail</p>
                    {cart.length > 0 && (
                        <>
                            <div className="flex items-center justify-start gap-5">
                                <p className="text-lg font-bold">Total of number products:</p>
                                <p className="text-lg font-medium">
                                    {
                                        cart.reduce((total, item) => {
                                            return total.cartQuantity + item.cartQuantity;
                                        }).cartQuantity
                                    }
                                </p>
                            </div>
                            <div className="flex flex-col items-start justify-center gap-1">
                                <p className="text-lg font-bold">Where you need to go:</p>
                                {cart.map((item, index) => (
                                    <p key={index} className="text-lg font-medium">
                                        {item.address}
                                    </p>
                                ))}
                                <Button
                                    title="Order now"
                                    variant="success"
                                    style="mt-5"
                                    onclick={handleOrder}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {};

export default Cart;
