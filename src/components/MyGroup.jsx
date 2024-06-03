import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdGroupAdd } from "react-icons/md";

const MyGroup = () => {
  let [show, setShow] = useState(false);
  let dropdownRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      console.log(dropdownRef.current);
      if (dropdownRef.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <div className="pt-5">
      <div
        ref={dropdownRef}
        className="relative text-white flex items-center justify-center w-10 h-10 text-xl bg-green-300 rounded-full cursor-pointer group md:w-16 md:h-16 md:text-4xl"
      >
        {" "}
        <MdGroupAdd />
        <div className="absolute w-10 h-10 text-lg font-bold text-center  transition-opacity duration-300 bg-green-300 rounded-full opacity-0 md:w-16 md:h-16 group-hover:opacity-100">
         My Groups </div>
      </div>

      {show && (
        <div className="absolute top-24 left-7 sm:left-[172px] h-auto p-2 rounded-md max-h-80 box-container w-small lg:w-box">
          {/* MyGroup header  */}

          <div className="sticky left-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2 ">
            <h2 className="font-mono text-2xl">My Group </h2>
            <BsThreeDotsVertical className="cursor-pointer" />
          </div>

          {/* MyGroup names  */}

          <div>
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

export default MyGroup;
