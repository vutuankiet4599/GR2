import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { faKey, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import Link from "../../../components/common/Link";
import { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";
import AuthService from "../../../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ToastValidateError from "../../../services/ToastValidateError";
import SessionUtils from "../../../utils/SessonUtils";

const Login = () => {
    const { action } = useContext(AppContext);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleLogin = () => {
        AuthService.login(loginData.email, loginData.password)
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

    const handleChangeLoginData = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="flex justify-center bg-white">
            <div className="flex h-fit w-1/2 flex-col justify-center gap-8 rounded-lg border px-8 py-8 shadow">
                <p className="text-4xl font-medium">Login page</p>
                <Input
                    label={"Email"}
                    icon={faMailBulk}
                    value={loginData.email}
                    onChange={handleChangeLoginData}
                    name="email"
                    required
                />
                <Input
                    label={"Password"}
                    icon={faKey}
                    value={loginData.password}
                    onChange={handleChangeLoginData}
                    name="password"
                    type="password"
                    required
                />
                <Button title="Login" variant="user" onclick={handleLogin} />
                <div className="flex items-center gap-3">
                    <span className="text-lg font-normal">Or you do not have account?</span>
                    <Link link="/register">
                        <Button title="Register now" variant="secondary" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
