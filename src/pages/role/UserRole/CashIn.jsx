import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import AllAgent from "../../../utils/AllAgent";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CashIn = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [agents] = AllAgent();
  const [agent, setAgent] = useState(null);
  const handleCashIn =async (e) => {
    e.preventDefault();
    let amount = e.target.tk.value;
    const pin = e.target.pin.value;

    if (user?.status === "pending") {
      toast("You are not verifed. Wait for Admin Approval!!!");
      return;
    }
    if (amount < 1) {
      toast("Please Enter Valid Amount!!!");
      return;
    }

   
    const cashInDetails = {
      email: user?.email,
      pin,
      name: user?.name,
      agent,
      amount: parseFloat(amount),
      type: 'cash in',
      time: new Date().toLocaleDateString()
    };
    console.log(cashInDetails);
    try {
        const { data} = await axiosSecure.post('/cashin', cashInDetails)
        console.log(data)
        if(data.message === 'ok'){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Please Wait For Agent Approval",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
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

 
  };
 
  return (
    <div>
      <h2 className="text-3xl font-semibold text-left mb-3">
        Total Balance : {user?.balance}TK
      </h2>
      <h2 className="text-xl font-medium text-left mb-6">Cash In </h2>
      <form
        onSubmit={handleCashIn}
        className="space-y-4 border-2 p-10 rounded-lg"
      >
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
              onChange={(e) => setAgent(e.target.value)}
            required
            className="border w-full py-3 px-5"
            name=""
            id=""
          >
            <option value="" disabled selected>
              Select Users
            </option>

             {agents.map((user) => (
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

export default CashIn;
