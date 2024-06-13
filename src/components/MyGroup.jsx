import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdGroupAdd } from "react-icons/md";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import Modal from "./Modal";

const MyGroup = () => {
  const db = getDatabase();
  let [groupList, setGroupList] = useState([]);
  let [groupRequestList, setGroupRequestList] = useState([]);
  let [members,setMembers] = useState([])

  let [show, setShow] = useState(false);
  let dropdownRef = useRef();
  let userInfo = useSelector((state) => state.user.value);

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (info) => {
    setIsModalOpen(true);
    const groupRequestRef = ref(db, "groupRequest/");
    onValue(groupRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (info.gid == item.val().groupid) {
          arr.push({ ...item.val(), grid: item.key });
        }
      });
      setGroupRequestList(arr);
    });
  };
  const closeModal = () => setIsModalOpen(false);
  const closeModal2 = () => setIsModalOpen2(false);

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
    const groupRef = ref(db, "group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid == item.val().adminId) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      // console.log(snapshot.val())
      setGroupList(arr);
    });
  }, []);

  let handleJoinRequst = (item) => {
    set(push(ref(db, "groupmember")), {
      ...item,
    }).then(() => {
      remove(ref(db, "groupRequest/" + item.grid));
    });
  };

  let handleDeleteRequst = (item) => {
    remove(ref(db, "groupRequest/" + item.grid));
  };

  // ======================
  useEffect(()=>{
    const memberRef = ref(db, "groupmember");
    onValue(memberRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // if(){

        // }
      arr.push(item.val());
      });
      setMembers(arr);
    });
  },[])

  return (
    <div className="pt-5">
      <div
        ref={dropdownRef}
        className="relative flex items-center justify-center w-10 h-10 text-xl text-white bg-green-300 rounded-full cursor-pointer group md:w-16 md:h-16 md:text-4xl"
      >
        {" "}
        <MdGroupAdd />
        <div className="absolute w-10 h-10 text-lg font-bold text-center transition-opacity duration-300 bg-green-300 rounded-full opacity-0 md:w-16 md:h-16 group-hover:opacity-100">
          My Groups{" "}
        </div>
      </div>

      {show && (
        <div className="absolute top-24 left-7 sm:left-[172px] h-auto p-2 rounded-md max-h-80 box-container w-small lg:w-box">
          {/* MyGroup header  */}

          <div className="sticky left-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2 ">
            <h2 className="font-mono text-2xl">My Group </h2>
            <BsThreeDotsVertical className="cursor-pointer" />
          </div>

          {/* MyGroup names  */}

          <div className="">
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
                    <h1 className="text-lg font-bold">{item.groupname}</h1>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => openModal(item)}
                    className="px-2 text-white bg-green-600 rounded-sm hover:bg-red-400"
                  >
                    Request
                  </button>

                  <button
                    onClick={() => openModal2(item)}
                    className="px-2 text-white bg-blue-600 rounded-sm hover:bg-red-400"
                  >
                    Members
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {groupRequestList.map((item, i) => (
          <div className="font-mono text-left " key={i}>
            <h2 className="text-lg font-bold">{item.username}</h2>
            <div>
              {
                <h2 className="mb-2 font-semibold text-green-500 text-md">{`${item.username} wants to join ${item.groupname}`}</h2>
              }
              <div className="flex gap-x-2">
                <button
                  onClick={() => handleJoinRequst(item)}
                  className="px-4 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded ppy1 hover:bg-blue-400 hover:border-blue-500"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDeleteRequst(item)}
                  className="px-4 font-bold text-white bg-red-500 border-b-4 border-red-700 rounded hover:bg-red-400 hover:border-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </Modal>

      <Modal isOpen={isModalOpen2} onClose={closeModal2}>
         {
          members.map((item,i)=>(
            <div key={i}>
               <h1>{item.username}</h1>
            </div>
          ))
         }
      </Modal>
    </div>
  );
};

export default MyGroup;
