/* eslint-disable no-unused-vars */
import Image from "./Image";
import {  FaHome, FaMoon, FaSun } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import {  IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slice/userSlice";
import { useState, createRef } from "react";
import { Cropper } from "react-cropper";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "cropperjs/dist/cropper.css";
import { toggleTheme } from "../slice/themeSlice";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Navbar = () => {
  const {theme} = useSelector(state=>state.theme)

  // state for modal 

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  //  state for crop images 
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();


  let location = useLocation();
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state.user.value);
  // console.log(userInfo.value)
  const auth = getAuth();
  const navigate = useNavigate();

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

  // function for crop image 
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

// style for modal ==========
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // style end modal ==========

  return (
    <div className="min-h-screen bg-gray-600 w-36 rounded-r-xl">
      <div onClick={handleOpen} className="cursor-pointer pt-9">
        <Image className="mx-auto" imgSrc={userInfo.photoURL} />
      </div>

      <div className="px-5 pt-2 font-bold text-center text-white">
        <h1>{userInfo.displayName}</h1>
      </div>

      <div className="flex flex-col justify-center mt-20 text-4xl text-white gap-y-8">
        <Link
          className={location.pathname == "/dashboard/home" && "active"}
          to={"/dashboard/home"}
        >
          <FaHome className="mx-auto icon w-[60%] " />
        </Link>
        <Link
          className={location.pathname == "/dashboard/message" && "active"}
          to={"/dashboard/message"}
        >
          {" "}
          <AiFillMessage className="mx-auto icon w-[60%] " />
        </Link>
        {/* <Link className={location.pathname == "#" && "active"}  to={'#'}><IoMdNotifications className="mx-auto icon w-[60%] "/></Link>  */}
        <Link
          className={location.pathname == "/dashboard/setting" && "active"}
          to={"/dashboard/setting"}
        >
          <IoMdSettings className="mx-auto icon w-[60%] " />
        </Link>

         
        <button className="mx-auto" 
        onClick={()=>dispatch(toggleTheme())}
        >
          {
            theme === "light" ?  <FaMoon /> : <FaSun/>
          }
         
        </button>


      </div>

      <div className="mt-20 text-4xl font-bold text-white cursor-pointer">
        <TbLogout2 onClick={handleSignOut} className="mx-auto w-[60%]" />
      </div>

      {/* modal for image crop  */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" >
            Profile Upload
          </Typography>
          <Typography id="modal-modal-description" >
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
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


<div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
          </Typography>
        </Box>
      </Modal>
        
    </div>
  );
};

export default Navbar;
