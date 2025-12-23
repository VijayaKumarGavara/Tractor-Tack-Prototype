import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Hero from "./components/Hero";
import NewWork from "./components/NewWork";
import WorkRecords from "./components/WorkRecords";
import PaymentDues from "./components/PaymentDues";
import Payment from "./components/Payment";
import Profile from "./components/Profile";
import Transactions from "./components/Transactions";
import RegisterFarmer from "./components/RegisterFarmer";
import LoginTractorDriver from "./components/LoginTractorDriver";
import ProtectedRoute from "./components/ProtectedRoute";
import Body from "./Body";

import { Provider } from "react-redux";

import appStore from "./store/appStore";
import AuthLoader from "./AuthLoader";
import { useEffect, useState } from "react";
const App = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <Provider store={appStore}>
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
          <BrowserRouter>
            <AuthLoader>
              <Routes>
                <Route
                  path="/login/tractor-driver"
                  element={<LoginTractorDriver />}></Route>
                <Route path="/" element={<ProtectedRoute />}>
                  <Route
                    path="/"
                    element={<Body handleTheme={handleTheme} theme={theme} />}>
                    <Route path="/" index element={<Hero />}></Route>
                    <Route path="/new-work" element={<NewWork />}></Route>
                    <Route
                      path="/work-records"
                      element={<WorkRecords />}></Route>
                    <Route
                      path="/payment-dues"
                      element={<PaymentDues />}></Route>
                    <Route path="/payment" element={<Payment />}></Route>
                    <Route
                      path="/transactions"
                      element={<Transactions />}></Route>
                    <Route
                      path="/register-farmer"
                      element={
                        <RegisterFarmer type={"normal-registration"} />
                      }></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                  </Route>
                </Route>
              </Routes>
            </AuthLoader>
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
};

export default App;
