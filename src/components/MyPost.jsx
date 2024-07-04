/* eslint-disable no-undef */
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import MyGroup from "./MyGroup";
// import Friends from "./Friends";
import BlockUser from "./BlockUser";
import FriendRequest from "./FriendRequest";
import CreatePost from "./CreatePost";

const MyPost = () => {
  // const [post, setPost] = useState("");
  // const [id, setId] = useState("");
  // const [isUpdate, setIsUpdate] = useState(false);

  let [showPost, setShowPost] = useState([]);
  let userInfo = useSelector((state) => state.user.value);

  const db = getDatabase();

  // let handlePost = () => {
  //   set(push(ref(db, "post")), {
  //     postCreateId: userInfo.uid,
  //     postby: userInfo.displayName,
  //     data: post,
  //     date: `${new Date().getFullYear()}/${
  //       new Date().getMonth() + 1
  //     }/${new Date().getDate()}`,
  //   }).then(() => {
  //     setPost("");
  //   });
  // };

  useEffect(() => {
    const postRef = ref(db, "post");
    onValue(postRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid == item.val().postCreateId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setShowPost(arr);
    });
  }, []);

  let handleDelete = (item) => {
    remove(ref(db, "post/" + item.id));
    // console.log(item);
  };

  // let handleEdit = (item) => {
  //   setId(item.id);
  //   setPost(item.data);
  //   setIsUpdate(true);
  // };

  // let handleUpdate = ()=>{
  //   set(ref(db, "post/" + id ), {
  //     data:post
  //   }).then(() => {
  //     setPost("");
  //   });

  // }

  return (
    <div className="h-screen pt-2 pb-5 ">
      <CreatePost/>
     {/* <div className="flex items-center w-full mx-auto sm:w-1/3">
        <input
          value={post}
          className="w-full rounded-md resize-x dark:bg-dark dark:bg-bbdark"
          type="text"
          onChange={(e) => setPost(e.target.value)}
        />
        {!isUpdate && (
         )}
        <button
          onClick={handlePost}
          className="px-4 py-2 font-bold text-white bg-green-600 rounded-md "
        >
          Post
        </button>
     
     
     </div> */}
      <div className="flex flex-col mt-4 sm:flex-row ">
        <div className="items-center ">
          {/* {
            isUpdate && (
              <button
              onClick={handleUpdate}
              className="w-full px-2 py-1 mt-2 font-bold text-white bg-yellow-600 rounded-md "
            >
              update
            </button>
            )
          } */}

          <div className="overflow-y-scroll space-y-2 h-[600px] ">
            {showPost.map((item, i) => (
              <div key={i} className="font-sans font-semibold">
                <h1 className="text-lg">{item.postby}</h1>
                <p className="text-base">{item.date}</p>
                <p>{item.data}</p>

                <div className="flex space-x-2">
                  {/* <FaEdit
                onClick={() => handleEdit(item)}
                className="text-blue-500 cursor-pointer"
              /> */}
                  <MdAutoDelete
                    onClick={() => handleDelete(item)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* <Friends /> */}
          <MyGroup />
          <BlockUser />
          {/* <FriendRequest/> */}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
