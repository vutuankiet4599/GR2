import UserLayout from "../components/users/Layout";
import ComponentTest from "../views/ComponentTest";
import Login from "../views/User/Auth/Login";
import Register from "../views/User/Auth/Register";

const UserRouter = {
    path: "/",
    element: <UserLayout />,
    children: [
        {
            index: true,
            element: <ComponentTest />,
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
