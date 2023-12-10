import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import { toast } from "react-toastify";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";

const DetailOrder = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState({});
    const [isShowModal, setIsShowModal] = useState(false);
    const navigate = useNavigate();

    const handleToggleModal = () => {
        setIsShowModal(!isShowModal);
    };

    const handleDeleteOrders = () => {
        OrderService.delete(id)
            .then((response) => {
                toast.success(response.message);
                navigate("/owner/orders");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    useEffect(() => {
        OrderService.find(id)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, [id]);
    return (
        <div className="relative flex flex-col gap-5">
            <div className="flex h-fit w-full flex-col items-start justify-center gap-5 border px-12 py-6 shadow">
                <div className="flex w-full">
                    <div className="flex w-1/2 flex-col items-start justify-start">
                        <p className="mb-5 text-xl font-bold">User ordered</p>
                        <p>
                            <b>User name:</b> <span>{orders?.user?.name}</span>
                        </p>
                        <p>
                            <b>User email:</b> <span>{orders?.user?.email}</span>
                        </p>
                        <p>
                            <b>User phone:</b> <span>{orders?.user?.phone}</span>
                        </p>
                    </div>
                    <div className="flex w-1/2 flex-col items-start justify-start">
                        <p className="mb-5 text-xl font-bold">Ordered product</p>
                        <p>
                            <b>Name:</b> <span>{orders?.product?.name}</span>
                        </p>
                        <p>
                            <b>Quantity:</b> <span>{orders?.product?.quantity}</span>
                        </p>
                        <p>
                            <b>Order quantity:</b> <span>{orders?.quantity}</span>
                        </p>
                    </div>
                </div>
                <div className="flex w-full gap-5">
                    <Button title="Delete" variant={"error"} onclick={handleToggleModal} />
                    <Button
                        title="Back"
                        variant={"info"}
                        onclick={() => navigate("/owner/orders")}
                    />
                </div>
            </div>

            <Modal isShow={isShowModal} title="Delete product" close={handleToggleModal}>
                <div className="flex flex-col items-center justify-center gap-3 py-6">
                    <p className="text-xl font-bold">Are you sure to delete this order</p>
                    <div className="flex w-1/4 items-center justify-between">
                        <Button title="Yes" variant="error" onclick={handleDeleteOrders} />
                        <Button title="No" variant="secondary" onclick={handleToggleModal} />
                    </div>
                </div>
            </Modal>
            <Loader isShow={Object.keys(orders).length === 0} />
        </div>
    );
};

export default DetailOrder;
