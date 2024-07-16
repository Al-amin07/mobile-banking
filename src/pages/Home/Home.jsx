import useAuth from "../../Hooks/useAuth";


const Home = () => {
    const { user } = useAuth()
    return (
        <div className="  mx-auto min-h-screen f ">
         <div className=" flex w-3/4  mx-auto  border-2 border-violet-600 rounded-xl p-12 flex-col items-center justify-center gap-12">
         <div className=" text-left flex  gap-12 ">
           <h2 className="text-3xl font-medium">Name : {user?.name}</h2>
            <h2 className=" text-3xl font-medium">Email : {user?.email}</h2>
           </div>
           <div className=" text-left flex  gap-12 ">
            <p className="text-2xl ">Mobile No. {user?.phone}</p>
            <p className="text-2xl "> Balance : {user?.balance}</p>
            </div>
         </div>
        </div>
    );
};

export default Home;