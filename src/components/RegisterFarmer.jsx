import { useState } from "react";
import { useDispatch } from "react-redux";

import { setSelectedFarmer } from "../store/farmerSearchSlice";
import { API_URL } from "../utils/constant";
const RegisterFarmer = ({ type, onClose, closeOption }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", village: "", mobile: "" });
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      village: form.village,
      mobile: form.mobile || null,
    };
    const token = localStorage.getItem("tractor_token");

    try {
      const res = await fetch(`${API_URL}api/farmers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        alert("Farmer registered successfully");
        if (type === "spot-registration") {
          dispatch(setSelectedFarmer(data?.data));
          setForm({ name: "", village: "", mobile: "" });

          if (onClose) onClose();
        }
      } else {
        if (data.isAlreadyExists) {
          alert("Farmer already exists, you can find them.");
        } else {
          alert("Failed to register farmer");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center ">
      {closeOption && (
        <div className="flex flex-row gap-x-44">
          <div className="max-w-xl"></div>
          <button
            className=" px-2 border rounded-md text-light-text dark:text-dark-text"
            onClick={() => onClose()}>
            X
          </button>
        </div>
      )}

      <h2 className="mt-4 font-heading font-bold text-2xl text-light-text dark:text-dark-text">
        Register New Farmer
      </h2>
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex items-center flex-col gap-4 mt-8">
        <input
          type="text"
          className="border py-2 px-4 rounded-md border-light-border dark:border-dark-border bg-transparent text-light-text dark:text-dark-text font-body"
          placeholder="Village"
          required
          name="village"
          value={form.village}
          onChange={handleChange}
        />
        <input
          type="text"
          className="border py-2 px-4 rounded-md border-light-border dark:border-dark-border bg-transparent text-light-text dark:text-dark-text font-body"
          placeholder="Farmer Name"
          required
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          className="border py-2 px-4 rounded-md border-light-border dark:border-dark-border bg-transparent text-light-text dark:text-dark-text font-body"
          placeholder="Farmer Mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
        />
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="bg-success w-max p-3 rounded-md text-light-text dark:text-dark-text font-body">
            Register
          </button>
          <button
            type="reset"
            onClick={() => setForm({ name: "", village: "", mobile: "" })}
            className="bg-danger p-3 rounded-md text-light-text dark:text-dark-text font-body">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterFarmer;
