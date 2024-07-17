import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Transaction = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: trans = [] } = useQuery({
    queryKey: ["trans", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/transaction/${user?.email}`);
      return data;
    },
  });
  console.log(trans);
  return (
    <div>
      <h2 className="text-3xl font-medium mb-8 text-left">
        Total Transaction : {trans.length}
      </h2>
      <div>
        {trans && trans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th className="text-2xl font-semibold">Name</th>
                  <th className="text-2xl font-semibold">Transaction Type</th>
                  <th className="text-2xl font-semibold">Time</th>
                  <th className="text-2xl font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {trans?.slice(0, 10)?.map((item, index) => (
                  <tr key={index} className="w-full hover:bg-base-200">
                    <th className="text-lg ">{index + 1}</th>
                    <td className="text-lg ">{user.name}</td>
                    <td className="text-lg ">{item.type}</td>
                    <td className="text-lg ">{item.time || "N/A"}</td>
                    <td className="btn my-2 bg-orange-600 text-white">
                      {item.balance}TK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-3xl font-medium text-center">
            No Transaction Available
          </h2>
        )}
      </div>
    </div>
  );
};

export default Transaction;
