/* eslint-disable no-unused-vars */
import Image from "./Image";
import { FaHome, FaMoon, FaSun, FaUsers } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slice/userSlice";
import { useState, createRef } from "react";
import { Cropper } from "react-cropper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "cropperjs/dist/cropper.css";
import { Bars } from "react-loader-spinner";
import themeSlice, { toggleTheme } from "../slice/themeSlice";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, set, ref as databaseref } from "firebase/database";
import { GiThreeFriends } from "react-icons/gi";

const Navbar = () => {
  const { theme } = useSelector((state) => state.theme);

  const auth = getAuth();
  const storage = getStorage();

  // state for modal

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //  state for crop images
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const db = getDatabase();

  let [loading, setLoading] = useState(false);

  let location = useLocation();
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state.user.value);
  // console.log(userInfo.value)
  const navigate = useNavigate();
  // function for crop image
  const getCropData = () => {
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    const storageRef = ref(storage, `profile- ${userInfo.uid}`);
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        }).then(() => {
          set(databaseref(db, "users/" + userInfo.uid), {
            userid: userInfo.uid,
            username: userInfo.displayName,
            email: userInfo.email,
            profile_picture: downloadURL,
          });
          console.log(downloadURL);
          // localStorage.setItem(
          //   "user",
          //   JSON.stringify({ ...userInfo, photoURL: downloadURL })
          // );
          // dispatch(activeUser({ ...userInfo, photoURL: downloadURL }));
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userInfo, photoURL: downloadURL })
        );
        dispatch(activeUser({ ...userInfo, photoURL: downloadURL }));
      });
    });
    setOpen(false);
  };
  // style for modal ==========
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // style end modal ==========
  // function for image upload
  const handleImageUpload = (e) => {
    e.preventDefault();
    let files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // logout ===================
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
    <div className="min-h-screen bg-white dark:bg-dark w-80 ">
      <div className="flex items-center px-5 pt-12 font-bold text-center gap-x-4">
        {/* <Image onClick={handleOpen}  imgSrc={userInfo.photoURL} /> */}
        <img
          onClick={handleOpen}
          className="w-12 h-12 rounded-full cursor-pointer "
          src={userInfo.photoURL}
          alt=""
        />

        <Link to={"/dashboard/mypost"}>
          <h1>{userInfo.displayName}</h1>
        </Link>
      </div>

      <div className="flex flex-col justify-center mt-20 text-xl gap-y-8">
        <Link
          className={location.pathname == "/dashboard/home"}
          to={"/dashboard/home"}
        >
          <div className="flex items-center px-5 pt-2 font-bold text-center gap-x-4">
            <FaHome />
            <p>Home</p>
          </div>
        </Link>
        <Link
          className={location.pathname == "/dashboard/messages"}
          to={"/dashboard/message"}
          
        >
          <div className="flex items-center px-5 pt-2 font-bold text-center gap-x-4">
          <AiFillMessage/>
            <p>Messages</p>
          </div>
        </Link>
        <Link
          className={location.pathname == "/dashboard/allusers"}
          to={"/dashboard/allusers"}
        >
          <div className="flex items-center px-5 pt-2 font-bold text-center gap-x-4">
          <FaUsers/>
            <p>User List</p>
          </div>
        </Link>

        <Link
          className={location.pathname == "/dashboard/friendrequest"}
          to={"/dashboard/friendrequest"}
        >
          <div className="flex items-center px-5 pt-2 font-bold text-center gap-x-4">
          <GiThreeFriends/>

            <p>
              Friend 
              Request</p>
          </div>
        </Link>

        <div
          onClick={() => dispatch(toggleTheme())}
          className="flex items-center px-5 pt-2 font-bold text-center cursor-pointer gap-x-4"
        >
          {theme === "light" ? (
            <>
              <FaMoon />
              <p>Dark</p>{" "}
            </>
          ) : (
            <>
              <FaSun /> <p> Light</p>{" "}
            </>
          )}
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center px-5 pt-2 font-bold text-center cursor-pointer gap-x-4"
        >
          <TbLogout2 />
          <p>Sing Out</p>
        </button>
      </div>
      {/* modal for image crop  */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">
            {image && (
              <div className="box" style={{ width: "50%", float: "right" }}>
                <h1>Preview</h1>
                <div
                  className="img-preview"
                  style={{ width: "100%", float: "left", height: "300px" }}
                />
              </div>
            )}
          </Typography>
          <Typography id="modal-modal-description">
            <input onChange={handleImageUpload} type="file" />
            <h1>Image Upload</h1>
            {image && (
              <>
                <Cropper
                  ref={cropperRef}
                  style={{ height: 300, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />

                <div>
                  {loading ? (
                    <Bars
                      height="40"
                      width="80"
                      color="#1a56db"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    <button
                      className="px-5 py-1 mt-2 font-bold bg-gray-600 rounded-md text-yellow-50"
                      onClick={getCropData}
                    >
                      Upload{" "}
                    </button>
                  )}
                </div>
              </>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
