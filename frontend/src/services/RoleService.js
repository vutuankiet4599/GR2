import authAPI from "../api/authAPI";

const RoleService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get("/admin/roles");

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default RoleService;
