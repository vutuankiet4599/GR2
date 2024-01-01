import { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";
import authAPI from "../../../api/authAPI";

const EditProfile = () => {
    const [user, setUser] = useState({
        name: "",
        phone: "",
        avatarFile: null,
    });
    const { data, action } = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    };

    const handleUploadFile = (e) => {
        setUser({ ...user, avatarFile: e.target.files[0] });
    };

    const handleUpdateProfile = async () => {
        try {
            const fm = new FormData();

            fm.append("_method", "PUT");
            fm.append("name", user.name);
            fm.append("phone", user.phone);
            fm.append("avatar", user.avatarFile);

            let response = await authAPI.post("/users/profile", fm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            action.setUser((prev) => ({
                ...prev,
                name: response.data.name,
                phone: response.data.phone,
                avatar: response.data.avatar,
            }));

            toast.success(response.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!data.token) {
            navigate("/login");
        }
    }, [data.token, navigate]);

    useEffect(() => {
        setUser((prev) => ({
            ...prev,
            name: data.user.name,
            phone: data.user.phone,
        }));
    }, [data.user.name, data.user.phone]);

    return (
        <div className="flex h-fit min-h-screen w-full flex-col gap-5 px-8 py-6">
            <h1 className="text-2xl font-bold">Edit profile</h1>
            <Input
                placeholder={"Name"}
                value={user.name}
                name={"name"}
                onChange={handleChange}
                label={"Display name"}
            />
            <Input
                placeholder={"Phone"}
                value={data.user.phone}
                name={"phone"}
                onChange={handleChange}
                label={"Phone number"}
            />
            <Input placeholder={"Image"} type="file" onChange={handleUploadFile} label={"Avatar"} />
            <Button variant={"info"} title="Update" onclick={handleUpdateProfile} />
        </div>
    );
};

export default EditProfile;
