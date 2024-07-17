import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";


const useUser = () => {
    const axiosCommon = useAxiosCommon();
    const { setUser } = useAuth()
 const { data: singleUser = {}, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async() => {
        const { data } = await axiosCommon.get("/user");
        return data
    }
 })
 console.log(singleUser)

 return [refetch, isLoading ]
};

export default useUser;