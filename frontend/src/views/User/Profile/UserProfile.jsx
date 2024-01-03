import { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import Image from "../../../components/common/Image";
import Input from "../../../components/common/Input";
import Link from "../../../components/common/Link";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";
import authAPI from "../../../api/authAPI";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { data, action } = useContext(AppContext);
    const [user, setUser] = useState(data.user);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            let response = await authAPI.put("/users/password", {
                password: password,
                password_confirmation: confirmPassword,
                new_password: newPassword,
            });

            action.setUser(response.data.user);
            setUser(response.data.user);
            setPassword("");
            setConfirmPassword("");
            setNewPassword("");

            toast.success(response.message);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (!data.token) {
            navigate("/login");
        }
    }, [data.token, navigate]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3">
            <div className="flex h-fit w-full items-end justify-center gap-5 border-b-2">
                <Link link="/orders">My order</Link>
                <Image
                    src={user.avatar ? user.avatar : "/user.png"}
                    style={"translate-y-6 w-28 h-28 rounded-full border"}
                />
                <Link link="/profile/edit">Edit profile</Link>
            </div>
            <div className="flex h-fit w-full flex-col items-start justify-start gap-3 border-b-2 px-8 py-6 text-lg">
                <p>
                    <b>Name:</b> <span>{user.name}</span>
                </p>
                <p>
                    <b>Email:</b> <span>{user.email}</span>
                </p>
                <p>
                    <b>Phone:</b> <span>{user.phone}</span>
                </p>
                <p>
                    <b>Role:</b> <span>{user.role.name}</span>
                </p>
            </div>
            <div className="border-b-2-2 flex h-fit w-full flex-col items-start justify-start gap-3 px-8 py-6 text-lg">
                <p className="text-2xl font-bold">Change password</p>
                <Input
                    icon={faKey}
                    label={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <Input
                    label={"Confirm password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                />
                <Input
                    label={"New password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    icon={faKey}
                />
                <Button variant="info" title="Change password" onclick={handleChangePassword} />
            </div>
        </div>
    );
};

export default UserProfile;
