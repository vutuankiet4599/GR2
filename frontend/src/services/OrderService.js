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
};

export default OrderService;
