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
        console.log("Get current user");
        return {};
    },
};

export default AuthService;
