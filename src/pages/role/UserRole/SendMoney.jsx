import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
// import GetAllUser from "../../../Hooks/getAllUser";
import AllUsers from "../../../utils/AllUsers";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUser from "../../../Hooks/useUser";

const SendMoney = () => {
  const [ refetch] = useUser()
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [users] = AllUsers();
  const navigate = useNavigate();
  const allUsers = users?.filter((item) => item?.email != user?.email);
  const [moneyUser, setMoneyUser] = useState(0);
  console.log(user);
  const handleSendMoney = async(e) => {
    e.preventDefault();
    let amount = e.target.tk.value;
    if(user?.status === 'pending') {
      toast('You are not verifed. Wait for Admin Approval!!!')
      return ;
    }
    if(amount < 50) {
      toast('Send Money more then 50TK!!!')
      return ;
    }
    if(amount > 100) {
      amount = parseFloat(amount) + 5;
    }
    if(user?.balance < amount){
      toast('You Dont have Enough Money!!!')
      return ;
    }
    const pin = e.target.pin.value;
    const paidUser = moneyUser;
    const details = {
      email: user?.email,
      amount,
      pin,
      paidUserEmail: paidUser

    }
    try {
      const { data } = await axiosSecure.post('/sendmoney', details)
      console.log(data)
      if(data.modifiedCount){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Send Money Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        // refetch();
        navigate('/')
        setUser(null)
      }
      else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Incorrect Pin",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-left mb-3">
        Total Balance : {user?.balance}TK
      </h2>
      <h2 className="text-xl font-medium text-left mb-6">Send Money </h2>
      <form  onSubmit={handleSendMoney} className="space-y-4 border-2 p-10 rounded-lg">
        <div className="space-y-1 text-sm">
          <label
            htmlFor="password"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            Amount
          </label>
          <input
            type="number"
            name="tk"
            required
            id=""
            placeholder="Enter Amount"
            className="w-full px-4 border py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-orange-600"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label
            htmlFor="password"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            Pin
          </label>
          <input
            type="number"
            name="pin"
            id="password"
            required
            placeholder="pin"
            className="w-full px-4 border py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-orange-600"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label
            htmlFor="password"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            User
          </label>
          <select
            onChange={(e) => setMoneyUser(e.target.value)}
            required
            className="border w-full py-3 px-5"
            name=""
            id=""
          >
            <option value="" disabled selected>
              Select Users
            </option>

            {allUsers.map((user) => (
              <option key={user._id} value={user?.email}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm text-gray-50 bg-orange-600"
        >
          Send Money
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SendMoney;
