import authAPI from "../api/authAPI";

const ImageService = {
    insertImage: (image, folder = "") => {
        return new Promise((resolve, reject) => {
            try {
                const fm = new FormData();
                fm.append("image", image);
                fm.append("folder", folder);

                let response = authAPI.post("/images", fm, {
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
};

export default ImageService;
