import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import MobileNavbar from "./components/MobileNavbar";
const Body = ({handleTheme, theme}) => {
  return (
    <>
      <Navbar handleTheme={handleTheme} theme={theme}/>
      <Outlet />
      <MobileNavbar/>
    </>
  );
};

export default Body;
