import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import HomeFilledIcon from '@mui/icons-material/HomeFilled';
const MobileNavbar = () => {
  const navRef = useRef(null);
  const [showDropdown, setShowDropDown] = useState({
    work: false,
    payments: false,
  });
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowDropDown({ work: false, payments: false });
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="w-full fixed bottom-0 md:hidden ">
        <nav
          ref={navRef}
          className="relative px-1 flex flex-row gap-x-3 justify-around shadow-lg min-h-12 py-2 text-light-text dark:text-dark-text bg-light-card dark:bg-dark-card font-body text-base">
          <Link to="/">Home</Link>

          {/* WORK DROPDOWN */}
          <div
            className="relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropDown({ work: !showDropdown.work, payments: false });
            }}>
            <button className="flex items-center gap-1">
              Work <ExpandLessIcon fontSize="small" />
            </button>
          </div>
          {showDropdown.work && (
            <div className="absolute bottom-12 left-0 mt-2 w-full bg-light-card dark:bg-dark-card border rounded-md shadow-md flex flex-col">
              <Link
                className="px-4 py-2 hover:text-light-text2 dark:hover:text-dark-text2"
                to="/new-work">
                ➕ Add Work
              </Link>
              <Link
                className="px-4 py-2 hover:text-light-text2 dark:hover:text-dark-text2"
                to="/work-records">
                📄 Work Records
              </Link>
            </div>
          )}
          {/* PAYMENTS DROPDOWN */}
          <div
            className="relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropDown({
                work: false,
                payments: !showDropdown.payments,
              });
            }}>
            <button className="flex items-center gap-1">
              Payments <ExpandLessIcon fontSize="small" />
            </button>
          </div>
          {showDropdown.payments && (
            <div className="absolute bottom-12 left-0 mt-2 w-full bg-light-card dark:bg-dark-card border rounded-md shadow-md flex flex-col">
              <Link
                className="px-4 py-2 hover:text-light-text2 dark:hover:text-dark-text2"
                to="/payment-dues">
                📄 Payment Dues
              </Link>
              <Link
                className="px-4 py-2 hover:text-light-text2 dark:hover:text-dark-text2"
                to="/payment">
                 ₹ Make Payment
              </Link>
              <Link
                className="px-4 py-2 hover:text-light-text2 dark:hover:text-dark-text2"
                to="/transactions">
                📊 Transactions
              </Link>
            </div>
          )}
          <Link to="/register-farmer">Register Farmer</Link>
        </nav>
      </div>
    </>
  );
};

export default MobileNavbar;
