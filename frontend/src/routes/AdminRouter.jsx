import AdminLayout from "../components/admins/Layout";
import CategoryList from "../views/Admin/Category/CategoryList";
import UserDetail from "../views/Admin/User/UserDetail";
import UserList from "../views/Admin/User/UserList";
import ComponentTest from "../views/ComponentTest";

const AdminRouter = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <ComponentTest />,
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
            path: "categories",
            element: <CategoryList />,
        },
    ],
};

export default AdminRouter;
