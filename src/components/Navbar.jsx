/* eslint-disable no-unused-vars */
import Image from "./Image"
import ProPic from '../../public/profile.png'
import { FaHome } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications ,IoMdSettings} from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
// import { CiLogout } from "react-icons/ci";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeUser } from "../slice/userSlice";


const Navbar = () => {

  let location = useLocation ()
 let dispatch = useDispatch()
    const auth = getAuth();
    const navigate = useNavigate()

    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            localStorage.removeItem("user")
            dispatch(activeUser(null))
            navigate('/')
          }).catch((error) => {
            console.log(error)
          });
    }

  return (
    <div className="min-h-screen bg-black w-36 rounded-r-xl">
       <div className="pt-9" >
       <Image className="mx-auto" imgSrc={ProPic} />
       </div>

       <div className="px-5 pt-2 font-bold text-center text-white" >
       <h1>Md Mehedi Hasan ABM Shawon Islam</h1>
       </div>

       <div className="flex flex-col justify-center mt-20 text-4xl text-white gap-y-8">
        <Link className={location.pathname == "/dashboard/home" && "active"} to={"/dashboard/home"}><FaHome className="mx-auto icon w-[60%] "/></Link>
       <Link className={location.pathname == "/dashboard/message" && "active"}  to={'/dashboard/message'}> <AiFillMessage className="mx-auto icon w-[60%] "/></Link>
        {/* <Link className={location.pathname == "#" && "active"}  to={'#'}><IoMdNotifications className="mx-auto icon w-[60%] "/></Link>  */}
        <Link className={location.pathname == "/dashboard/setting" && "active"}  to={'/dashboard/setting'}><IoMdSettings className="mx-auto icon w-[60%] "/></Link>
       </div>

       <div className="mt-20 text-4xl font-bold text-white cursor-pointer">
       <TbLogout2 onClick={handleSignOut} className="mx-auto w-[60%]" />
       </div>
       
    </div>
  )
}

export default Navbar