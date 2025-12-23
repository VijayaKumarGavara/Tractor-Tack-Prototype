import { useState } from "react";
import { useDispatch } from "react-redux";

import { resetFarmerSearch } from "../store/farmerSearchSlice";

import { workPricingConfig } from "../utils/workPricingConfig";
import getPricingContext from "../utils/getPricing";
const AddWork = ({ farmer_id }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("tractor_token");

  const [form, setForm] = useState({
    workType: "",
    mission: "",
    crop: "",
    quantity: "",
    rate: "",
    unit: "",
    notes: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitWork(e) {
    e.preventDefault();

    const payload = {
      farmer_id,
      work_type: form.workType,
      pricing_context: getPricingContext(form),
      unit_type: form.unit,
      notes: form.notes,
      quantity: Number(form.quantity),
      rate: Number(form.rate),
      work_date: new Date().toISOString().split("T")[0],
    };

    const res = await fetch("http://localhost:3000/api/tractor-works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Work added successfully");
      dispatch(resetFarmerSearch());
      setForm({
        workType: "",
        mission: "",
        crop: "",
        quantity: "",
        rate: "",
        unit: "",
        notes: "",
      });
    } else {
      alert("Failed to add work");
    }
  }

  const selectedConfig = workPricingConfig[form.workType];

  return (
    <>
      <div className="flex gap-4 justify-center items-center">
        <label className="px-2 mt-5">Select</label>

        <select
          required
          className="border border-gray-500 rounded-sm px-2 mt-5"
          value={form.workType}
          onChange={(e) => {
            const type = e.target.value;
            setForm({
              workType: type,
              mission: "",
              crop: "",
              quantity: "",
              rate: "",
              notes: "",
              unit: workPricingConfig[type]?.unit || "",
            });
          }}>
          <option value="">Work Type</option>
          {Object.keys(workPricingConfig).map((type) => (
            <option value={type} key={type}>
              {workPricingConfig[type].label}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic rendering */}
      {selectedConfig && (
        <div className="mt-6 text-center">
          <h3 className="font-semibold text-lg">{selectedConfig.label} Form</h3>

          {/* Loading */}
          {form.workType === "loading" && (
            <form
              className="flex flex-col items-center mt-3 gap-4"
              onSubmit={handleSubmitWork}>
              <p>Unit: {selectedConfig.unit}</p>

              <input
                type="number"
                name="quantity"
                placeholder="Number of Loads"
                className="border rounded-md p-3"
                min={1}
                value={form.quantity}
                onChange={handleChange}
              />

              <input
                type="number"
                name="rate"
                placeholder="Cost per Load"
                className="border rounded-md p-3"
                min={1}
                value={form.rate}
                onChange={handleChange}
              />
              <input
                type="text"
                name="notes"
                placeholder="Notes"
                className="border rounded-md p-3"
                min={1}
                value={form.notes}
                onChange={handleChange}
              />
              <button className="px-3 py-2 bg-green-500 text-white rounded-md">
                Add
              </button>
            </form>
          )}

          {/* Ploughing */}
          {form.workType === "ploughing" && (
            <div className="mt-4 flex flex-col items-center gap-4">
              <select
                className="border p-2 rounded-md"
                value={form.mission}
                onChange={(e) => {
                  const mission = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    mission,
                    unit: selectedConfig.missions[mission].unit,
                  }));
                }}>
                <option value="">Select Ploughing Type</option>
                {Object.keys(selectedConfig.missions).map((m) => (
                  <option key={m} value={m}>
                    {selectedConfig.missions[m].label}
                  </option>
                ))}
              </select>

              {form.mission && (
                <form
                  className="flex flex-col items-center gap-4"
                  onSubmit={handleSubmitWork}>
                  <p>Unit: {form.unit}</p>

                  <input
                    type="number"
                    name="quantity"
                    placeholder="Number of Hours"
                    className="border rounded-md p-3"
                    min={1}
                    value={form.quantity}
                    onChange={handleChange}
                  />

                  <input
                    type="number"
                    name="rate"
                    placeholder="Cost per Hour"
                    className="border rounded-md p-3"
                    min={1}
                    value={form.rate}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    className="border rounded-md p-3"
                    min={1}
                    value={form.notes}
                    onChange={handleChange}
                  />
                  <button className="px-3 py-2 bg-green-500 text-white rounded-md">
                    Add
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Harvesting */}
          {form.workType === "harvesting" && (
            <div className="mt-4 flex flex-col items-center gap-4">
              <select
                className="border p-2 rounded-md"
                value={form.crop}
                onChange={(e) => {
                  const crop = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    crop,
                    unit: selectedConfig.cropTypes[crop].unit,
                  }));
                }}>
                <option value="">Select Crop</option>
                {Object.keys(selectedConfig.cropTypes).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {form.crop && (
                <form
                  className="flex flex-col items-center gap-4"
                  onSubmit={handleSubmitWork}>
                  <p>Unit: {form.unit}</p>

                  <input
                    type="number"
                    name="quantity"
                    placeholder={`Quantity (${form.unit})`}
                    className="border rounded-md p-3"
                    min={1}
                    value={form.quantity}
                    onChange={handleChange}
                  />

                  <input
                    type="number"
                    name="rate"
                    placeholder="Cost per Unit"
                    className="border rounded-md p-3"
                    min={1}
                    value={form.rate}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    className="border rounded-md p-3"
                    min={1}
                    value={form.notes}
                    onChange={handleChange}
                  />
                  <button className="px-3 py-2 bg-green-500 text-white rounded-md">
                    Add
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddWork;
