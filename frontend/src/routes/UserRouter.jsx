import UserLayout from "../components/users/Layout";
import Login from "../views/User/Auth/Login";
import Register from "../views/User/Auth/Register";
import HomePage from "../views/User/HomePage";
import ProductDetail from "../views/User/Product/ProductDetail";
import ProductSearch from "../views/User/Product/ProductSearch";
import ComponentTest from "../views/ComponentTest";

const UserRouter = {
    path: "/",
    element: <UserLayout />,
    children: [
        {
            path: "/test",
            element: <ComponentTest />,
        },
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/products/:id",
            element: <ProductDetail />,
        },
        {
            path: "/search",
            element: <ProductSearch />,
        },
    ],
};

export default UserRouter;
