import SessionUtils from "./SessonUtils";

const CartUtils = {
    getCart: () => {
        let cart = SessionUtils.get("cart");
        if (cart) {
            return [];
        }
        return cart;
    },

    findItem: (product) => {
        return CartUtils.getCart().findIndex((item) => item.id == product.id);
    },

    insert: (product, quantity) => {
        let cart = CartUtils.getCart();

        let index = CartUtils.findItem(product);

        if (index === -1) {
            product = {
                ...product,
                cartQuantity: quantity,
            };
            cart.push(product);
        }

        cart[index].cartQuantity = cart[index].cartQuantity
            ? cart[index].cartQuantity
            : 0 + quantity;

        SessionUtils.set("cart", cart);
    },

    remove: (product) => {
        let index = CartUtils.findItem(product);

        if (index !== -1) {
            return false;
        }

        let cart = CartUtils.getCart();
        cart.splice(index, 1);
        SessionUtils.set("cart", cart);

        return true;
    },
};

export default CartUtils;
