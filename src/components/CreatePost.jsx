import { useState } from "react";
import Modal from "./Modal";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <div>
      CreatePost
      <button onClick={openModal}>onclick</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-2 text-xl font-bold"></h2>

        <div>
          <input className="rounded-md" type="text" /> <br />
          <button className="px-2 py-1 mt-2 font-bold text-white bg-green-600 ">
            post
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
