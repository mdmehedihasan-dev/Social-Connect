import { useEffect, useState } from "react";
import { getDatabase, ref, onValue,push,set } from "firebase/database";
import { IoCreate } from "react-icons/io5";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const MsgGroup = () => {
  const db = getDatabase();
  let [groupList, setGroupList] = useState([]);
  const [groupname, setGroupName] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  let handleGroupName = () => {
    set(push(ref(db, "group/")), {
      groupname: groupname,
      adminname: userInfo.displayName,
      adminId: userInfo.uid,
    }).then(() => {
      setIsModalOpen(false);
      toast.success("Group create successfully✌️ check your profile", {
        position: "top-center",
        theme: "dark",
      });
    });
  };

  return (
    <div className="pt-5">
      <div className="p-2 bg-white  top-24 left-7 sm:left-[172px] dark:bg-dark  box-container sm:w-small lg:w-box">
        <div className="right-0 items-center justify-between w-full pb-4 bg-white dark:bg-dark -top-2">
          <h2 className="font-mono text-2xl ">Groups </h2>
          <IoCreate onClick={openModal} className="cursor-pointer" />
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

export default MsgGroup;
