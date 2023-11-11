import authAPI from "../api/authAPI";
import guestAPI from "../api/guestAPI";

const AuthService = {
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            try {
                let response = guestAPI.post("/login", { email: email, password: password });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    register: (email, password, confirmPassword, name, phone, avatar = null) => {
        return new Promise((resolve, reject) => {
            try {
                const fm = new FormData();
                fm.append("email", email);
                fm.append("password", password);
                fm.append("password_confirmation", confirmPassword);
                fm.append("name", name);
                fm.append("phone", phone);
                fm.append("avatar", avatar);
                let response = guestAPI.post("/register", fm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    getUser: () => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get("/user");
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    logout: () => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.post("/logout");
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default AuthService;
