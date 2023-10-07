import UserLayout from "../components/users/Layout";
import ComponentTest from "../views/ComponentTest";

const UserRouter = {
    path: "/",
    element: <UserLayout />,
    children: [
        {
            index: true,
            element: <ComponentTest />,
        },
    ],
};

export default UserRouter;
