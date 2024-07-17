import { createContext, useEffect, useState } from "react";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const axiosCommon = useAxiosCommon();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState();
  const [token, setToken ] = useState(localStorage.getItem('token') || '')
  console.log(role)
  useEffect(() => {
    

    func();
  }, [user, role]);



  const func = async () => {
    const token = localStorage.getItem('token')
    
    const { data } = await axiosCommon.get("/user");
    
    if(!user && token){
    setUser(data);
    setRole(data.role)
    }
  };
 

  const info = { user,  setUser, setToken, role, setRole };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
