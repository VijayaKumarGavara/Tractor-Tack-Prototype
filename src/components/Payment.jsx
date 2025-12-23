import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import FindFarmer from "./FindFarmer";

import {
  resetFarmerSearch,
  setFarmerResults,
  setSelectedFarmer,
} from "../store/farmerSearchSlice";
const Payment = () => {
  const [due, setDue] = useState(null);
  const dispatch = useDispatch();
  const paymentFarmer = useSelector(
    (store) => store.farmerSearch.selectedFarmer
  );
  const [formOpen, setFormOpen] = useState(false);
  const payment_amount = useRef();
  const payment_mode = useRef();
  const token = localStorage.getItem("tractor_token");
  const location = useLocation();
  const cameFromDues = location.state?.fromDues;

  useEffect(() => {
    if (!paymentFarmer) return;

    async function getDue() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/payment-dues?farmer_id=${paymentFarmer.farmer_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setDue(data.data[0] || null);
      } catch (error) {
        console.log(error.message);
      }
    }

    getDue();
  }, [paymentFarmer]);

  async function handlePayment(e) {
    e.preventDefault();

    const payAmount = Number(payment_amount.current.value);

    if (payAmount <= 0) return alert("Enter valid amount");
    if (payAmount > due.amount_due) return alert("Payment exceeds due amount");

    const payload = {
      farmer_id: due.farmer_id,
      due_id: due.due_id,
      amount: payAmount,
      payment_mode: payment_mode.current.value.trim().toLowerCase(),
    };

    const res = await fetch("http://localhost:3000/api/payment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Payment successful");
      dispatch(setFarmerResults([]));
      dispatch(setSelectedFarmer(null));
      setFormOpen(false);
    } else {
      alert(data.message || "Payment failed");
    }
  }
  useEffect(() => {
    if (!cameFromDues) {
      dispatch(resetFarmerSearch());
    }
  }, [dispatch, cameFromDues]);

  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <h2 className="font-bold text-2xl text-light-text dark:text-dark-text">
          Take Payment
        </h2>
        {!paymentFarmer && !cameFromDues && <FindFarmer />}
        {paymentFarmer && (
          <div>
            <div className="mt-4 flex gap-x-2 items-center">
              <span className="font-medium text-light-text dark:text-dark-text">Farmer:</span>
              <span className="text-light-text dark:text-dark-text">{paymentFarmer.name}</span>
              <span className="text-light-text dark:text-dark-text">{paymentFarmer.village}</span>

              {!cameFromDues && (
                <button
                  className="border rounded-md bg-green-500 text-white px-2 ml-2"
                  onClick={() => {
                    setDue(null);
                    dispatch(resetFarmerSearch());
                  }}>
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
        {paymentFarmer && !due && (
          <p className="text-green-600 mt-4">No pending dues for this farmer</p>
        )}

        {paymentFarmer && due && (
          <div className="mt-4 flex flex-col items-center gap-6">
            <div className="flex flex-wrap gap-4 text-light-text dark:text-dark-text">
              <span>Amount Due: ₹{due.amount_due}</span>
              <span>Status: {due.status}</span>
            </div>
            <button
              type="button"
              className="border rounded-md bg-success text-white px-3 py-2 w-max"
              onClick={() => setFormOpen(true)}>
              Take Payment
            </button>
          </div>
        )}
        {formOpen && (
          <form
            action=""
            method="post"
            className="flex flex-col items-center gap-4 mt-10 text-light-text2 dark:text-dark-text2">
            <input
              ref={payment_amount}
              min={1}
              required
              type="number"
              name="payment_amount"
              id=""
              className="border rounded-md px-4 py-2 "
              placeholder="Amount"
            />
            <input
              ref={payment_mode}
              type="text"
              name="payment_mode"
              id=""
              className="border rounded-md px-4 py-2"
              placeholder="Cash or Upi"
            />
            <div className="flex gap-6">
              <button
                onClick={handlePayment}
                type="button"
                className="border rounded-md bg-success text-white px-3 py-1 w-max">
                Paid
              </button>
              <button
                onClick={() => {
                  setFormOpen(false);
                  dispatch(resetFarmerSearch());
                }}
                type="button"
                className="border rounded-md bg-danger text-white px-3 py-1 w-max">
                Cancle
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Payment;
