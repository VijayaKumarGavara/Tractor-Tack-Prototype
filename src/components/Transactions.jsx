import { useState, useEffect } from "react";
import { API_URL } from "../utils/constant";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    async function getTransactions() {
      const token = localStorage.getItem("tractor_token");
      const res = await fetch(`${API_URL}api/transactions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.error("Failed to fetch transactions");
        return;
      }
      const data = await res.json();
      setTransactions(data.data);
    }
    getTransactions();
  }, []);
  if (!transactions)
    return (
      <>
        <div className="mt-10 flex flex-col items-center">
          <h2 className="font-bold text-2xl font-heading text-light-text dark:text-dark-text">
            Loading Your Transactions......
          </h2>
        </div>
      </>
    );
  if (transactions && transactions.length === 0)
    return (
      <>
        <div className="mt-10 flex flex-col items-center">
          <h2 className="font-bold text-2xl font-heading text-light-text dark:text-dark-text">
            No Transactions Yet...
          </h2>
        </div>
      </>
    );
  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <h2 className="font-bold text-2xl font-heading text-light-text dark:text-dark-text">
          Transactions
        </h2>

        <div className="w-full max-w-md mt-6 flex flex-col gap-4 px-3">
          {transactions.map((t) => (
            <div
              key={t.transaction_id}
              className="bg-light-card dark:bg-dark-card rounded-lg p-4 shadow-sm border border-light-border dark:border-dark-border">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold text-green-600">
                  + ₹{t.amount}
                </div>
                <div className="text-sm mt-1 opacity-70 text-light-text dark:text-dark-text">
                  {t.payment_date}
                </div>
              </div>
              <div className="text-sm text-light-text2 dark:text-dark-text2 mt-1">
                {t.name} • {t.payment_mode.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;
