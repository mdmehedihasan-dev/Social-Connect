/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { FaUsersViewfinder } from "react-icons/fa6";
// import ProfilePhoto from "./ProfilePhoto";

const UserList = () => {
  const db = getDatabase();
  let [show, setShow] = useState(false);
  let [userList, setUserList] = useState([]);
  let [friendList, setFriendList] = useState([]);
  let [friends, setFriends] = useState([]);
  let [block, setBlock] = useState([]);
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
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid != item.key) {
          arr.push({
            userId: item.key,
            username: item.val().username,
            email: item.val().email,
            photo:item.val().profile_picture
          });
        }
      });
      setUserList(arr);
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, "friendRequest");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whosendid + item.val().whoreceiveid);
      });
      setFriendList(arr);
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, "friends");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whosendid + item.val().whoreceiveid);
      });
      setFriends(arr);
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, "block/");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockid + item.val().blockbyid);
      });
      setBlock(arr);
    });
  }, []);

  // function for friend request
  let handleFriendRequest = (item) => {
    console.log(item);
    set(push(ref(db, "friendRequest/")), {
      whosendid: userInfo.uid,
      whosendname: userInfo.displayName,
      whoreceiveid: item.userId,
      whoreceivename: item.username,
    });
  };

  return (
    <div className="h-screen pt-5 box-container w-small lg:w-full">
        <div className="left-0 flex items-center justify-between pb-4 bg-white dark:bg-dark -top-2">
            <h2 className="font-mono text-2xl">All Users</h2>
          </div>

      {/* <div
        ref={dropdownRef}
        className="relative flex items-center justify-center w-10 h-10 text-xl text-white bg-purple-300 rounded-full cursor-pointer md:w-16 md:h-16 md:text-4xl"
      >
        <FaUsersViewfinder />
       
      </div> */}
      {/* {show && ( )}  */}
        <div className="h-auto p-2 bg-white dark:bg-dark ">
          {/* friends header  */}

        
          {/* friends name  */}

          <div className="flex flex-wrap gap-y-20 gap-x-10 ">
            {userList.map((item, i) => (
              <div className="w-60 h-60"
                key={i}
                // className="flex items-center justify-between mb-4 group" 
              >
                <div>
                  <div>
                  {/* <ProfilePhoto imgId={item.id} /> */}
                    <img
                      className="w-full rounded-md"
                      src={item.photo}
                      
                    />
                  </div>
                  <div className="flex justify-center">
                    <h1 className="text-lg font-bold ">{item.username}</h1>
                  </div>
                </div>
                <div className="flex justify-center" >
                  {friendList.includes(item.userId + userInfo.uid) ||
                  friendList.includes(userInfo.uid + item.userId) ? (
                    <button className="w-full text-white bg-green-500 rounded-md disabled:text-slate-500">
                      pending
                    </button>
                  ) : block.includes(item.userId + userInfo.uid) ||
                    block.includes(userInfo.uid + item.userId) ? (
                    <button className="w-full px-2 text-white bg-red-300 rounded-md disabled:text-slate-500">
                      Block
                    </button>
                  ) : friends.includes(item.userId + userInfo.uid) ||
                    friends.includes(userInfo.uid + item.userId) ? (
                    <button className="w-full px-2 text-white bg-green-600 rounded-md disabled:text-slate-500">
                      Friends
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFriendRequest(item)}
                      className="w-full px-2 text-white bg-blue-600 rounded-md"
                    >
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default UserList;
