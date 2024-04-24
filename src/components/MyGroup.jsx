import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MyGroup = () => {
    let [show, setShow] = useState(false);

  return (
    <div className="h-auto p-2 rounded-md max-h-80 box-container w-small lg:w-box">
    {/* MyGroup header  */}

    <div className="sticky left-0 flex items-center justify-between pb-4 -top-2 ">
      <h2 className="font-mono text-2xl">My Group </h2>
      <BsThreeDotsVertical onClick={() => setShow(!show)} />
    </div>

    {/* MyGroup names  */}
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
  )
}

export default MyGroup