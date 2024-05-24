import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiThreeFriends } from "react-icons/gi";
import { useSelector } from "react-redux";
const Friends = () => {
  let [show, setShow] = useState(false);
  let [friendList, setFriendList] = useState([]);
  const db = getDatabase();
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
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().whosendid == userInfo.uid ||
          item.val().whoreceiveid == userInfo.uid
        ) {
          arr.push({ ...item.val(), fid: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  let handleBlock = (item) => {
    if (userInfo.uid == item.whosendid) {
      set(push(ref(db, "block/")), {
        blockbyname: userInfo.displayName,
        blockbyid: userInfo.uid,
        blockid: item.whoreceiveid,
        blockname: item.whoreceivename,
      }).then(() => {
        remove(ref(db, "friends/" + item.fid));
      });
    } else {
      set(push(ref(db, "block/")), {
        blockbyname: userInfo.displayName,
        blockbyid: userInfo.uid,
        blockid: item.whosendid,
        blockname: item.whosendname,
      }).then(() => {
        remove(ref(db, "friends/" + item.fid));
      });
    }
  };

  return (
    <div className="pt-5">
      <div
        ref={dropdownRef}
        className="relative flex items-center justify-center w-10 h-10 text-xl bg-blue-600 rounded-full cursor-pointer md:w-16 md:h-16 md:text-4xl"
      >
        {" "}
        <GiThreeFriends />{" "}
      </div>
      {show && (
        <div className="h-auto top-24 left-7 sm:left-[172px] absolute p-2 rounded-md max-h-80 box-container w-small lg:w-box">
          {/* friends header  */}

          <div className="sticky left-0 z-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2 ">
            <h2 className="font-mono text-2xl">Friends </h2>
            <div className="cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>

          {/* friends name  */}

          <div>
            {friendList.map((item, i) => (
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
                    {item.whoreceiveid == userInfo.uid ? (
                      <h1 className="text-lg font-bold">{item.whosendname}</h1>
                    ) : (
                      <h1 className="text-lg font-bold">
                        {item.whoreceivename}
                      </h1>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleBlock(item)}
                    className="px-2 text-white bg-red-700 rounded-md"
                  >
                    Block
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

export default Friends;
