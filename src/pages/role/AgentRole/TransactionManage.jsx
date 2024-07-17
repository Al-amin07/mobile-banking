import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AllRequest from "../../../utils/AllRequest";
import useAuth from "../../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const TransactionManage = () => {
  const axiosSecure = useAxiosSecure();
  const { user, setUser } = useAuth();
  const [requests, isLoading, refetch] = AllRequest();
  const cashIn = requests.filter((item) => item.type === "cash in");
  const cashOut = requests.filter((item) => item.type === "cash out");

  const handleCashOut = async (item) => {
    
    try {
      const { data } = await axiosSecure.post("/cashoutbyagent", item);
      console.log(data);
      if (data.agentresult.modifiedCount && data.userresult.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cash Out Approved!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(null)
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCashIn = async(item) => {
    console.log(item);
    if(item.amount > user?.balance) {
      toast('You Dont Have Enough Balance!!!')
      return ;
    }
    try {
      const { data } = await axiosSecure.post('/cashinbyagent', item)
      console.log(data)
      if (data.agentresult.modifiedCount && data.userresult.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cash In Approved!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(null)
        refetch();
      }
    } catch (error) {
      console.log(error)
    }
  };
  if (isLoading)
    return (
      <div className="h-[300px] flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  return (
    <div className=" min-h-screen">
      <h2 className="text-4xl font-medium ">Manage Transaction</h2>
      <div className="flex flex-col gap-16 mt-12">
        <div className="  min-h-[200px] ">
          <h2 className="text-xl font-bold">Cash In Request : </h2>
          {cashIn && cashIn.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table ">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-lg font-semibold">Name</th>
                    <th className="text-lg font-semibold">Transaction Type</th>
                    <th className="text-lg font-semibold">Time</th>
                    <th className="text-lg font-semibold">Amount</th>
                    <th className="text-lg font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {cashIn?.map((item, index) => (
                    <tr key={index} className="w-full hover:bg-base-200">
                      <th className="text-lg ">{index + 1}</th>
                      <td className="text-lg ">{item.name}</td>
                      <td className="text-lg ">{item.type}</td>
                      <td className=" my-2 text-black">{item.time}</td>
                      <td className="text-lg ">{item.amount}TK</td>
                      <td
                        onClick={() => handleCashIn(item)}
                        className="btn hover:text-black my-2 bg-orange-600 text-white"
                      >
                        Approved
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-2xl  font-medium mt-6 text-slate-500">
              Currently Now Request Available
            </h2>
          )}
        </div>
        <div className="  min-h-[200px] ">
          <h2 className="text-xl font-bold">Cash Out Request : </h2>
          {cashOut && cashOut.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table ">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-lg font-semibold">Name</th>
                    <th className="text-lg font-semibold">Transaction Type</th>
                    <th className="text-lg font-semibold">Time</th>
                    <th className="text-lg font-semibold">Amount</th>
                    <th className="text-lg font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {cashOut?.map((item, index) => (
                    <tr key={index} className="w-full hover:bg-base-200">
                      <th className="text-lg ">{index + 1}</th>
                      <td className="text-lg ">{item.name}</td>
                      <td className="text-lg ">{item.type}</td>
                      <td className=" my-2 text-black">{item.time}</td>
                      <td className="text-lg ">{item.amount}TK</td>
                      <td
                        onClick={() => handleCashOut(item)}
                        className="btn hover:text-black my-2 bg-orange-600 text-white"
                      >
                        Approved
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-2xl  font-medium mt-6 text-slate-500">
              Currently Now Request Available
            </h2>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransactionManage;
