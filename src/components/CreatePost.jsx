import { useRef, useState } from "react";
import Modal from "./Modal";
import { TfiWrite } from "react-icons/tfi";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState("");

  const db = getDatabase();
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  let dropdownRef = useRef();
  let userInfo = useSelector((state) => state.user.value);
  // console.log(state.user.value)

  let handlePost = () => {
    set(push(ref(db, "post")), {
      postCreateId:userInfo.uid,
      postby: userInfo.displayName,
      data: post,
      date: `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`,
    }).then(()=>{
      closeModal(false)
    })
  };



  return (
    <div className="pt-5">
      <div
        onClick={openModal}
        ref={dropdownRef}
        className="relative flex items-center justify-center w-10 h-10 text-xl text-center text-white bg-purple-600 rounded-full cursor-pointer group md:w-16 md:h-16 md:text-4xl"
      >
        <TfiWrite />
        <div className=" hidden md:block  absolute w-10 h-10 text-lg font-bold  transition-opacity duration-300 bg-[#1e80c1] rounded-full opacity-0 md:w-16 md:h-16 group-hover:opacity-100">
          Write Here
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-2 text-xl font-bold"></h2>
        <div>
          <textarea
            onChange={(e) => setPost(e.target.value)}
            className="w-full rounded-md resize-x"
            placeholder="Write something here........ "
            type="text"
          />{" "}
          <br />
          <button
            onClick={handlePost}
            className="w-full px-2 py-1 mt-2 font-bold text-white bg-green-600 "
          >
            Post
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
