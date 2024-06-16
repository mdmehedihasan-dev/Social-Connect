import MsgFriend from "./MsgFriend";
import MsgGroup from "./MsgGroup";

const Message = () => {
  return (
    <div className="flex justify-between">
      <div className="w-2/5 ">
        <MsgFriend />
        <MsgGroup />
      </div>

      <div className="relative w-3/5 pt-5">
        <div className=" rounded-md h-[660px] box-container w-small lg:w-[850px]">
          <div>
            {/* ==============name=================== */}
            <div className="px-2 py-3 font-bold text-white bg-blue-500">
              <h1 className="">Bhallala Deva</h1>
              <p>Active</p>
            </div>
            {/* receive message=================== */}
           <div className="text-left">
           <div className="inline-block px-2 py-1 my-5 bg-blue-200 border-2 rounded-xl">
            <p className="text-lg text-blue-800 ">
                Lorem ipsum dolor 
              </p>
            </div>
           </div>
        
            {/* send message =============================== */}
           <div className="text-right">
           <div className="inline-block px-2 py-1 bg-green-300 border-2 rounded-xl">
              <p className="text-lg text-gray-800 ">
                Lorem ipsum dolor sit 
              </p>
            </div>
           </div>

            {/* write message ====================== */}

            <div className="absolute rounded-bl-md rounded-br-md  bottom-0  w-[848px] border-t p-3 bg-green-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center w-4/5 gap-x-2">
                  <div className="w-4/5">
                    <input className="w-full p-3 rounded-xl" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
