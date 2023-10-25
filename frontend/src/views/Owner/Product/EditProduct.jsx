import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import TextEditor from "../../../components/common/TextEditor";
import ProductService from "../../../services/ProductService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        quantity: 0,
        address: "",
    });
    const [description, setDescription] = useState("");

    const handleSetProduct = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleUpdateProduct = () => {
        let data = {
            ...product,
            description: description,
        };

        ProductService.update(id, data)
            .then((response) => {
                toast.success(response.message);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };

    useEffect(() => {
        ProductService.getOneById(id)
            .then((response) => {
                setProduct(response.data);
                setDescription(response.data.description);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, [id]);

    return (
        <div className="relative flex flex-col gap-3">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">Create new product</p>
            </div>
            <div className="flex w-full flex-col gap-8 border p-8">
                <div className="flex w-full gap-3">
                    <div className="w-8/12">
                        <Input
                            required={true}
                            name="name"
                            label="Product name"
                            value={product.name}
                            style="w-full"
                            onChange={handleSetProduct}
                        />
                    </div>
                    <div className="w-4/12">
                        <Input
                            required={true}
                            name="quantity"
                            label="Product quantity"
                            type="number"
                            value={product.quantity}
                            onChange={handleSetProduct}
                        />
                    </div>
                </div>
                <div className="flex w-full gap-3">
                    <div className="w-10/12">
                        <Input
                            required={true}
                            name="address"
                            label="Place to exchange product"
                            value={product.address}
                            onChange={handleSetProduct}
                        />
                    </div>
                </div>
                <div className="mb-8 flex h-fit w-full items-center justify-center">
                    <TextEditor
                        editorState={description}
                        setEditorState={setDescription}
                        label="Product description"
                    />
                </div>
                <Button title="Update" variant="info" onclick={handleUpdateProduct} />
            </div>
        </div>
    );
};

export default EditProduct;
