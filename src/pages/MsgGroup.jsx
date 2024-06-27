import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const MsgGroup = () => {
  const db = getDatabase();
  let [groupList, setGroupList] = useState([]);
  let userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    const groupRef = ref(db, "group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid != item.val().adminId) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);

  return (
    <div className="pt-5">
      <div className="p-2 bg-white rounded-md top-24 left-7 sm:left-[172px] dark:bg-dark h-80 box-container sm:w-small lg:w-box">
        <div className="right-0 items-center justify-between w-full pb-4 bg-white dark:bg-dark -top-2">
          <h2 className="font-mono text-2xl ">Groups </h2>
        </div>
        {groupList.map((item, i) => (
          <div key={i} className="items-center mb-4 group">
            <div className="flex items-center space-x-4">
              <div>
                <img
                  className="w-10 h-10 rounded-full"
                  src="../../public/Ellipse 1 (1).png"
                  alt=""
                />
              </div>
              <div>
                <p className="font-semibold">Admin : {item.adminname}</p>
                <h1 className="text-base font-bold">{item.groupname}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MsgGroup;
