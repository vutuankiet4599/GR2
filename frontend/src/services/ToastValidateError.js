import { toast } from "react-toastify";

const ToastValidateError = {
    toastAll: (error) => {
        if (error.response?.data?.errors) {
            Object.keys(error.response.data.errors).map((field) => {
                error.response.data.errors[field].map((error) => {
                    toast.error(error);
                });
            });
        }
        toast.error(error.message);
    },
};

export default ToastValidateError;
