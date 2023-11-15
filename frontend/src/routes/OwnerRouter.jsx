import AdminLayout from "../components/admins/Layout";
import Blank from "../views/Blank";
import CreateProduct from "../views/Owner/Product/CreateProduct";
import DetailProduct from "../views/Owner/Product/DetailProduct";
import EditProduct from "../views/Owner/Product/EditProduct";
import ProductList from "../views/Owner/Product/ProductList";

const OwnerRouter = {
    path: "/owner",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <Blank />,
        },
        {
            path: "products",
            element: <ProductList />,
        },
        {
            path: "products/:id",
            element: <DetailProduct />,
        },
        {
            path: "products/create",
            element: <CreateProduct />,
        },
        {
            path: "products/edit/:id",
            element: <EditProduct />,
        },
    ],
};

export default OwnerRouter;
