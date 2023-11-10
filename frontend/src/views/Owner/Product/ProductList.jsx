import { useEffect, useState } from "react";
import Pagination from "../../../components/common/Pagination";
import Table from "../../../components/common/Table";
import Loader from "../../../components/common/Loader";
import ProductService from "../../../services/ProductService";
import Link from "../../../components/common/Link";
import Button from "../../../components/common/Button";
import Image from "../../../components/common/Image";
import { toast } from "react-toastify";
import Dropdown from "../../../components/common/Dropdown";
import Modal from "../../../components/common/Modal";

const handleGetProductsAndSetState = (currentPage, setState, setPagination, setIsLoading) => {
    setIsLoading(true);
    ProductService.getProductsOfCurrentUser(currentPage + 1)
        .then((response) => {
            console.log(response.data.data);
            setState(response.data.data);
            setPagination(response.data.meta);
            setIsLoading(false);
        })
        .catch((error) => {
            toast.error(error.message);
            setIsLoading(false);
        });
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(-1);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        handleGetProductsAndSetState(currentPage, setProducts, setPagination, setIsLoading);
    }, [currentPage]);

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    };

    const handleToggleDeleteModal = (index) => {
        setSelectedProduct(index);
        setIsShowModal(!isShowModal);
    };

    const handleDeleteProduct = () => {
        ProductService.delete(products[selectedProduct].id)
            .then((response) => {
                setProducts([]);
                setPagination([]);
                setIsLoading(true);
                toast.success(response.message);
                handleGetProductsAndSetState(currentPage, setProducts, setPagination, setIsLoading);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
        handleToggleDeleteModal(selectedProduct);
    };

    return (
        <div className="relative flex flex-col gap-3">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">Product management</p>
            </div>
            <Link link="/owner/products/create">
                <Button title="Create" variant="success" />
            </Link>
            <Table
                headers={["Image", "Name", "Quantity", "Action"]}
                data={products?.map((product, index) => {
                    return {
                        image:
                            product.media.length > 0 ? (
                                <Image
                                    src={product.media[0]["link"]}
                                    alt="Product"
                                    style="w-16 h-16"
                                />
                            ) : (
                                <Image src="/product.jpg" alt="Product" style="w-16 h-16" />
                            ),
                        name: product.name,
                        quantity: product.quantity,
                        action: (
                            <Dropdown>
                                <div className="flex h-fit w-full flex-col items-center justify-center">
                                    <Link
                                        link={`/owner/products/edit/${product.id}`}
                                        style={"w-full"}
                                    >
                                        <Button title="Edit" variant="info" style={"w-full"} />
                                    </Link>
                                    <Link link={`/owner/products/${product.id}`} style={"w-full"}>
                                        <Button title="Show" variant="secondary" style={"w-full"} />
                                    </Link>
                                    <Button
                                        title="Delete"
                                        variant="error"
                                        onclick={() => handleToggleDeleteModal(index)}
                                        style={"w-full"}
                                    />
                                </div>
                            </Dropdown>
                        ),
                    };
                })}
            />
            {Object.keys(pagination).length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                    pageCount={pagination.last_page}
                    perPage={pagination.per_page}
                    total={pagination.total}
                    to={pagination.to}
                />
            )}
            <Modal
                isShow={isShowModal}
                title="Delete category"
                close={() => handleToggleDeleteModal(selectedProduct)}
            >
                <div className="flex flex-col items-center justify-center gap-3 py-6">
                    <p className="text-xl font-bold">
                        Are you sure to delete {products[selectedProduct]?.name} product
                    </p>
                    <div className="flex w-1/4 items-center justify-between">
                        <Button title="Yes" variant="error" onclick={handleDeleteProduct} />
                        <Button
                            title="No"
                            variant="secondary"
                            onclick={() => handleToggleDeleteModal(selectedProduct)}
                        />
                    </div>
                </div>
            </Modal>
            <Loader isShow={isLoading} />
        </div>
    );
};

export default ProductList;
