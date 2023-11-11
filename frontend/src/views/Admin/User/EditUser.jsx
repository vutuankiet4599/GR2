import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import RoleService from "../../../services/RoleService";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import ToastValidateError from "../../../services/ToastValidateError";

const handleGetUser = (id, setUser, setIsLoading) => {
    UserService.getOneById(id)
        .then((response) => {
            setIsLoading(false);
            response.data = {
                ...response.data,
                role: response.data.role.id,
            };
            setUser(response.data);
        })
        .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
        });
};

const handleGetRoles = (setRoles) => {
    RoleService.getAll()
        .then((response) => {
            setRoles(response.data);
        })
        .catch((error) => {
            toast.error(error.message);
        });
};

const EditUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        role: {},
    });
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        handleGetUser(id, setUser, setIsLoading);
    }, [id]);

    useEffect(() => {
        handleGetRoles(setRoles);
    }, []);

    const handleUpdateUser = () => {
        setIsLoading(true);
        UserService.update(id, user)
            .then((response) => {
                toast.success(response.message);
                setIsLoading(false);
            })
            .catch((error) => {
                ToastValidateError.toastAll(error);
                setIsLoading(false);
            });
    };

    const handleSetDataToUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="relative flex flex-col gap-5">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">
                    Edit user {`${user.email} - ${user.name}`}
                </p>
            </div>
            <div className="flex h-fit w-full flex-col items-start justify-center gap-5 border px-12 py-6 shadow">
                <Input
                    value={user.email}
                    name="email"
                    onChange={handleSetDataToUser}
                    required
                    label="Email"
                    style="w-full"
                />
                <Input
                    value={user.name}
                    name="name"
                    onChange={handleSetDataToUser}
                    required
                    label="Name"
                    style="w-full"
                />
                <Input
                    value={user.phone}
                    name="phone"
                    onChange={handleSetDataToUser}
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
                            onChange={handleSetDataToUser}
                            label={role.name}
                            type="radio"
                            isChecked={role.id == user.role}
                        />
                    ))}
                </div>
                <Button title="Update" variant="info" onclick={handleUpdateUser} />
            </div>
            <Loader isShow={isLoading} />
        </div>
    );
};

export default EditUser;
