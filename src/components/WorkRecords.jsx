import { useEffect, useState } from "react";
import { API_URL } from "../utils/constant";

const WorkRecords = () => {
  const [tractorWorks, setTractorWorks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  useEffect(() => {
    async function getTractorWorks() {
      const token = localStorage.getItem("tractor_token");

      try {
        const res = await fetch(`${API_URL}api/tractor-works`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          console.error("Failed to fetch work records");
          return;
        }
        const data = await res.json();
        setTractorWorks(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setHasSearched(true);
      }
    }
    getTractorWorks();
  }, []);

  if (!hasSearched && tractorWorks===0) {
    return (
      <div className="mt-10 flex flex-col items-center ">
        <h2 className="font-bold text-2xl text-light-text dark:text-dark-text">
          Getting your work records..!
        </h2>
      </div>
    );
  }
  if (hasSearched && tractorWorks.length===0) {
    return (
      <div className="mt-10 flex flex-col items-center ">
        <h2 className="font-bold text-2xl text-light-text dark:text-dark-text">
          No Records Found..
        </h2>
      </div>
    );
  }
  return (
    <>
      <div className="mt-10 flex flex-col items-center ">
        <h2 className="font-bold text-2xl font-heading text-light-text dark:text-dark-text">
          Work Records
        </h2>

        <div className="mt-10 w-full max-w-md px-3 space-y-4 mb-16">
          {tractorWorks.map((r, idx) => (
            <div
              key={idx}
              className="bg-light-card dark:bg-dark-card rounded-lg p-4 shadow-sm border border-light-border dark:border-dark-border">
              {/* HEADER */}
              <div className="flex justify-between items-center text-sm opacity-70">
                <span className="text-light-text2 dark:text-dark-text2">
                  {r.work_date}
                </span>
                <span className="font-semibold text-success">
                  ₹{r.total_amount}
                </span>
              </div>

              {/* FARMER + WORK */}
              <div className="mt-1">
                <p className="font-medium text-light-text dark:text-dark-text">
                  {r.name}
                </p>
                <p className="text-sm opacity-80 text-light-text2 dark:text-dark-text2">
                  {r.work_type}{" "}
                  {r.pricing_context
                    ? ` | (${Object.values(r.pricing_context)[0]})`
                    : ""}
                </p>
              </div>

              {/* QTY + RATE */}
              <div className="mt-2 flex justify-between text-sm text-light-text2 dark:text-dark-text2">
                <span>
                  Qty: {r.quantity} {r.unit_type}
                </span>
                <span>
                  @ ₹{r.rate} / {r.unit_type}
                </span>
              </div>

              {/* NOTES */}
              {r.notes && (
                <p className="mt-2 text-xs italic opacity-60 text-light-text2 dark:text-dark-text2">
                  📝 {r.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkRecords;
