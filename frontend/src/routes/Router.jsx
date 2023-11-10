import { createBrowserRouter } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";
import OwnerRouter from "./OwnerRouter";

const routers = Object.values({
    AdminRouter,
    UserRouter,
    OwnerRouter,
});

const Router = createBrowserRouter(routers);

export default Router;
