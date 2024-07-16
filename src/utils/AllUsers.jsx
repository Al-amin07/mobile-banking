import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
// import useAxiosSecure from "./useAxiosSecure";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data : users = [], isLoading, refetch } = useQuery({
     queryKey: ['users'],
     queryFn: async() => {
         const { data } = await axiosSecure.get('/users')
         return data
     }
    })
    return [users, refetch, isLoading]
};

export default AllUsers;