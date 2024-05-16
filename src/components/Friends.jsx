import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
const Friends = () => {
  let [show, setShow] = useState(true);
  let [friendList, setFriendList] = useState([]);
  const db = getDatabase();
  let userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().whosendid == userInfo.uid ||
          item.val().whoreceiveid == userInfo.uid
        ) {
          arr.push(item.val());
        }
      });
      setFriendList(arr);
    });
  }, []);

  return (
    <div className="h-auto p-2 rounded-md max-h-80 box-container w-small lg:w-box">
      {/* friends header  */}

      <div className="sticky left-0 z-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2 ">
        <h2 className="font-mono text-2xl">Friends </h2>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* friends name  */}
      {show && (
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
                  <h1 className="text-lg font-bold">{item.whoreceivename}</h1>
                )}
              </div>
            </div>
            <div>
              <button className="px-2 text-white bg-red-700 rounded-md">
                Block
              </button>
            </div>
          </div>
          )
            
          )}
        </div>
      )}
    </div>
  );
};

export default Friends;
