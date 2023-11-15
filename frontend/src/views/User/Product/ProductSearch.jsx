import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import Button from "../../../components/common/Button";
import Pagination from "../../../components/common/Pagination";
import ProductCard from "../../../components/users/ProductCard";
import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import ToastValidateError from "../../../services/ToastValidateError";
import CategoryService from "../../../services/CategoryService";

const ProductSearch = () => {
    const [params, setParams] = useState({
        search: "",
        categories: [],
        address: "",
        owner: "",
        date: null,
    });

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleSetParams = (e) => {
        setParams({
            ...params,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectCategories = (e) => {
        const selectedValue = Array.from(e.target.selectedOptions, (option) => option.value);
        setParams({
            ...params,
            categories: selectedValue,
        });
    };

    const handleSearch = () => {
        setSearchParams(params);
    };

    useEffect(() => {
        setIsLoading(true);
        ProductService.search(searchParams, currentPage)
            .then((response) => {
                console.log(response);
                setProducts(response.data.data);
                setPagination(response.data.meta);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
                console.log(err.response.data.message);
                ToastValidateError.toastAll(err);
            });
    }, [searchParams, currentPage]);

    useEffect(() => {
        CategoryService.getAllWithoutPaginate()
            .then((response) => setCategories(response.data))
            .catch((err) => {
                ToastValidateError.toastAll(err);
            });
    }, []);

    return (
        <div className="-my-4 flex min-h-screen w-full flex-col items-center justify-start gap-8 bg-slate-100 px-12 py-8 text-zinc-900">
            <div className="flex w-full flex-col items-start justify-start gap-0 bg-white px-8 py-6">
                <p className="mb-8 w-full text-2xl font-bold text-orange-500">Search</p>
                <div className="flex w-full gap-5">
                    <Input
                        name="search"
                        placeholder="Product info here"
                        style="w-10/12"
                        label="What you want to search"
                        onChange={handleSetParams}
                    />
                    <Select
                        titles={categories.map((category) => category.name)}
                        values={categories.map((category) => category.id)}
                        label="Categories"
                        style="w-2/12"
                        multiple
                        onchange={handleSelectCategories}
                    />
                </div>
                <div className="flex w-full gap-5">
                    <Input
                        name="address"
                        placeholder="Where you want to exchange"
                        label="Address"
                        style="w-8/12"
                        onChange={handleSetParams}
                    />
                    <Input
                        name="owner"
                        placeholder="Owner of products"
                        label="Owner"
                        style="w-4/12"
                        onChange={handleSetParams}
                    />
                </div>
                <div className="mt-8 flex w-full gap-5">
                    <div className="flex w-1/2 flex-col gap-2.5">
                        <p className="text-xl font-medium">Sort by date</p>
                        <div className="flex gap-3">
                            <Input
                                name="date"
                                value={true}
                                label="Newest first"
                                type="radio"
                                onChange={handleSetParams}
                                isChecked={params.date === "true"}
                            />
                            <Input
                                name="date"
                                value={false}
                                label="Oldest first"
                                type="radio"
                                onChange={handleSetParams}
                                isChecked={params.date === "false"}
                            />
                        </div>
                    </div>
                    <div className="flex w-1/2 flex-col gap-2.5">
                        <p className="text-xl font-medium">Quantity available</p>
                        <div className="flex gap-3">
                            <Input
                                name="orders"
                                value={true}
                                label="Avaiable first"
                                type="radio"
                                onChange={handleSetParams}
                                isChecked={params.orders === "true"}
                            />
                            <Input
                                name="orders"
                                value={false}
                                label="Not avaiable first"
                                type="radio"
                                onChange={handleSetParams}
                                isChecked={params.orders === "false"}
                            />
                        </div>
                    </div>
                </div>
                <Button title="Search" variant="user" style="w-48 mt-8" onclick={handleSearch} />
            </div>
            <div className="relative flex h-fit w-full flex-col gap-5 gap-y-8 bg-white px-12 py-8">
                <p className="text-2xl font-bold text-orange-500">Search result</p>
                <div className="mx-auto inline-flex min-h-fit w-full flex-wrap gap-x-[31px] gap-y-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={{
                                id: product.id,
                                name: product.name,
                                quantity: product.quantity,
                                media: product.media,
                            }}
                        />
                    ))}
                </div>
                {pagination && Object.keys(pagination).length > 0 && (
                    <Pagination
                        variant="user"
                        currentPage={currentPage}
                        handleChangePage={(e) => setCurrentPage(e.selected)}
                        pageCount={pagination.last_page}
                        perPage={pagination.per_page}
                        total={pagination.total}
                        to={pagination.to}
                    />
                )}
                <Loader isShow={isLoading} />
            </div>
        </div>
    );
};

ProductSearch.propTypes = {};

export default ProductSearch;
