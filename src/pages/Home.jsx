import BlockUser from "../components/BlockUser"
import FriendRequest from "../components/FriendRequest"
import Friends from "../components/Friends"
import GroupList from "../components/GroupList"
import MyGroup from "../components/MyGroup"
import UserList from "../components/UserList"


const Home = () => {
  return (
    //  flex flex-wrap justify-center mt-20 sm:mt-0 
      //  px-2 py-10 space-y-5 lg:py-5   
    <div className="flex flex-wrap justify-center gap-5">
      
     <GroupList/>
     <FriendRequest/>
  
      <Friends/>
    <MyGroup/>
   
     <UserList/>
     <BlockUser/>
 
    </div>
  )
}

export default Home