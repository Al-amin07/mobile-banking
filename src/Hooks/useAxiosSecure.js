import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { setUser, setRole, setToken } = useAuth();
    // axiosSecure.interceptors.request.use(config => {
    //     const token = localStorage.getItem('token')
    //     console.log('in Secure ', token);
    //     config.headers.authorization = `Bearer ${token}`
    //     return config
    // }, error => {
    //     return Promise.reject(error)
    // })

    axiosSecure.interceptors.response.use(config => {
        return config;
    },async error => {
        const status = error?.response?.status;
        if(status === 401 || status === 403){
            setUser(null)
            setRole('')
            setToken('')
            localStorage.setItem('token', '')
            navigate('/login')

        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;