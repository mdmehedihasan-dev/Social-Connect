import { useEffect, useRef, useState } from "react";
import { MdGroups } from "react-icons/md";
import Modal from "./Modal";
import { IoCreate } from "react-icons/io5";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const GroupList = () => {
  const db = getDatabase();
  let [groupList, setGroupList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupname, setGroupName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  let userInfo = useSelector((state) => state.user.value);

  let [show, setShow] = useState(false);
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

  let handleGroupName = () => {
    set(push(ref(db, "group/")), {
      groupname: groupname,
      adminname: userInfo.displayName,
      adminId: userInfo.uid,
    }).then(() => {
      setIsModalOpen(false);
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid != item.val().adminId) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      // console.log(snapshot.val())
      setGroupList(arr);
    });
  }, []);

  let handleJoinGroup = (item) => {
    set(push(ref(db, "groupRequest/")), {
      adminid: item.adminId,
      adminname: item.adminname,
      groupname: item.groupname,
      groupid: item.gid,
      userid: userInfo.uid,
      username: userInfo.displayName,
    });
  };

  return (
    <div className="pt-5">
      {/* <div
        ref={dropdownRef}
        className="flex relative items-center text-white justify-center w-10 h-10 md:w-16 md:h-16 text-xl md:text-4xl text-center bg-[#1e80c1] rounded-full cursor-pointer"
      >
        <MdGroups />
      
      </div> */}

      {/* {show && (    )}  */}
        <div className="h-auto p-2 bg-white dark:bg-dark max-h-80 box-container sm:w-small lg:w-box">
          <div>
            <div className="sticky right-0 flex items-center justify-between w-full pb-4 bg-white dark:bg-dark -top-2 ">
              <h2 className="font-mono text-2xl ">Groups </h2>
              <IoCreate onClick={openModal} className="cursor-pointer" />
            </div>
            {groupList.map((item, i) => (
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
                    <p className="font-bold">Admin : {item.adminname}</p>
                    <h1 className="text-lg font-bold">{item.groupname}</h1>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleJoinGroup(item)}
                    className="px-2 text-white bg-gray-600 rounded-md"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    

      <Modal  isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-2 text-xl font-bold ">Group Name</h2>

        <div>
          <input className="dark:bg-dark" onChange={(e) => setGroupName(e.target.value)} type="text" />{" "}
          <br />
          <button
            onClick={handleGroupName}
            className="px-2 py-1 mt-2 font-bold text-white bg-blue-800 "
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GroupList;
