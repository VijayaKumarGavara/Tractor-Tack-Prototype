import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedInTractorDriver } from "../store/tractorDriverSlice";
import { useNavigate } from "react-router-dom";

const LoginTractorDriver = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    driver_mobile: "9515976994",
    driver_password: "shanmukh@2004",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleLogin(e) {
    e.preventDefault();
    const payload = {
      driver_mobile: formData.driver_mobile,
      driver_password: formData.driver_password,
    };
    try {
      const res = await fetch(
        "http://localhost:3000/api/tractor-drivers/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("tractor_token", data.token);
        dispatch(setLoggedInTractorDriver(data.data));
        navigate("/", { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-card dark:bg-dark-card">
      <div className="px-2 flex flex-col items-center  mx-auto max-w-xl ">
        <h2 className="font-bold text-2xl text-light-text dark:text-dark-text font-heading">
          Login
        </h2>
        <form
          action=""
          method="post"
          onSubmit={handleLogin}
          className="flex flex-col gap-8 items-center mt-10 max-w-xl">
          <input
            required
            type="tel"
            name="driver_mobile"
            value={formData.driver_mobile}
            onChange={handleChange}
            className="border border-light-border dark:border-dark-border rounded-md py-2 px-4 w-full bg-light-card dark:bg-dark-card text-light-text2 dark:text-dark-text2"
            placeholder="Mobile Number"
          />
          <div className="w-full flex items-center gap-2 border border-light-border dark:border-dark-border rounded-md py-2 px-4 bg-transparent text-light-text2 dark:text-dark-text2">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="driver_password"
              value={formData.driver_password}
              onChange={handleChange}
              placeholder="Password"
              className="flex-1 focus:outline-none  bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs min-w-[3rem]">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex gap-6 ">
            <button
              type="submit"
              className="bg-success text-light-text dark:text-dark-text font-medium w-max px-3 py-2 rounded-md ">
              Login
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  driver_mobile: "9515976994",
                  driver_password: "shanmukh@2004",
                })
              }
              className="bg-danger text-light-text dark:text-dark-text font-medium px-3 py-2 rounded-md ">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginTractorDriver;
