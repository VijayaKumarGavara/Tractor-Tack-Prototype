import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAuthChecked,
  setLoggedInTractorDriver,
} from "../store/tractorDriverSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tractorDriver = useSelector(
    (store) => store.tractorDriver.loggedInTractorDriver
  );
  return (
    <div className="flex flex-col items-center ">
      <h2 className="font-bold text-2xl text-light-text dark:text-dark-text font-heading">
        Profile
      </h2>

      <div className="py-5 px-3 max-w-2xl flex flex-col items-center gap-6 mt-10 bg-light-card dark:bg-dark-card rounded-lg shadow-lg">
        <h3 className="font-heading font-semibold text-xl text-light-text dark:text-dark-text">
          Name: {tractorDriver?.driver_name}
        </h3>
        <span className="text-lg font-body text-light-text2 dark:text-dark-text2">
          Village: {tractorDriver?.driver_village}
        </span>
        <span className="text-lg font-body text-light-text2 dark:text-dark-text2">
          Mobile: {tractorDriver?.driver_mobile}
        </span>
        <button
          className="px-3 py-3 bg-danger mx-auto rounded-md text-white font-semibold"
          type="button"
          onClick={() => {
            dispatch(setLoggedInTractorDriver(null));
            dispatch(setAuthChecked());
            localStorage.removeItem("tractor_token");
            navigate("/login/tractor-driver", { replace: true });
          }}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
