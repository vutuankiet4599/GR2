import UserLayout from "../components/users/Layout";
import Login from "../views/User/Auth/Login";
import Register from "../views/User/Auth/Register";
import HomePage from "../views/User/HomePage";

const UserRouter = {
    path: "/",
    element: <UserLayout />,
    children: [
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
    ],
};

export default UserRouter;
