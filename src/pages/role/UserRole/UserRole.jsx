import { NavLink } from "react-router-dom";

const UserRole = () => {
    return (
        <>
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/ogin'}>Send Money</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/login'}>Cash-In</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/lin'}>Cash-Out</NavLink></li>  
        </>
    );
};

export default UserRole;