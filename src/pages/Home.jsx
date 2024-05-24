import BlockUser from "../components/BlockUser";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import GroupList from "../components/GroupList";
import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5 px-3">
      <GroupList />
      <FriendRequest />

      <Friends />
      <MyGroup />

      <UserList />
      <BlockUser />
    </div>
  );
};

export default Home;
