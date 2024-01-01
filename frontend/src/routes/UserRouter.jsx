import UserLayout from "../components/users/Layout";
import Login from "../views/User/Auth/Login";
import Register from "../views/User/Auth/Register";
import HomePage from "../views/User/HomePage";
import ProductDetail from "../views/User/Product/ProductDetail";
import ProductSearch from "../views/User/Product/ProductSearch";
import ComponentTest from "../views/ComponentTest";
import Cart from "../views/User/Cart/Cart";
import Chat from "../views/User/Chat/Chat";
import EditProfile from "../views/User/Profile/EditProfile";
import UserProfile from "../views/User/Profile/UserProfile";

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
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/chat",
            element: <Chat />,
        },
        {
            path: "/profile",
            element: <UserProfile />,
        },
        {
            path: "/profile/edit",
            element: <EditProfile />,
        },
    ],
};

export default UserRouter;
