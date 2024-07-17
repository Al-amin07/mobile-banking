import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Private = ({children}) => {
    const location = useLocation();
    const token = localStorage.getItem('token')
    const { user } = useAuth();
    // console.log(token, user)
    if(user) return children;
    if(!user && token) return <div className="h-[300px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
    </div>

    return <Navigate state={location.pathname} to={'/login'}/>
};

export default Private;