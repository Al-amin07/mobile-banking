import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../Hooks/useAxiosCommon";


const AllAgent = () => {
const axiosCommon = useAxiosCommon();
const { data : agents = [], isLoading, refetch } = useQuery({
    queryKey: ['agents'],
    queryFn: async() => {
        const { data } = await axiosCommon.get('/agents')
        return data
    }
})
return [agents, isLoading, refetch]
};

export default AllAgent;