import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Home/Sidebar";



const Root = () => {
    return (
        <div>
           <div>
            <Sidebar />
           </div>
            <div>
            <Outlet />

            </div>
        </div>
    );
};

export default Root;