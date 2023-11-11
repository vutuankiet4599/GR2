import authAPI from "../api/authAPI";

const UserService = {
    getAll: (page = 1) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get(`/admin/users?page=${page}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    getOneById: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get(`/admin/users/${id}`);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    insert: (data) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.post(`/admin/users`, {
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    role_id: data.role,
                    address: data.address,
                });

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.put(`/admin/users/${id}`, {
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    role_id: data.role,
                });

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateStatus: (id, status) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.put(`/admin/users/status/${id}`, {
                    is_active: status,
                });

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default UserService;
