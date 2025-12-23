import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedFarmer } from "../store/farmerSearchSlice";
const PaymentDues = () => {
  const [paymentDues, setPaymentDues] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const token = localStorage.getItem("tractor_token");
  useEffect(() => {
    async function getPaymentDues() {
      try {
        const res = await fetch("http://localhost:3000/api/payment-dues", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          console.error("Failed to fetch payment dues");
          return;
        }
        const data = await res.json();
        setHasSearched(true);
        setPaymentDues(data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPaymentDues();
  }, []);
  function handlePayNow(pd){
    dispatch(
      setSelectedFarmer({
        farmer_id: pd.farmer_id,
        name: pd.name,
        village:pd.village,
      })
    );

    navigate("/payment", {
      state: { fromDues: true },
    });
  }
  if (hasSearched && !paymentDues)
    return (
      <div className="mt-10 flex flex-col items-center ">
        <h2 className="font-bold text-2xl">No Payment Dues For You..!</h2>
      </div>
    );
  if (!hasSearched && !paymentDues)
    return (
      <div className="mt-10 flex flex-col items-center ">
        <h2 className="font-bold text-2xl">Getting your payment dues..!</h2>
      </div>
    );
  return (
    <>
      <div className="mt-10 flex flex-col items-center ">
        <h2 className="font-bold text-2xl text-light-text dark:text-dark-text">
          Payment Dues
        </h2>
        <div className="w-full max-w-md mt-6 flex flex-col gap-4 px-3 overflow-y-visible mb-12">
          {paymentDues.map((pd) => (
            <div
              key={pd.due_id}
              className="bg-light-card dark:bg-dark-card rounded-lg p-4 shadow-sm border border-light-border dark:border-dark-border">
              <div className="flex items-center justify-between">
                <div className="text-sm mt-1 opacity-70 text-light-text dark:text-dark-text">
                  {pd.name}
                </div>
                <div className="px-2 font-xs text-light-text2 dark:text-dark-text border border-light-border dark:border-dark-border rounded-md">
                  {pd.status}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold text-red-600">
                  {" "}
                  ₹{pd.amount_due} Due
                </div>
                <div className="text-base font-medium text-green-600">
                  Paid: ₹{pd.amount_paid}
                </div>
              </div>
              <div className="text-sm text-light-text dark:text-dark-text mt-1 flex justify-center gap-8">
                <button
                  type="button"
                  onClick={()=>handlePayNow(pd)}
                  className="px-3 py-1 bg-success rounded-md ">
                  Pay Now
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-accent rounded-md ">
                  View Details
                </button>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </>
  );
};

export default PaymentDues;
