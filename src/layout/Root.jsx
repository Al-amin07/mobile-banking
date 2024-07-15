import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Home/Sidebar";



const Root = () => {
    return (
        <div className="flex gap-12">
           <div className="w-0 lg:w-[180px]">
            <Sidebar />
           </div>
            <div className=" flex-1 ">
            <Outlet />

            </div>
        </div>
    );
};

export default Root;