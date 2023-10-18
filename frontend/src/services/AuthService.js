import authAPI from "../api/authAPI";

const AuthService = {
    login: (email, password) => {
        console.log({ email: email, password: password });
    },

    register: (email, password, confirmPassword, name, avatar = null) => {
        console.log({
            email: email,
            password: password,
            name: name,
            avatar: avatar,
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
};

export default AuthService;
