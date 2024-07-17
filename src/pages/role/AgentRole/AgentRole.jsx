import React from 'react';
import { NavLink } from 'react-router-dom';

const AgentRole = () => {
    return (
        <>
           
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/transactionmanage'}>Transaction Manage</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/balance'}>Balance Inquiry</NavLink></li>  
          <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/transaction'}>Transactions History</NavLink></li>    
        </>
    );
};

export default AgentRole;