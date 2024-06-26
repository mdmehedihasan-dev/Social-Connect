// import BlockUser from "../components/BlockUser";
import FriendRequest from "../components/FriendRequest";
// import Friends from "../components/Friends";
import GroupList from "../components/GroupList";
// import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";
import Post from "../components/Post";
// import CreatePost from "../components/CreatePost";
// import MsgFriend from "./MsgFriend"; 

const Home = () => {
  return (
    <div className="flex h-screen">
       <div>
        <Post/>
      </div>
      <div className="">
        {/*<CreatePost/>*/}
        {/* <MsgFriend/>  */}
        <UserList />
        {/* <Friends /> */}
        <GroupList/>
        {/* <MyGroup /> */}
        <FriendRequest/>
        {/* <BlockUser /> */}
      </div>
     
    </div>
  );
};

export default Home;
