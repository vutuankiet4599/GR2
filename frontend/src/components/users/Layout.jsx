import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

const UserLayout = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default UserLayout;
