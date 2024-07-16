import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosCommon";
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
    const axiosSecure = useAxiosSecure()
   const { user } = useAuth();
   console.log('in User', user)
//    if(!user){
//     return ['user', !isLoading]
//    }
   
//    const { data : role = '', isLoading } = useQuery({
//     queryKey: ['role', user.email],
//     queryFn: async() => {
//         const { data } = await axiosSecure.get(`/role/:${user?.email}`)
//         return data
//     }
//    })
//    return [role, isLoading]
};

export default useRole;