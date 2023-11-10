import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import HtmlUtils from "../../../utils/HtmlUtils";
import Image from "../../../components/common/Image";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";
import Link from "../../../components/common/Link";

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        quantity: -1,
        address: "",
        media: [],
        description: "",
        categories: [],
    });
    const [isShowModal, setIsShowModal] = useState(false);

    const handleToggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    useEffect(() => {
        ProductService.getOneById(id)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch((error) => toast.error(error.message));
    }, [id]);

    const handleDeleteProduct = () => {
        ProductService.delete(id)
            .then((response) => {
                toast.success(response.message);
                redirect("/owner/products");
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <div className="relative flex flex-col gap-5">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">
                    Product detail of {`${product.name}`}
                </p>
            </div>
            <div className="flex h-fit w-full flex-col items-start justify-center gap-5 border px-12 py-6 shadow">
                <div className="flex w-full items-start justify-start gap-12">
                    <table cellPadding={"20px"} className="w-full">
                        <tbody>
                            <tr className="border">
                                <td className="w-48 border-r text-lg font-light">Name</td>
                                <td className="text-lg font-light">{product.name}</td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Quantity</td>
                                <td className="text-lg font-light">{product.quantity}</td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Place to exchange</td>
                                <td className="text-lg font-light">{product.address}</td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Category</td>
                                <td className="text-lg font-light">
                                    {product.categories
                                        ?.map((category) => category.name)
                                        .join(", ")}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Action</td>
                                <td className="flex items-center justify-start gap-5">
                                    <Link link={`/owner/products/edit/${id}`}>
                                        <Button variant="info" title="Edit" />
                                    </Link>
                                    <Button
                                        variant="error"
                                        title="Delete"
                                        onclick={handleDeleteProduct}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="w-full border-b text-lg font-medium">Description</p>
                <div className="m-0 flex h-fit w-full flex-wrap items-center justify-start bg-white p-0">
                    {HtmlUtils.parser(product.description)}
                </div>
                <p className="w-full border-b text-lg font-medium">Media library</p>
                <div className="m-0 flex h-fit w-full flex-wrap items-center justify-start gap-5 bg-white p-0">
                    {product.media?.map((media, index) => (
                        <Image key={index} src={media.link} alt={`Media ${index}`} />
                    ))}
                </div>
            </div>
            <Modal isShow={isShowModal} title="Delete product" close={handleToggleModal}>
                <div className="flex flex-col items-center justify-center gap-3 py-6">
                    <p className="text-xl font-bold">Are you sure to delete this product</p>
                    <div className="flex w-1/4 items-center justify-between">
                        <Button title="Yes" variant="error" onclick={handleDeleteProduct} />
                        <Button title="No" variant="secondary" onclick={handleToggleModal} />
                    </div>
                </div>
            </Modal>
            <Loader isShow={product === null} />
        </div>
    );
};

export default DetailProduct;
