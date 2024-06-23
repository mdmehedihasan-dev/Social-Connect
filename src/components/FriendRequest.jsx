/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";

const FriendRequest = () => {
  const db = getDatabase();
  let [show, setShow] = useState(false);
  let [requestList, setRequestList] = useState([]);
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
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid == item.val().whoreceiveid) {
          arr.push({
            ...item.val(),
            id: item.key,
          });
        }
      });
      setRequestList(arr);
    });
  }, []);

  // friend request accept
  const handleRequestAccept = (item) => {
    console.log(item);
    set(push(ref(db, "friends")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });
  };

  const handleCancel = (id) => {
    remove(ref(db, "friendRequest/" + id));
  };

  return (
    <div className="pt-5">
      <div
        ref={dropdownRef}
        className="relative flex items-center justify-center w-10 h-10 text-xl text-white bg-purple-600 rounded-full cursor-pointer md:w-16 md:h-16 md:text-4xl"
      >
        <FaUserFriends />
        
      </div>
      {show && (
        <div className="absolute bg-white dark:bg-black top-24 sm:top-96 left-7 sm:left-[250px] h-auto p-2 rounded-md max-h-80 box-container w-small lg:w-box">
          {/* friends header  */}
          <div className="sticky left-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2 ">
            <h2 className="font-mono text-2xl">Friend Request </h2>
            <div className="cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>
          {/* friends name  */}

          <div>
            {requestList.map((item, i) => (
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
                    <h1 className="text-lg font-bold">{item.whosendname}</h1>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  <button
                    onClick={() => handleRequestAccept(item)}
                    className="px-2 text-white bg-green-700 rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleCancel(item.id)}
                    className="px-2 text-white bg-red-600 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
