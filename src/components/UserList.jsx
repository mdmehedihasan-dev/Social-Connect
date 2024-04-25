import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  let [show, setShow] = useState(true);

  let [userList, setUserList] = useState([]);

  let userInfo = useSelector((state)=>state.user.value)

  useEffect(() => {
    const userRef = ref(db, "users" );
    onValue(userRef, (snapshot) => {
      const arr = []

      snapshot.forEach(item=>{
        if(userInfo.uid !== item.key){
            arr.push({
                username:item.val().username,
                email:item.val().email
            })
        }
      })
      setUserList(arr)
    });
  }, []);

  return (
    <div className="h-auto p-2 rounded-md max-h-80 box-container w-small lg:w-box">
      {/* friends header  */}

      <div className="sticky left-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2 ">
        <h2 className="font-mono text-2xl">User List </h2>
        <div onClick={() => setShow(!show)}>
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* friends name  */}
      {show && (
        <div>
         {
            userList.map((item,i)=>(
                <div key={i} className="flex items-center justify-between mb-4 group">
                <div className="flex items-center space-x-4">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../public/Ellipse 1 (1).png"
                      alt=""
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">{item.username}</h1>
                  </div>
                </div>
                <div>
                  <button className="px-2 text-white bg-gray-600 rounded-md">
                    Join
                  </button>
                </div>
              </div>
            ))
         }
        </div>
      )}
    </div>
  );
};

export default UserList;