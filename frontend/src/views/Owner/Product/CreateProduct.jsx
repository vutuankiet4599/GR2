import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import TextEditor from "../../../components/common/TextEditor";
import ProductService from "../../../services/ProductService";
import { toast } from "react-toastify";
import ToastValidateError from "../../../services/ToastValidateError";
import CategoryService from "../../../services/CategoryService";

const CreateProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        quantity: 0,
        address: "",
    });
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [media, setMedia] = useState([]);
    const [productCategories, setProductCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllWithoutPaginate().then((response) => {
            setProductCategories(response.data);
        });
    }, []);

    const handleSetProduct = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleCreateProduct = () => {
        let myMedia = Object.keys(media).map((key) => media[key]);
        let data = {
            name: product.name,
            quantity: product.quantity,
            address: product.address,
            description: description,
            categories: categories,
            media: myMedia,
        };

        ProductService.insert(data)
            .then((response) => {
                setProduct({
                    name: "",
                    quantity: 0,
                    address: "",
                });
                setDescription("");
                setCategories([]);
                setMedia([]);
                toast.success(response.message);
            })
            .catch((error) => {
                console.log(error);
                ToastValidateError.toastAll(error);
            });
    };

    useEffect(() => {
        console.log(media);
    }, [media]);

    const handleSelectCategories = (e) => {
        const selectedValue = Array.from(e.target.selectedOptions, (option) => option.value);
        setCategories(selectedValue);
    };

    const handleSelectFiles = (e) => {
        setMedia(e.target.files);
    };

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
                    <div className="w-2/12">
                        <Input
                            required={true}
                            name="quantity"
                            label="Product quantity"
                            type="number"
                            value={product.quantity}
                            onChange={handleSetProduct}
                        />
                    </div>
                    <div className="w-2/12">
                        <Select
                            required
                            multiple
                            name="categories"
                            label="Product categories"
                            titles={productCategories.map((c) => c.name)}
                            values={productCategories.map((c) => c.id)}
                            style="w-full"
                            onchange={handleSelectCategories}
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
                    <div className="w-2/12">
                        <Input
                            type="file"
                            required
                            multiple
                            name="media"
                            onChange={handleSelectFiles}
                            label="Product images"
                        />
                    </div>
                </div>
                <div className="mb-8 flex h-fit w-full items-center justify-center">
                    <TextEditor
                        folder="products/description"
                        editorState={description}
                        setEditorState={setDescription}
                        label="Product description"
                    />
                </div>
                <Button title="Create" variant="success" onclick={handleCreateProduct} />
            </div>
        </div>
    );
};

export default CreateProduct;
