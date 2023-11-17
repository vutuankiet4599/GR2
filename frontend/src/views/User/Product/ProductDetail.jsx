import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Button from "../../../components/common/Button";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ThumbnailSlider from "../../../components/users/ThumbnailSlider";
import Input from "../../../components/common/Input";
import CartUtils from "../../../utils/CartUtils";
import { toast } from "react-toastify";
import AppContext from "../../../context/AppContext";
import OrderService from "../../../services/OrderService";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [cartQuantity, setCartQuantity] = useState(1);
    const { action } = useContext(AppContext);

    useEffect(() => {
        ProductService.getOneById(id)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleAddToCart = () => {
        let res = CartUtils.insert(product, parseInt(cartQuantity));
        if (res.success) {
            action.setCart(CartUtils.getCart());
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    const handleOrderNow = () => {
        let orderProduct = product;
        orderProduct["cartQuantity"] = 1;

        OrderService.insert(orderProduct)
            .then((response) => {
                toast.success(response.message);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="-my-4 flex min-h-screen w-full flex-col items-center justify-start bg-slate-50 px-12 py-8 text-zinc-900">
            <div className="mb-8 flex w-full border bg-white px-8 py-6">
                <p className="text-4xl font-bold text-orange-500">Product detail page</p>
            </div>
            <div className="flex w-full flex-col gap-5 border bg-white px-8 py-6 shadow">
                <div className="flex w-full items-center gap-0">
                    <div className="m-0 h-fit w-2/5 p-0">
                        <ThumbnailSlider
                            images={product.media ? product.media : []}
                            containerClass={"w-full h-full"}
                            imageSlideClass={"w-full h-[400px]"}
                            previewSlideClass={"w-24 h-24"}
                        />
                    </div>
                    <div className="m-0 flex h-full w-3/5 flex-col items-start justify-start gap-5 px-8 py-6">
                        <h1 className="w-full break-words text-4xl font-bold text-orange-500">
                            {product.name}
                        </h1>
                        <table cellPadding={20}>
                            <tr>
                                <td className="text-xl font-bold">Categories</td>
                                <td className="flex flex-wrap gap-3 text-lg font-medium">
                                    {product.categories?.map((category) => (
                                        <div key={category.id} className="border px-4 py-3 shadow">
                                            {category.name}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-xl font-bold">Quantity</td>
                                <td className="text-lg font-medium">{product.quantity}</td>
                            </tr>
                            <tr>
                                <td className="text-xl font-bold">Address</td>
                                <td className="text-lg font-medium">{product.address}</td>
                            </tr>
                            <tr>
                                <td className="text-xl font-bold">Owner</td>
                                <td className="text-lg font-medium">{product.user?.name}</td>
                            </tr>
                            <tr>
                                <td className="text-xl font-bold">Number to order</td>
                                <td className="text-lg font-medium">
                                    <Input
                                        type="number"
                                        value={cartQuantity}
                                        onChange={(e) => setCartQuantity(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </table>
                        <div className="flex items-center justify-start gap-5">
                            <Button
                                title="Add to cart"
                                variant="outline_user"
                                onclick={handleAddToCart}
                            />
                            <Button title="Buy now" variant="user" onclick={handleOrderNow} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <p className="text-xl font-bold">Description</p>
                    <ReactQuill value={product.description} readOnly theme="bubble" />
                </div>
            </div>
        </div>
    );
};

ProductDetail.propTypes = {};

export default ProductDetail;
