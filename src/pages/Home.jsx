import BlockUser from "../components/BlockUser";
// import Friends from "../components/Friends";
// import GroupList from "../components/GroupList";
// import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";
import Post from "../components/Post";
import Message from "./Message";
// import AllMessage from "./AllMessage";
import CreatePost from "../components/CreatePost";
// import MsgFriend from "./MsgFriend"; 

const Home = () => {
  return (
    <div className="flex flex-col h-screen sm:flex-row">
      
       <div>
        <Post/>
      </div>
      <div className="">
        <CreatePost/>
        <Message/>
        {/* <UserList /> */}
       
        {/* <MsgFriend/>  */}
        {/* <Friends/> */}
        {/* <GroupList/> */}
        {/* <MyGroup /> */}
        {/* <AllMessage/> */}
        {/* <Friends/> */}
        
      </div>
     
    </div>
  );
};

export default Home;
