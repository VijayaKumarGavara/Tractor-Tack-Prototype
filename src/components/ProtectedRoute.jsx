import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const { loggedInTractorDriver, authCheck } = useSelector(
    (state) => state.tractorDriver
  );

  if (!authCheck) return <div>Checking session...</div>;

  if (!loggedInTractorDriver) {
    return <Navigate to="/login/tractor-driver" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
