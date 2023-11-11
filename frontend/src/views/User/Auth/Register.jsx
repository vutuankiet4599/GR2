import { useContext, useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import { faKey, faKeyboard, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button";
import AuthService from "../../../services/AuthService";
import AppContext from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SessionUtils from "../../../utils/SessonUtils";
import ToastValidateError from "../../../services/ToastValidateError";

const Register = () => {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        name: "",
        avatar: null,
    });

    const { action } = useContext(AppContext);

    const navigate = useNavigate();

    const handleChangeRegisterData = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSetFile = (e) => {
        setRegisterData({
            ...registerData,
            avatar: e.target.files[0],
        });
    };

    useEffect(() => {
        console.log(registerData);
    }, [registerData]);

    const handleRegisterAccount = () => {
        AuthService.register(
            registerData.email,
            registerData.password,
            registerData.confirmPassword,
            registerData.name,
            registerData.phone,
            registerData.avatar,
        )
            .then((response) => {
                action.setToken(response.data.token);
                action.setUser(response.data.user);
                toast.success(response.message);
                SessionUtils.set("api-token", response.data.token);
                if (response.data.user.role.name === "SUPER_ADMIN") {
                    navigate("/admin");
                }
                if (response.data.user.role.name === "OWNER") {
                    navigate("/owner");
                }
                if (response.data.user.role.name === "GUEST") {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
                ToastValidateError.toastAll(error);
            });
    };

    return (
        <div className="flex justify-center bg-white">
            <div className="flex h-fit w-1/2 flex-col justify-center gap-8 rounded-lg border px-8 py-8 shadow">
                <p className="text-4xl font-medium">Register page</p>
                <Input
                    label={"Email"}
                    icon={faMailBulk}
                    value={registerData.email}
                    onChange={handleChangeRegisterData}
                    name="email"
                    required
                />
                <Input
                    label={"Password"}
                    icon={faKey}
                    value={registerData.password}
                    onChange={handleChangeRegisterData}
                    name="password"
                    type="password"
                    required
                />
                <Input
                    label={"Confirm Password"}
                    icon={faKey}
                    value={registerData.confirmPassword}
                    onChange={handleChangeRegisterData}
                    name="confirmPassword"
                    type="password"
                    required
                />
                <Input
                    label={"Name"}
                    icon={faKeyboard}
                    value={registerData.name}
                    onChange={handleChangeRegisterData}
                    name="name"
                    required
                />
                <Input
                    label={"Phone"}
                    icon={faPhone}
                    value={registerData.phone}
                    onChange={handleChangeRegisterData}
                    name="phone"
                    required
                />
                <Input label={"Avatar"} onChange={handleSetFile} type="file" name="avatar" />
                <Button title="Register" variant="user" onclick={handleRegisterAccount} />
            </div>
        </div>
    );
};

export default Register;
