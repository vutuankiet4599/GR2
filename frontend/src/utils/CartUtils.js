import SessionUtils from "./SessonUtils";

const CartUtils = {
    getCart: () => {
        let cart = SessionUtils.get("cart");
        if (!cart) {
            return [];
        }
        return cart;
    },

    findItem: (product) => {
        return CartUtils.getCart().findIndex((item) => item.id == product.id);
    },

    insert: (product, quantity) => {
        let token = SessionUtils.get("api-token");
        if (!token) {
            return {
                success: false,
                message: "You need to login",
            };
        }

        if (typeof quantity !== "number") {
            return {
                success: false,
                message: "Invalid quantity",
            };
        }

        if (product.quantity < quantity) {
            return {
                success: false,
                message: "Do not have enough products",
            };
        }

        let cart = CartUtils.getCart();

        let index = CartUtils.findItem(product);

        if (index === -1) {
            if (quantity <= 0) {
                return {
                    success: false,
                    message: "Quantity must be greater than zero",
                };
            }
            product = {
                ...product,
                cartQuantity: quantity,
            };
            cart.push(product);
        } else {
            cart[index].cartQuantity = cart[index].cartQuantity
                ? cart[index].cartQuantity + quantity
                : 0 + quantity;

            if (product.quantity < cart[index].cartQuantity) {
                return {
                    success: false,
                    message: "Do not have enough products",
                };
            }

            if (cart[index].cartQuantity < 0) {
                return {
                    success: false,
                    message: "Quantity must be greater than zero",
                };
            }
        }

        SessionUtils.set("cart", cart);

        return {
            success: true,
            message: "Added product successfully",
        };
    },

    update: (product, quantity) => {
        if (typeof quantity !== "number") {
            return {
                success: false,
                message: "Invalid quantity",
            };
        }

        if (product.quantity < quantity) {
            return {
                success: false,
                message: "Do not have enough products",
            };
        }

        let cart = CartUtils.getCart();

        let index = CartUtils.findItem(product);

        if (index === -1) {
            return {
                success: false,
                message: "Product is not in cart",
            };
        }

        if (cart[index].cartQuantity) {
            return {
                success: false,
                message: "Something went wrong",
            };
        }

        cart[index].cartQuantity = quantity;

        SessionUtils.set("cart", cart);

        return {
            success: true,
            message: "Product in cart updated successfully",
        };
    },

    remove: (product) => {
        let index = CartUtils.findItem(product);

        if (index == -1) {
            return {
                success: false,
                message: "Product do not exist in cart",
            };
        }

        let cart = CartUtils.getCart();
        cart.splice(index, 1);
        SessionUtils.set("cart", cart);

        return {
            success: true,
            message: "Delete product from cart successfully",
        };
    },

    deleteCart: () => {
        SessionUtils.delete("cart");
    },
};

export default CartUtils;
