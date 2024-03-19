import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { useState } from "react"
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const DashBoard = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex gap-x-5">
      <FaBars
        onClick={() => setShow(!show)}
        className="absolute block text-2xl top-2 right-2 text-primary md:hidden"
      />
      <div className="absolute block md:hidden">{show && <Navbar />}</div>

      <div className="hidden md:block">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
