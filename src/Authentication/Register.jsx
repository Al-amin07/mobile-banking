import { Link, useNavigate } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
const Register = () => {
    const navigate = useNavigate();
    const axiosCommon = useAxiosCommon()
  const handleLogin =async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const pin = e.target.pin.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    if(pin.length != 5){
        toast('Pin must be 5 number!!!')
        return ;
    }
    const user = {
      name,
      email,
      pin: pin,
      phone,
      status: 'pending',
      balance: 0
    };
    try {
        const { data } = await axiosCommon.post('/users',user )
        if(data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Successfull!!!",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/login')
        }
        else{
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Email already Exist!!!",
                showConfirmButton: false,
                timer: 1500
              });
        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto border p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Name */}
        <div className="space-y-1 text-sm ">
          <label
            htmlFor="username"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            name="name"
            id="username"
            required
            placeholder="Username"
            className="w-full border px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
        </div>
        {/* Pin */}
        <div className="space-y-1 text-sm ">
          <label
            htmlFor="username"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            Pin
          </label>
          <input
            type="number"
            name="pin"
            required
            id="pin"
            placeholder="Pin"
            className="w-full border px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
        </div>
        {/* Mobile */}
        <div className="space-y-1 text-sm ">
          <label
            htmlFor="username"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            Mobile Number
          </label>
          <input
            type="text"
            name="phone"
            id="username"
            required
            placeholder="Number"
            className="w-full border px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
        </div>
        {/* Email */}
        <div className="space-y-1 text-sm ">
          <label
            htmlFor="username"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
        </div>

        <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600">
          Sign in
        </button>
      </form>

      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Already have an account?
        <Link
         to={'/login'}
          className="underline dark:text-gray-800"
        >
          Login
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Register;
