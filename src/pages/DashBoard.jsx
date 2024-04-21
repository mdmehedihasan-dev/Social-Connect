import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { useState } from "react"
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  let data = useSelector((state)=>state?.user?.value)
  console.log(data)

  useEffect(()=>{
    if(!data?.email){
      navigate("/")
    }
  },[])


  return (
    <div className="flex gap-x-5">
     
     <FaBars 
        onClick={() => setShow(!show)}
        className="absolute block text-2xl text-gray-600 cursor-pointer top-2 right-2 md:hidden"
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
