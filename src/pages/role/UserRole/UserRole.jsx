import { NavLink } from "react-router-dom";

const UserRole = () => {
    return (
        <>
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/send-money'}>Send Money</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/cashin'}>Cash-In</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/cashout'}>Cash-Out</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/balance'}>Balance Inquiry</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/transaction'}>Transactions History</NavLink></li>  
        </>
    );
};

export default UserRole;