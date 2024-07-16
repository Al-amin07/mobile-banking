import { createContext, useEffect, useState } from "react";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosCommon from "../Hooks/useAxiosCommon";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const axiosCommon = useAxiosCommon();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    console.log('Hello')
  })

  useEffect(() => {
    

    func();
  }, [user]);

  const func = async () => {
    const token = localStorage.getItem('token')
    console.log('token', token)
    const { data } = await axiosCommon.get("/user");
    console.log(data);
    if(!user && token){
    setUser(data);
    }
  };
 

  const info = { user,  setUser };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
