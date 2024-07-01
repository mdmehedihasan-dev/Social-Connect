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
// import { FaUserFriends } from "react-icons/fa";

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
    <div className="h-screen pt-5 box-container w-small lg:w-full">
         <div className="left-0 flex items-center justify-between pb-4 bg-white dark:bg-dark -top-2">
            <h2 className="font-mono text-2xl">Friend Request </h2>
          </div>
      {/* <div
        ref={dropdownRef}
        className="relative flex items-center justify-center w-10 h-10 text-xl text-white bg-purple-600 rounded-full cursor-pointer md:w-16 md:h-16 md:text-4xl"
      >
        <FaUserFriends />
        
      </div> */}
      {/* {show && (    )}  */}
        <div className="h-auto p-2 bg-white dark:bg-dark ">
          {/* friends header  */}
       
          {/* friends name  */}

          <div className="flex flex-wrap gap-y-20 gap-x-10 ">
            {requestList.map((item, i) => (
              <div 
                key={i}
                className="w-60 h-60"
              >
                <div >
                  <div>
                    <img
                      className="w-full rounded-md"
                      src="../../public/images.jpeg"
                      alt=""
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-lg font-bold ">{item.whosendname}</h1>
                  </div>
                </div>
                <div className="w-full ">
                  <button
                    onClick={() => handleRequestAccept(item)}
                    className="w-full px-2 mb-2 text-white bg-blue-700 rounded-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(item.id)}
                    className="w-full px-2 text-white bg-red-600 rounded-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    
    </div>
  );
};

export default FriendRequest;
