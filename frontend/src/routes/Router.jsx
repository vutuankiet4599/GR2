import { createBrowserRouter } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";

const routers = Object.values({
    AdminRouter,
    UserRouter,
});

const Router = createBrowserRouter(routers);

export default Router;
