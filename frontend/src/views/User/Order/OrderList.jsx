import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import authAPI from "../../../api/authAPI";
import Pagination from "../../../components/common/Pagination";
import Loader from "../../../components/common/Loader";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    };

    const handleOpenModal = (id) => {
        setSelectedOrder(id);
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setIsShowModal(false);
    };

    const handleDeleteOrder = async () => {
        setIsLoading(true);
        try {
            let response = await authAPI.delete(`/orders/${selectedOrder}`);
            handleCloseModal();
            let _response = await authAPI.get("/orders", {
                params: {
                    page: currentPage,
                },
            });
            setOrders(_response.data.data);
            setPagination(_response.data.meta);
            toast.success(response.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let response = await authAPI.get("/orders", {
                    params: {
                        page: currentPage,
                    },
                });
                setOrders(response.data.data);
                setPagination(response.data.meta);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    return (
        <div className="relative mx-auto flex min-h-screen w-2/3 flex-col gap-5 px-8 py-6">
            <div className="flex h-fit w-full flex-col items-center justify-center gap-3">
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="flex h-28 w-full flex-row gap-0 rounded bg-slate-200 px-3 py-2"
                    >
                        <div className="h-24 w-24 p-0">
                            <Image
                                src={
                                    order.product?.media[0]?.link
                                        ? order.product.media[0]?.link
                                        : "/product.png"
                                }
                                style={"w-full h-full"}
                            />
                        </div>
                        <div className="flex grow justify-around px-6 py-2 text-lg">
                            <div className="flex flex-col items-start justify-start">
                                <div className="break-words text-2xl font-bold">
                                    {order.product?.name}
                                </div>
                                <div className="break-words">Order number: {order.quantity}</div>
                                <div className="break-words">{order.product?.address}</div>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <div className="break-words">
                                    Order at: {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                                <div className="break-words text-white">
                                    {order.status === "pending" && (
                                        <p className="bg-blue-500 px-1 py-2 hover:bg-blue-600 active:bg-blue-700">
                                            Pending
                                        </p>
                                    )}
                                    {order.status === "rejected" && (
                                        <p className="bg-red-500 px-1 py-2 hover:bg-red-600 active:bg-red-700">
                                            Rejected
                                        </p>
                                    )}
                                    {order.status === "accepted" && (
                                        <p className="bg-indigo-500 px-1 py-2 hover:bg-indigo-600 active:bg-indigo-700">
                                            Accepted
                                        </p>
                                    )}
                                    {order.status === "completed" && (
                                        <p className="bg-green-500 px-1 py-2 hover:bg-green-600 active:bg-green-700">
                                            Completed
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button
                                variant={"error"}
                                title="Delete"
                                onclick={() => handleOpenModal(order.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
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
            <Loader isShow={isLoading} />
            <Modal isShow={isShowModal} close={handleCloseModal} title="Delete order">
                <div className="flex flex-col items-center justify-center gap-3 py-6">
                    <p className="text-xl font-bold">Are you sure to delete this order?</p>
                    <div className="flex w-1/4 items-center justify-between">
                        <Button title="Yes" variant="error" onclick={handleDeleteOrder} />
                        <Button title="No" variant="secondary" onclick={handleCloseModal} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OrderList;
