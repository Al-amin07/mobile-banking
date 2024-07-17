import useAuth from "../../../Hooks/useAuth";


const Balance = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2 className="text-3xl font-semibold">Remaining Balance : {user.balance}TK</h2>
        </div>
    );
};

export default Balance;