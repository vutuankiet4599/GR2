import SessionUtils from "../utils/SessonUtils";
import axiosInstanceGenerator from "./baseAPI";

const authAPI = axiosInstanceGenerator();

authAPI.interceptors.request.use(
    (req) => {
        req.headers.Authorization = `Bearer ${SessionUtils.get("api_token")}`;
        return req;
    },

    (err) => Promise.resolve(err),
);

export default authAPI;
