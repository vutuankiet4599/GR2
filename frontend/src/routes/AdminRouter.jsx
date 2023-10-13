import AdminLayout from "../components/admins/Layout";
import ComponentTest from "../views/ComponentTest";

const AdminRouter = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <ComponentTest />,
        },
    ],
};

export default AdminRouter;
