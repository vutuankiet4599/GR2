import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Dropdown from "../../../components/common/Dropdown";
import Link from "../../../components/common/Link";
import Pagination from "../../../components/common/Pagination";
import Table from "../../../components/common/Table";
import OrderService from "../../../services/OrderService";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";

const handleGetOrders = (currentPage, setState, setPagination, setIsLoading) => {
    setIsLoading(true);
    OrderService.getAll(currentPage + 1)
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

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    };

    const handleUpdateOrderStatus = (index, newStatus) => {
        OrderService.updateStatus(orders[index].id, newStatus)
            .then((response) => {
                setOrders([]);
                setIsLoading(true);
                setPagination([]);
                toast.success(response.message);
                handleGetOrders(currentPage, setOrders, setPagination, setIsLoading);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    useEffect(() => {
        handleGetOrders(currentPage, setOrders, setPagination, setIsLoading);
    }, [currentPage]);

    return (
        <div className="relative flex flex-col gap-3">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">Order management</p>
            </div>
            <Table
                headers={[
                    "Order ID",
                    "User ordered",
                    "Product name",
                    "Status",
                    "Update status",
                    "Show detail",
                ]}
                data={orders.map((order, index) => {
                    return {
                        id: order.id,
                        user: order.user.email,
                        product: order.product.name,
                        status:
                            order.status == "pending" ? (
                                <Button variant={"info"} title="Pending" />
                            ) : order.status == "completed" ? (
                                <Button title="Completed" variant={"success"} />
                            ) : order.status == "rejected" ? (
                                <Button variant={"error"} title="Rejected" />
                            ) : (
                                <Button variant={"primary"} title="Accepted" />
                            ),
                        update: (
                            <Dropdown>
                                <div className="flex h-fit w-full flex-col items-center justify-center">
                                    <Button
                                        title="Pending"
                                        variant={"info"}
                                        onclick={() => handleUpdateOrderStatus(index, "pending")}
                                        style="w-full"
                                    />
                                    <Button
                                        title="Accepted"
                                        variant={"primary"}
                                        onclick={() => handleUpdateOrderStatus(index, "accepted")}
                                        style="w-full"
                                    />
                                    <Button
                                        title="Rejected"
                                        variant={"error"}
                                        onclick={() => handleUpdateOrderStatus(index, "rejected")}
                                        style="w-full"
                                    />
                                    <Button
                                        title="Completed"
                                        variant={"success"}
                                        onclick={() => handleUpdateOrderStatus(index, "completed")}
                                        style="w-full"
                                    />
                                </div>
                            </Dropdown>
                        ),
                        show: (
                            <Link link={`/owner/orders/${order.id}`}>
                                <Button title="Show" variant="info" />
                            </Link>
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
            <Loader isShow={isLoading} />
        </div>
    );
};

OrderList.propTypes = {};

export default OrderList;
