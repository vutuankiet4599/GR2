import authAPI from "../api/authAPI";
import guestAPI from "../api/guestAPI";

const ProductService = {
    home: () => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get("/home");

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    search: (params, page) => {
        return new Promise((resolve, reject) => {
            try {
                let response = guestAPI.get("/products/search", {
                    params: {
                        page: page,
                        search: params.get("search"),
                        categories: params.getAll("categories"),
                        address: params.get("address"),
                        owner: params.get("owner"),
                        date: params.get("date") == "true" ? 1 : 0,
                        orders: params.get("orders") == "true" ? 1 : 0,
                    },
                });

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    getOneById: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let response = guestAPI.get(`/products/${id}`);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    getProductsOfCurrentUser: (page = 1) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get(`/owner/products/user?page=${page}`);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    getOneUserProductById: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get(`/owner/products/user/${id}`);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    insert: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const fm = new FormData();
                fm.append("name", data.name);
                fm.append("description", data.description);
                fm.append("quantity", data.quantity);
                fm.append("address", data.address);

                for (let i = 0; i < data.categories.length; i++) {
                    fm.append("categories[]", data.categories[i]);
                }

                for (let i = 0; i < data.media.length; i++) {
                    fm.append("media[]", data.media[i]);
                }

                let response = authAPI.post(`/owner/products`, fm, {
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

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            try {
                const fm = new FormData();
                fm.append("name", data.name);
                fm.append("description", data.description);
                fm.append("quantity", data.quantity);
                fm.append("address", data.address);
                fm.append("categories", data.categories);

                let response = authAPI.put(`/owner/products/${id}`, fm);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.delete(`/owner/products/${id}`);

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default ProductService;
