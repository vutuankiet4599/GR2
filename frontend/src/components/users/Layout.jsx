import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="flex flex-col gap-5">
            <div>Text</div>
            <Outlet />
        </div>
    );
};

export default UserLayout;
