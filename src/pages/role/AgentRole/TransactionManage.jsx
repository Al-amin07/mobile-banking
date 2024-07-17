import AllRequest from "../../../utils/AllRequest";

const TransactionManage = () => {
  const [requests, isLoading, refetch] = AllRequest();
  const cashIn = requests.filter((item) => item.type === "cash in");
  const cashOut = requests.filter((item) => item.type === "cash out");
  console.log(cashIn, cashOut);
  const handleCashOut = (item) => {
    console.log(item)

  }
  const handleCashIn = (item) => {
    console.log(item)

  }
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
                    <td className=" my-2 text-black">
                      {item.time}
                    </td>
                    <td className="text-lg ">{item.amount}TK</td>
                    <td onClick={() => handleCashIn(item)} className="btn hover:text-black my-2 bg-orange-600 text-white">Approved</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="  min-h-[200px] ">
          <h2 className="text-xl font-bold">Cash Out Request : </h2>
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
                    <td className=" my-2 text-black">
                      {item.time}
                    </td>
                    <td className="text-lg ">{item.amount}TK</td>
                    <td onClick={() => handleCashOut(item)} className="btn hover:text-black my-2 bg-orange-600 text-white">Approved</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default TransactionManage;
