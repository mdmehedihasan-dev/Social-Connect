import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdGroups } from "react-icons/md";

const GroupList = () => {
  let [show, setShow] = useState(false);
  let dropdownRef  = useRef()

  useEffect(()=>{
   document.body.addEventListener("click",(e)=>{
    console.log(dropdownRef.current)
    if(dropdownRef.current.contains(e.target)){
      setShow(true)
    }else{
      setShow(false)
    }
   }) 
  },[])
  return (
    <div className="pt-5">
      <div
        ref={dropdownRef}
        className="flex relative items-center justify-center w-10 h-10 md:w-16 md:h-16 text-xl md:text-4xl text-center bg-[#1e80c1] rounded-full cursor-pointer"
      > <MdGroups/> </div>

        {show && (
      <div className="absolute h-auto p-2 bg-white rounded-md top-24 left-7 sm:left-[172px] dark:bg-black max-h-80 box-container sm:w-small lg:w-box">
          <div>
            <div className="sticky right-0 flex items-center justify-between w-full pb-4 bg-white dark:bg-black -top-2 ">
              <h2 className="font-mono text-2xl ">Groups </h2>
              <BsThreeDotsVertical className="cursor-pointer" />
            </div>
            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 group">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Big Kahuna Burger Ltd.</h1>
                </div>
              </div>
              <div>
                <button className="px-2 text-white bg-gray-600 rounded-md">
                  Join
                </button>
              </div>
            </div>
          </div>
      </div>
        )}
    </div>
  );
};

export default GroupList;
