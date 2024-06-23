import BlockUser from "../components/BlockUser";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import GroupList from "../components/GroupList";
import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";
import Post from "../components/Post";
// import CreatePost from "../components/CreatePost";
import MsgFriend from "./MsgFriend"; 

const Home = () => {
  return (
    <div>
      <div className="flex justify-between px-3 ">
        {/*<CreatePost/>*/}
        <MsgFriend/> 
        <UserList />
        <Friends />
        <GroupList/>
        <MyGroup />
        <FriendRequest/>
        <BlockUser />
      </div>
      <div className="py-5 pr-0 lg:pr-5">
        <Post/>
      </div>
    </div>
  );
};

export default Home;
