import authAPI from "../api/authAPI";

const CategoryService = {
    getAll: (page) => {
        return new Promise((resolve, reject) => {
            try {
                let data = authAPI.get(`/admin/categories?page=${page}`);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    insert: (data) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.post("/admin/categories", {
                    name: data.name,
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
                let response = authAPI.put(`/admin/categories/${id}`, {
                    name: data.name,
                });

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.delete(`/admin/categories/${id}`);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default CategoryService;
