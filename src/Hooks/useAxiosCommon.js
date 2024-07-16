import axios from "axios";

const axiosCommon = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

const useAxiosCommon = () => {
   return axiosCommon
};

export default useAxiosCommon;