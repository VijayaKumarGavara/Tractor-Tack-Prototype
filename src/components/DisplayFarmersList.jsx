import { useDispatch, useSelector } from "react-redux";

import { setSelectedFarmer } from "../store/farmerSearchSlice";
import { useState } from "react";

import RegisterFarmer from "./RegisterFarmer";

const DisplayFarmersList = () => {
  const [registerForm, setRegisterForm] = useState(false);
  const dispatch = useDispatch();
  const farmerList = useSelector((store) => store.farmerSearch.farmerResults);
  const hasSearched = useSelector((store) => store.farmerSearch.hasSearched);
  function selectFarmer(f) {
    setRegisterForm(false);
    dispatch(setSelectedFarmer(f));
  }

  return (
    <>
      <div className="mt-8">
        {farmerList.length > 0 && (
          <div className="flex flex-col items-center gap-y-4">
            <ul className="w-full text-light-text2 dark-text-dark-text2">
              {farmerList?.map((f) => {
                return (
                  <li
                    key={f.farmer_id}
                    onClick={() => selectFarmer(f)}
                    className="list-none py-2 border-b-2 text-center cursor-pointer hover:bg-light-card hover:dark:bg-dark-card hover:shadow-md">
                    {f.name} — {f.village}
                  </li>
                );
              })}
            </ul>
            <div>
              <button
                onClick={() => setRegisterForm(true)}
                type="button"
                className="bg-green-600 p-1 rounded-md font-medium text-white">
                Register Different Farmer
              </button>
            </div>
          </div>
        )}
        {hasSearched && farmerList && farmerList.length === 0 && (
          <div className="flex flex-col items-center gap-3 w-full text-center">
            <p className="text-lighttext2 dark:text-dark-text2">
              No Matching Results Found.. Please Register a new farmer.
            </p>
            <button
              onClick={() => setRegisterForm(true)}
              type="button"
              className="bg-green-600 p-3 rounded-md font-medium text-white">
              Register New Farmer
            </button>
          </div>
        )}

        {registerForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-lg">
              <RegisterFarmer
                type="spot-registration"
                onClose={() => setRegisterForm(false)}
                closeOption={true}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayFarmersList;
