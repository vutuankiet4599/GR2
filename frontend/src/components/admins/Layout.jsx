import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
const AdminLayout = () => {
    let { data } = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (!data.token) {
            navigate("/");
        }
    }, [data.token, navigate]);

    return (
        <div className="flex relative">
            <div className="w-fit sticky top-0 left-0 h-full block">
                <Sidebar />
            </div>
            <main className="flex flex-col w-full min-h-screen px-6">
                <Header />
                <Outlet />
                <Footer />
            </main>
        </div>
    );
};

export default AdminLayout;
