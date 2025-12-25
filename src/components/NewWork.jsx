import { useDispatch, useSelector } from "react-redux";
import FindFarmer from "./FindFarmer";
import { resetFarmerSearch } from "../store/farmerSearchSlice";
import AddWork from "./AddWorkForm";
import { useEffect } from "react";

const NewWork = () => {
  const selectedFarmer = useSelector(
    (store) => store.farmerSearch.selectedFarmer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFarmerSearch());
  }, [dispatch]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="font-bold text-2xl text-light-text dark:text-dark-text">
        Add New Work
      </h2>

      {/* STEP 1: No farmer selected → show FindFarmer */}
      {!selectedFarmer && <FindFarmer />}

      {/* STEP 2: Farmer selected → show summary */}
      {selectedFarmer && (
        <div>
          <div className="mt-4 flex gap-x-2 items-center text-light-text dark:text-dark-text">
            <span className="font-medium ">Farmer:</span>
            <span>{selectedFarmer.name}</span>
            <span>{selectedFarmer.village}</span>

            <button
              className="border rounded-md bg-warning text-white px-2 ml-2"
              onClick={() => {
                dispatch(resetFarmerSearch());
              }}>
              Edit
            </button>
          </div>
          <AddWork farmer_id={selectedFarmer.farmer_id} />
        </div>
      )}
    </div>
  );
};

export default NewWork;
