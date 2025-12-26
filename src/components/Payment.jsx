import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toBlob } from "html-to-image";

import FindFarmer from "./FindFarmer";

import { resetFarmerSearch } from "../store/farmerSearchSlice";
import { API_URL } from "../utils/constant";
const Payment = () => {
  const [farmerDue, setFarmerDue] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [payment, setPayment] = useState({ amount: "", mode: "" });

  const invoice = useRef();

  const dispatch = useDispatch();
  const location = useLocation();

  const paymentFarmer = useSelector(
    (store) => store.farmerSearch.selectedFarmer
  );

  const cameFromDues = location.state?.fromDues;
  const token = localStorage.getItem("tractor_token");

  const hasSelectedFarmer = Boolean(paymentFarmer);
  const hasNoDue = !farmerDue || farmerDue.amount_due === 0;
  const hasPendingDue = farmerDue && farmerDue.amount_due > 0;
  useEffect(() => {
    if (!paymentFarmer) return;

    async function fetchFarmerDue() {
      try {
        const res = await fetch(
          `${API_URL}api/payment-dues?farmer_id=${paymentFarmer.farmer_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setFarmerDue(data.data[0] || null);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchFarmerDue();
  }, [paymentFarmer, token]);

  async function handlePayment(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const payAmount = Number(payment.amount);

    if (payAmount <= 0) return alert("Enter valid amount");
    if (payAmount > farmerDue.amount_due)
      return alert("Payment exceeds due amount");

    const payload = {
      farmer_id: farmerDue.farmer_id,
      due_id: farmerDue.due_id,
      amount: payAmount,
      payment_mode: payment.mode.trim().toLowerCase(),
    };
    try {
      const res = await fetch(`${API_URL}api/payment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      setPaymentCompleted(true);
      setShowInvoice(true);
    } catch (error) {
      return alert(error.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  }
  useEffect(() => {
    if (!cameFromDues) {
      dispatch(resetFarmerSearch());
    }
  }, [dispatch, cameFromDues]);

  function handleChange(e) {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  }

  async function handleShareInvoice() {
    if (!invoice.current) {
      alert("Invoice not ready");
      return;
    }

    try {
      // 1️⃣ Convert invoice DOM → image blob
      const blob = await toBlob(invoice.current, {
        backgroundColor: "#ffffff", // important for dark mode
        quality: 1,
      });

      if (!blob) {
        alert("Failed to generate invoice image");
        return;
      }

      // 2️⃣ Convert blob → file (required for native share)
      const file = new File([blob], "invoice.png", {
        type: "image/png",
      });

      // 3️⃣ Native share check
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Payment Invoice",
          text: "Payment receipt",
          files: [file],
        });
      } else {
        alert("Sharing not supported on this device");
      }
    } catch (error) {
      console.error("Share failed:", error);
      alert("Failed to share invoice");
    } finally {
      dispatch(resetFarmerSearch());
      setIsPaymentFormOpen(false);
      setFarmerDue(null);
      setShowInvoice(false);
    }
  }

  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <h2 className="font-bold text-2xl text-light-text dark:text-dark-text">
          Take Payment
        </h2>

        {!hasSelectedFarmer && (!cameFromDues || paymentCompleted) && (
          <FindFarmer />
        )}

        {hasSelectedFarmer && (
          <div className="mt-4 flex flex-col sm:flex-row gap-x-2 items-center">
            <span className="font-medium text-light-text dark:text-dark-text">
              Farmer Details
            </span>

            <div className="flex gap-4 py-2 text-light-text dark:text-dark-text">
              <span>{paymentFarmer.name}</span>
              <span>-</span>
              <span>{paymentFarmer.village}</span>
            </div>

            {!cameFromDues && (
              <button
                className="border rounded-md bg-green-500 text-white px-2 ml-2"
                onClick={() => {
                  setFarmerDue(null);
                  dispatch(resetFarmerSearch());
                }}>
                Edit
              </button>
            )}
          </div>
        )}

        {hasSelectedFarmer && hasNoDue && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-green-600">No pending dues for this farmer.</p>
            <button
              className="border rounded-md bg-warning text-white px-3 py-1"
              onClick={() => {
                setFarmerDue(null);
                setPaymentCompleted(false);
                dispatch(resetFarmerSearch());
              }}>
              Back
            </button>
          </div>
        )}

        {hasSelectedFarmer && hasPendingDue && (
          <div className="mt-4 flex flex-col items-center gap-6">
            <div className="flex gap-4 text-light-text dark:text-dark-text">
              <span>Amount Due: ₹{farmerDue.amount_due}</span>
              <span>Status: {farmerDue.status}</span>
            </div>

            <button
              className="border rounded-md bg-success text-white px-3 py-2"
              onClick={() => setIsPaymentFormOpen(true)}>
              Take Payment
            </button>
          </div>
        )}

        {isPaymentFormOpen && (
          <form
            className="flex flex-col items-center gap-4 mt-10 text-light-text2 dark:text-dark-text2"
            onSubmit={handlePayment}>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              value={payment.amount}
              min={1}
              required
              className="border rounded-md px-4 py-2 bg-transparent"
              placeholder="Amount"
            />

            <input
              value={payment.mode}
              name="mode"
              onChange={handleChange}
              type="text"
              className="border rounded-md px-4 py-2 bg-transparent"
              placeholder="Cash or UPI"
            />

            <div className="flex gap-6">
              <button disabled={isSubmitting}
              className="border rounded-md bg-success text-white px-3 py-1">
                {isSubmitting ? "Processing.." : "Paid"}
              </button>

              <button
                type="button"
                className="border rounded-md bg-danger text-white px-3 py-1"
                onClick={() => {
                  setIsPaymentFormOpen(false);
                  dispatch(resetFarmerSearch());
                }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {showInvoice && paymentCompleted && (
          <div className="absolute flex h-80 w-full sm:w-72 justify-center items-center">
            <div className="py-5 mx-auto w-full flex flex-col items-center gap-3 bg-light-card dark:bg-dark-card shadow-md rounded-md text-light-text dark:text-dark-text">
              <div ref={invoice} className="flex flex-col items-center">
                <h3 className="font-heading py-3 text-xl font-semibold text-green-500">
                  Payment Successful
                </h3>
                <span className="font-heading font-medium text-lg">
                  {paymentFarmer.name}
                </span>
                <span className="font-body text-base">
                  Amount Paid: {payment.amount}
                </span>
                <span className="font-body text-base">
                  Amount Due: {farmerDue.amount_due - payment.amount}
                </span>
                <span className="font-body">
                  Date: {new Date().toISOString().split("T")[0]}
                </span>
              </div>
              <div className="flex justify-center gap-x-4">
                <button
                  className="border rounded-sm px-2 py-1 bg-success text-white font-medium"
                  onClick={() => {
                    dispatch(resetFarmerSearch());
                    setIsPaymentFormOpen(false);
                    setFarmerDue(null);
                    setShowInvoice(false);
                  }}>
                  Done
                </button>
                <button
                  className="border rounded-sm px-2 py-1 bg-accent text-white font-medium"
                  onClick={handleShareInvoice}>
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
