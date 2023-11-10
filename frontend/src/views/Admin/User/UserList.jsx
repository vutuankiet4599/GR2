import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import Pagination from "../../../components/common/Pagination";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const handleGetUsersAndSetState = (currentPage, setState, setPagination) => {
    UserService.getAll(currentPage + 1)
        .then((response) => {
            setState(response.data.data);
            setPagination(response.data.meta);
        })
        .catch((error) => {
            console.log(error);
            toast.error(error.message);
        });
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        handleGetUsersAndSetState(currentPage, setUsers, setPagination);
    }, [currentPage]);

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    };

    const handleUpdateStatusUser = (id, status) => {
        UserService.updateStatus(id, status)
            .then((response) => {
                setUsers([]);
                setPagination({});
                toast.success(response.message);
                handleGetUsersAndSetState(currentPage, setUsers, setPagination);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="relative flex flex-col gap-3">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">User management</p>
            </div>
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
                            <div className="flex gap-3">
                                <Link to={`/admin/users/${user.id}`}>
                                    <Button title="Show" variant={"info"} />
                                </Link>
                                <Button
                                    title="Block"
                                    variant={"error"}
                                    onclick={() => handleUpdateStatusUser(user.id, false)}
                                />
                                <Button
                                    title="Unblock"
                                    variant={"success"}
                                    onclick={() => handleUpdateStatusUser(user.id, true)}
                                />
                            </div>
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
            <Loader isShow={users.length == 0} />
        </div>
    );
};

export default UserList;
