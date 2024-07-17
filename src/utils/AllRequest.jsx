import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../Hooks/useAxiosSecure";


const AllRequest = () => {
    
    const axiosSecure = useAxiosSecure();
    const { data : requests = [], isLoading, refetch} = useQuery({
        queryKey: ['requests'],
        queryFn: async() => {
            const { data } = await axiosSecure.get('/requests')
            return data;
        }
    })
    return [requests, isLoading, refetch]

};

export default AllRequest;