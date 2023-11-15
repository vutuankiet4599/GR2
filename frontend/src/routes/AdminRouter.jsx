import AdminLayout from "../components/admins/Layout";
import CategoryList from "../views/Admin/Category/CategoryList";
import EditUser from "../views/Admin/User/EditUser";
import UserDetail from "../views/Admin/User/UserDetail";
import UserList from "../views/Admin/User/UserList";
import Blank from "../views/Blank";

const AdminRouter = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <Blank />,
        },
        {
            path: "users",
            element: <UserList />,
        },
        {
            path: "users/:id",
            element: <UserDetail />,
        },
        {
            path: "users/edit/:id",
            element: <EditUser />,
        },
        {
            path: "categories",
            element: <CategoryList />,
        },
    ],
};

export default AdminRouter;
