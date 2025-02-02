import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { setUser, setToken,setRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location?.state ? location.state : '/'
  const axiosCommon = useAxiosCommon();
    const handleLogin =async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        try {
          const { data } = await axiosCommon.post('/login', {email, password})
          console.log(data)
          if(data.message === 'ok'){
          setUser(data.user)
          localStorage.setItem('token',data.token)
         
          setRole(data.user.role)
          setToken(data.token)
          console.log(data)
          
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(path)
        }
      else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
          
        } catch (error) {
          console.log(error)
        }

    }
  return (
    <div className="w-full max-w-lg mx-auto border p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
       
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-left font-medium text-lg dark:text-gray-600">
            Email or Phone
          </label>
          <input
            type="text"
            name="email"
            required
            id=""
            placeholder="Email or Phone"
            className="w-full px-4 border py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-orange-600"
          />
        
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-left font-medium text-lg dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            className="w-full px-4 border py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-orange-600"
          />
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-orange-600">
          Sign in
        </button>
      </form>
   
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Don't have an account?
        <Link
        to={'/register'}
          className="underline dark:text-gray-800"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
