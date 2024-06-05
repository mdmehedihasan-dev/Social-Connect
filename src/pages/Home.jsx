import BlockUser from "../components/BlockUser";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import GroupList from "../components/GroupList";
import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";
import MyPost from "../components/MyPost";

const Home = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5 px-3">
        <GroupList />
        <FriendRequest />
        <Friends />
        <MyGroup />
        <UserList />
        <BlockUser />
      </div>
      <div className="py-5 pr-0 lg:pr-5">
        <MyPost/>
      </div>
    </div>
  );
};

export default Home;
