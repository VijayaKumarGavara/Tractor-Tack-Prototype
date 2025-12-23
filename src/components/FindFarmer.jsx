import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import getFarmer from "../utils/getFarmer";
import DisplayFarmersList from "./DisplayFarmersList";

import { setFarmerResults, setHasSearched } from "../store/farmerSearchSlice";
const FindFarmer = () => {
  const [formName, setFormName] = useState("name+village");
  const dispatch = useDispatch();
  const farmerName = useRef();
  const village = useRef();
  const mobile = useRef();
  const farmerId = useRef();
  function handleSearchBy(e) {
    if (e.target.value === "name+village") {
      setFormName("name+village");
    } else if (e.target.value === "mobile") {
      setFormName("mobile");
    } else if (e.target.value === "farmerid") {
      setFormName("farmerid");
    }
  }
  async function handleSearch(e) {
    e.preventDefault();
    dispatch(setFarmerResults([]));
    dispatch(setHasSearched(false));
    let res;
    if (formName === "name+village") {
      res = await getFarmer(
        formName,
        farmerName.current.value,
        village.current.value,
        null,
        null
      );
    } else if (formName === "mobile") {
      res = await getFarmer(formName, null, null, mobile.current.value, null);
    } else if (formName === "farmerid") {
      res = await getFarmer(formName, null, null, null, farmerId.current.value);
    }

    if (!res.ok) {
      console.error("Failed to fetch farmers");
      dispatch(setHasSearched(true));
      dispatch(setFarmerResults([]));
      return;
    }

    const data = await res.json();

    dispatch(setFarmerResults(data.data));
    dispatch(setHasSearched(true));
  }

  return (
    <>
      <div className="mt-6">
        <div className="flex flex-wrap items-start justify-center gap-x-6 px-1">
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              name="search-by"
              id=""
              value="name+village"
              checked={formName === "name+village"}
              onChange={handleSearchBy}
              className="h-5 w-5 text-blue-600 checked:text-blue-600 focus:ring-blue-500"
            />{" "}
            <label
              className="font-body text-base text-light-text dark:text-dark-text"
              htmlFor="search-by">
              Name + Village
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              name="search-by"
              id=""
              value="mobile"
              className="h-5 w-5 text-blue-600 checked:text-blue-600 focus:ring-blue-500"
              onChange={handleSearchBy}
            />{" "}
            <label
              className="font-body text-base text-light-text dark:text-dark-text"
              htmlFor="search-by">
              Mobile
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              name="search-by"
              id=""
              value="farmerid"
              className="h-5 w-5 text-blue-600 checked:text-blue-600 focus:ring-blue-500"
              onChange={handleSearchBy}
            />{" "}
            <label
              className="font-body text-base text-light-text dark:text-dark-text"
              htmlFor="search-by">
              Farmer Id
            </label>
          </div>
        </div>
        {formName === "name+village" && (
          <form
            action=""
            method="post"
            className="flex flex-col items-center gap-4 mt-5">
            <input
              required
              type="text"
              name="village"
              id=""
              placeholder="Village"
              ref={village}
              className="border rounded-md py-2 px-4 text-light-text dark:text-dark-text bg-transparent"
            />
            <input
              required
              type="text"
              name="farmerName"
              id=""
              placeholder="Farmer Name"
              ref={farmerName}
              className="border rounded-md py-2 px-4 text-light-text dark:text-dark-text bg-transparent"
            />
            <button
              onClick={handleSearch}
              type="button"
              className="border rounded-md bg-success text-light-text dark:text-dark-text px-3 py-2 w-max">
              Search
            </button>
          </form>
        )}
        {formName === "mobile" && (
          <form
            action=""
            method="post"
            className="flex flex-col items-center gap-4 mt-5">
            <input
              required
              type="text"
              name="mobile"
              id=""
              placeholder="Mobile"
              ref={mobile}
              className="border rounded-md py-2 px-4 text-light-text dark:text-dark-text bg-transparent"
            />
            <button
              onClick={handleSearch}
              type="button"
              className="border rounded-md bg-success text-light-text dark:text-dark-text px-3 py-2 w-max">
              Search
            </button>
          </form>
        )}
        {formName === "farmerid" && (
          <form
            action=""
            method="post"
            className="flex flex-col items-center gap-4 mt-5">
            <input
              required
              type="text"
              name="farmerId"
              id=""
              placeholder="Farmer Id"
              ref={farmerId}
              className="border rounded-md py-2 px-4 text-light-text dark:text-dark-text bg-transparent"
            />

            <button
              onClick={handleSearch}
              type="button"
              className="border rounded-md bg-success text-light-text dark:text-dark-text px-3 py-2 w-max">
              Search
            </button>
          </form>
        )}
        <DisplayFarmersList />
      </div>
    </>
  );
};

export default FindFarmer;
