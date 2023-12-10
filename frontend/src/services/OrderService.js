import authAPI from "../api/authAPI";
const OrderService = {
    insert: (data) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.post("/orders", {
                    data: data,
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
                let response = authAPI.put(`/owner/orders/status/${id}`, {
                    status: status,
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    getAll: (page) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get("/owner/orders", {
                    params: {
                        page: page,
                    },
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
                let response = authAPI.delete(`/orders/${id}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    find: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.get(`/owner/orders/${id}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default OrderService;
