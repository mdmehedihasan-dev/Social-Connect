import { FaMoon, FaSun } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { toggleTheme } from "../slice/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import Modal from "../components/Modal";


const Setting = () => {
  const [isModalOut, setIsModalOut] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const closeModalOut = () => setIsModalOut(false);
  const openModalOut = () => setIsModalOut(true);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(activeUser(null));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button  onClick={openModalOut}>click</button>
      <div className="mt-20 text-4xl font-bold text-white cursor-pointer">
        <TbLogout2 onClick={handleSignOut} className="mx-auto w-[60%]" />
      </div>


      <Modal isOpen={isModalOut} onClose={closeModalOut}>
      <button className="mx-auto" onClick={() => dispatch(toggleTheme())}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
      </Modal>
    </div>
  );
};

export default Setting;
