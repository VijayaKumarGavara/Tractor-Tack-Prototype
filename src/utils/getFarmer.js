import { API_URL } from "./constant";

async function getFarmer(
  formName,
  name = null,
  village = null,
  mobile = null,
  id = null
) {
  let url = `${API_URL}api/farmers`;
  const token = localStorage.getItem("tractor_token");
  if (formName === "name+village") {
    url += `?name=${encodeURIComponent(name)}&village=${encodeURIComponent(
      village
    )}`;
  } else if (formName === "mobile") {
    url += `?mobile=${encodeURIComponent(mobile)}`;
  } else if (formName === "farmerid") {
    url += `?farmer_id=${encodeURIComponent(id)}`;
  }
  try {
    const res = fetch(url, {
      method: "GET", // or POST, PUT, etc.
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.log(err.message);
  }
}

export default getFarmer;
