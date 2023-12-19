import authAPI from "../api/authAPI";
import guestAPI from "../api/guestAPI";

const ReviewService = {
    product: (page, id) => {
        return new Promise((resolve, reject) => {
            try {
                let data = guestAPI.get(`/reviews/products/${id}`, {
                    params: {
                        page: page,
                    },
                });
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    insert: (data) => {
        return new Promise((resolve, reject) => {
            try {
                let response = authAPI.post(`/reviews`, {
                    review: data.review,
                    ratings: data.ratings,
                    product_id: data.product_id,
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },
};
export default ReviewService;
