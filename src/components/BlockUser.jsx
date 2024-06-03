import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import { useSelector } from "react-redux";

const BlockUser = () => {
  const db = getDatabase();

  let [show, setShow] = useState(false);
  let [blockList, setBlockList] = useState([]);
  let userInfo = useSelector((state) => state.user.value);

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

  useEffect(() => {
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), bid: item.key });
      });
      setBlockList(arr);
    });
  }, []);

  let handleUnBlock = (id) => {
    remove(ref(db, "block/" + id));
  };

  return (
    <div className="pt-5">
      <div
        ref={dropdownRef}
        className="relative flex items-center justify-center w-10 h-10 text-xl text-white bg-red-600 rounded-full cursor-pointer group md:w-16 md:h-16 md:text-4xl"
      >
        <ImBlocked />
        <div className="absolute w-10 h-10 text-lg font-bold text-center transition-opacity duration-300 bg-red-600 rounded-full opacity-0 md:w-16 md:h-16 group-hover:opacity-100">
         Block Users </div>
      </div>
      {show && (
        <div className="absolute top-24 left-7 sm:left-[172px] h-auto p-2 rounded-md max-h-80 box-container w-small lg:w-box">
          {/* friends header  */}

          <div className="sticky left-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2 ">
            <h2 className="font-mono text-2xl">Block User List </h2>
            <div className="cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>

          {/* friends name  */}

          {blockList.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between mb-4 group"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  {item.blockbyid == userInfo.uid ? (
                    <h1 className="text-lg font-bold">{item.blockname}</h1>
                  ) : (
                    <h1 className="text-lg font-bold">{item.blockbyname}</h1>
                  )}
                </div>
              </div>
              <div>
                {item.blockbyid == userInfo.uid && (
                  <button
                    onClick={() => handleUnBlock(item.bid)}
                    className="px-2 text-white bg-green-600 rounded-md"
                  >
                    Unblock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockUser;
