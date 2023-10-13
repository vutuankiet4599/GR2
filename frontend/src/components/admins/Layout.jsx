import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const AdminLayout = () => {
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
