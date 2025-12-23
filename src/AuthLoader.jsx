import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAuthChecked,
  setLoggedInTractorDriver,
} from "./store/tractorDriverSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("tractor_token");

    if (!token) {
      dispatch(setAuthChecked());
      return;
    }

    async function verify() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/tractor-drivers/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        dispatch(setLoggedInTractorDriver(data.data));
      } catch {
        localStorage.removeItem("tractor_token");
      } finally {
        dispatch(setAuthChecked());
      }
    }

    verify();
  }, [dispatch]);

  return children;
};

export default AuthLoader;
