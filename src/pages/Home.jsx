import BlockUser from "../components/BlockUser"
import FriendRequest from "../components/FriendRequest"
import Friends from "../components/Friends"
import GroupList from "../components/GroupList"
import MyGroup from "../components/MyGroup"
import UserList from "../components/UserList"


const Home = () => {
  return (
    <div className="flex flex-wrap justify-center ">
      <div className="px-2 py-10 space-y-5 lg:py-5 ">
     <GroupList/>
     <FriendRequest/>
    </div>
    <div className="px-2 py-10 space-y-5 lg:py-5 ">
      <Friends/>
    <MyGroup/>
    </div>
    <div className="px-2 py-10 space-y-5 lg:py-5 ">
     <UserList/>
     <BlockUser/>
    </div>
    </div>
  )
}

export default Home