import axios from "axios";

const axiosInstanceGenerator = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        timeout: import.meta.env.VITE_API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    instance.interceptors.response.use(
        (res) => res.data,
        (err) => Promise.reject(err)
    );

    return instance;
};

export default axiosInstanceGenerator;
