import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import Pagination from "../../../components/common/Pagination";
import { toast } from "react-toastify";
import Dropdown from "../../../components/common/Dropdown";
import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import Link from "../../../components/common/Link";
import RoleService from "../../../services/RoleService";
import ToastValidateError from "../../../services/ToastValidateError";

const handleGetUsersAndSetState = (currentPage, setState, setPagination, setIsLoading) => {
    UserService.getAll(currentPage + 1)
        .then((response) => {
            setState(response.data.data);
            setPagination(response.data.meta);
            setIsLoading(false);
        })
        .catch((error) => {
            toast.error(error.message);
            setIsLoading(false);
        });
};

const handleGetRoles = (setRoles) => {
    RoleService.getAll().then((response) => {
        setRoles(response.data);
    });
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [createdUser, setCreatedUser] = useState({
        name: "",
        email: "",
        phone: "",
        role: -1,
    });
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        handleGetUsersAndSetState(currentPage, setUsers, setPagination, setIsLoading);
    }, [currentPage]);

    useEffect(() => {
        handleGetRoles(setRoles);
    }, []);

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    };

    const handleToggleCreateModal = () => {
        setIsShowModal(!isShowModal);
    };

    const handleSetDataToCreatedUser = (e) => {
        setCreatedUser({
            ...createdUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateUser = () => {
        setIsLoading(true);
        UserService.insert(createdUser)
            .then((response) => {
                setCreatedUser({
                    name: "",
                    email: "",
                    phone: "",
                    role: -1,
                });
                setIsLoading(false);
                setIsShowModal(false);
                toast.success(response.message);
                handleGetUsersAndSetState(currentPage, setUsers, setPagination, setIsLoading);
            })
            .catch((error) => {
                setIsLoading(false);
                ToastValidateError.toastAll(error);
            });
    };

    const handleUpdateStatusUser = (id, status) => {
        setIsLoading(true);
        UserService.updateStatus(id, status)
            .then((response) => {
                setUsers([]);
                setPagination({});
                toast.success(response.message);
                handleGetUsersAndSetState(currentPage, setUsers, setPagination, setIsLoading);
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    };

    return (
        <div className="relative flex flex-col gap-3">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">User management</p>
            </div>
            <Button
                variant="success"
                title="Create new user"
                style="w-48"
                onclick={handleToggleCreateModal}
            />
            <Table
                headers={["Email", "Name", "Phone", "Status", "Action"]}
                data={users.map((user) => {
                    return {
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        status: user.isActive ? (
                            <Button title="Active" variant={"success"} />
                        ) : (
                            <Button title="Blocked" variant={"error"} />
                        ),
                        action: (
                            <Dropdown title="Action">
                                <div className="flex h-fit w-full flex-col items-center justify-center">
                                    <Link link={`/admin/users/${user.id}`} style="w-full">
                                        <Button title="Show" variant={"secondary"} style="w-full" />
                                    </Link>
                                    <Link link={`/admin/users/edit/${user.id}`} style="w-full">
                                        <Button title="Edit" variant={"info"} style="w-full" />
                                    </Link>
                                    <Button
                                        title="Block"
                                        variant={"error"}
                                        onclick={() => handleUpdateStatusUser(user.id, false)}
                                        style="w-full"
                                    />
                                    <Button
                                        title="Unblock"
                                        variant={"success"}
                                        onclick={() => handleUpdateStatusUser(user.id, true)}
                                        style="w-full"
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
            <Modal isShow={isShowModal} title="Create new user" close={handleToggleCreateModal}>
                <div className="flex w-full flex-col items-start justify-center gap-5 px-8 py-6">
                    <Input
                        value={createdUser.email}
                        name="email"
                        onChange={handleSetDataToCreatedUser}
                        required
                        label="Email"
                        style="w-full"
                    />
                    <Input
                        value={createdUser.name}
                        name="name"
                        onChange={handleSetDataToCreatedUser}
                        required
                        label="Name"
                        style="w-full"
                    />
                    <Input
                        value={createdUser.phone}
                        name="phone"
                        onChange={handleSetDataToCreatedUser}
                        required
                        label="Phone"
                        style="w-full"
                    />
                    <p className="text-xl font-medium">
                        Role <span className="text-red-500">*</span>
                    </p>
                    <div className="flex w-full flex-wrap gap-3">
                        {roles.map((role, index) => (
                            <Input
                                key={index}
                                value={role.id}
                                name="role"
                                onChange={handleSetDataToCreatedUser}
                                label={role.name}
                                type="radio"
                            />
                        ))}
                    </div>
                    <Button title="Create" variant="success" onclick={handleCreateUser} />
                </div>
            </Modal>
            <Loader isShow={isLoading} />
        </div>
    );
};

export default UserList;
