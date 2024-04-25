import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const GroupList = () => {
  let [show, setShow] = useState(true);
  return (

    


    <div className="h-auto p-2 bg-white rounded-md dark:bg-black max-h-80 box-container sm:w-small lg:w-box">
      {/* group header  */}

      <div className="sticky right-0 flex items-center justify-between w-full pb-4 bg-white dark:bg-black -top-2 ">
        <h2 className="font-mono text-2xl">Groups </h2>
        <BsThreeDotsVertical onClick={() => setShow(!show)} />
      </div>

      {/* group names  */}
      {show && (
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
      )}
    </div>
  );
};

export default GroupList;
