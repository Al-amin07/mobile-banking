import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import AllAgent from "../../../utils/AllAgent";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CashOut = () => {
  const { user } = useAuth();
  const [agents] = AllAgent();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const axiosSecure = useAxiosSecure();
  const handleCashOut = async(e) => {
    e.preventDefault();
    let amount =
      parseFloat(e.target.tk.value) + 0.015 * parseFloat(e.target.tk.value);
    const pin = e.target.pin.value;

    if (user?.status === "pending") {
      toast("You are not verifed. Wait for Admin Approval!!!");
      return;
    }
    if (amount < 1) {
      toast("Please Enter Valid Amount!!!");
      return;
    }

    if (user?.balance < amount) {
      toast("You Dont have Enough Money!!!");
      return;
    }
    const cashOutDetails = {
      email: user?.email,
      pin,
      name: user?.name,
      agent,
      amount,
      type: 'cash out',
      time: new Date().toLocaleDateString()
    };
    console.log(cashOutDetails);
    try {
        const { data} = await axiosSecure.post('/cashout', cashOutDetails)
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
    <div className="">
      <h2 className="text-3xl font-semibold  mb-3">
        Total Balance : {user?.balance}TK
      </h2>
      <h2 className="text-xl font-medium  mb-6">Cash Out </h2>
      <form
        onSubmit={handleCashOut}
        className="space-y-4 border-2 p-10 bg-white w-3/4 mx-auto rounded-lg"
      >
        <div className="space-y-1 text-sm">
          <label
         
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
            Agent
          </label>
          <select
            onChange={(e) => setAgent(e.target.value)}
            required
            className="border w-full py-3 px-5"
            name=""
            id=""
          >
            <option className="py-2 px-4" value="" disabled selected>
              Select Agents
            </option>

            {agents.map((user) => (
              <option className="py-2 px-4" key={user._id} value={user?.email}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm text-gray-50 bg-orange-600"
        >
          Cash Out
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CashOut;
