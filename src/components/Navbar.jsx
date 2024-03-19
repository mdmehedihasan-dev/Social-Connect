import Image from "./Image"
import ProPic from '../../public/profile.png'
import { FaHome } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications ,IoMdSettings} from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
// import { CiLogout } from "react-icons/ci";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";







const Navbar = () => {

    const auth = getAuth();
    const navigate = useNavigate()

    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            navigate('/')
          }).catch((error) => {
            console.log(error)
          });
    }

  return (
    <div className="w-40 min-h-screen bg-primary rounded-r-xl">
       <div className="pt-9" >
       <Image className="mx-auto" imgSrc={ProPic} />
       </div>

       <div className="mt-20 space-y-10 text-4xl text-white">
        <FaHome className="w-1/2 py-1 pl-2 pr-10 rounded-l-md ml-14 hover:bg-white hover:text-primary"/>
        <AiFillMessage className="w-1/2 py-1 pl-2 pr-10 rounded-l-md ml-14 hover:bg-white hover:text-primary"/>
        <IoMdNotifications className="w-1/2 py-1 pl-2 pr-10 rounded-l-md ml-14 hover:bg-white hover:text-primary"/>
        <IoMdSettings className="w-1/2 py-1 pl-2 pr-10 rounded-l-md ml-14 hover:bg-white hover:text-primary"/>
        <TbLogout2 onClick={handleSignOut} className="w-1/2 py-1 pl-2 pr-10 rounded-l-md ml-14 hover:bg-white hover:text-primary" />
       </div>
       
    </div>
  )
}

export default Navbar