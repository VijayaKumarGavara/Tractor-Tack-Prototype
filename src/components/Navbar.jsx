import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect, useRef } from "react";
const Navbar = ({ handleTheme, theme }) => {
  const navRef = useRef(null);
  const [showDropdown, setShowDropDown] = useState({
    work: false,
    payments: false,
  });
  const tractorDriver = useSelector(
    (store) => store.tractorDriver.loggedInTractorDriver
  );
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
    <header className=" sm:pt-5 bg-light-bg dark:bg-dark-bg sm:px-6 flex itmes-center justify-between items-center">
      <div className="font-heading font-bold text-base sm:text-xl text-light-text dark:text-dark-text mx-2 px-2 py-1 bg-light-card dark:bg-dark-card  rounded-sm">
        Tractor-Track
      </div>
      <nav
        ref={navRef}
        className="hidden sm:relative px-4 md:flex gap-x-6 border shadow-lg rounded-lg py-2 text-lg text-light-text dark:text-dark-text bg-light-card dark:bg-dark-card">
        <Link to="/">Home</Link>

        {/* WORK DROPDOWN */}
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropDown({ work: !showDropdown.work, payments: false });
          }}>
          <button className="flex items-center gap-1">
            Work <ExpandMoreIcon fontSize="small" />
          </button>

          {showDropdown.work && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-light-card dark:bg-dark-card border rounded-md shadow-md flex flex-col">
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
        </div>

        {/* PAYMENTS DROPDOWN */}
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropDown({ work: false, payments: !showDropdown.payments });
          }}>
          <button className="flex items-center gap-1">
            Payments <ExpandMoreIcon fontSize="small" />
          </button>

          {showDropdown.payments && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-light-card dark:bg-dark-card border rounded-md shadow-md flex flex-col z-30">
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
        </div>

        <Link to="/register-farmer">+ New Farmer</Link>
      </nav>

      <div>
        {tractorDriver && (
          <Link
            to="/profile"
            className="p-2 text-light-text dark:text-dark-text">
            <AccountCircleIcon fontSize="medium" />
          </Link>
        )}

        <button
          type="button"
          onClick={() => handleTheme()}
          className="px-2 py-4 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text rounded-md">
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
