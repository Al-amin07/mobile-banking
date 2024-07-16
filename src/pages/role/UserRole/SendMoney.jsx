import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
// import GetAllUser from "../../../Hooks/getAllUser";
import AllUsers from "../../../utils/AllUsers";
import { toast, ToastContainer } from "react-toastify";

const SendMoney = () => {
  const { user } = useAuth();
  const [users] = AllUsers();
  const allUsers = users?.filter((item) => item?.email != user?.email);
  const [moneyUser, setMoneyUser] = useState(0);
  console.log(user);
  const handleSendMoney = (e) => {
    e.preventDefault();
    let amount = e.target.tk.value;
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
    console.log(amount, pin, paidUser);
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-left mb-6">
        Total Balance : {user?.balance}TK
      </h2>
      <form onSubmit={handleSendMoney} className="space-y-4">
        <div className="space-y-1 text-sm">
          <label
            htmlFor="password"
            className="block text-left font-medium text-lg dark:text-gray-600"
          >
            Amount
          </label>
          <input
            type="text"
            name="tk"
            required
            id=""
            placeholder="Enter Amount"
            className="w-full px-4 border py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
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
            className="w-full px-4 border py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
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
          className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600"
        >
          Send Money
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SendMoney;
