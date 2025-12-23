import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="h-96 w-full  flex justify-center items-center">
        <div className="mt-36 flex flex-col items-center ">
          <h2 className="text-xl sm:text-3xl font-heading font-bold text-light-text dark:text-dark-text">
            Welcome to Tractor Track
          </h2>
          <p className="mt-2 text-light-text2">
            Manage tractor works and payments easily
          </p>

          <div className="flex flex-col sm:flex-row justify-center mt-5 gap-y-5">
            <Link
              to="/new-work"
              className="px-2 py-4 rounded-lg text-light-text dark:text-dark-text bg-success  text-lg sm:text-lg  mx-5 text-center">
              +Add New Work
            </Link>
            <Link
              to="/payment-dues"
              className="px-2 py-4 rounded-lg text-light-text dark:text-dark-text bg-success  text-lg sm:text-lg  mx-5 text-center">
              Check Pending Dues
            </Link>
            <Link
              to="/payment"
              className="px-2 py-4 rounded-lg text-light-text dark:text-dark-text bg-success  text-lg sm:text-lg mx-5 text-center">
              Take Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
