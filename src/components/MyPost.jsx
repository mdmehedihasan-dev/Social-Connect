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

const MyPost = () => {
  const [post, setPost] = useState("");
  // const [id, setId] = useState("");
  // const [isUpdate, setIsUpdate] = useState(false);

  let [showPost, setShowPost] = useState([]);
  let userInfo = useSelector((state) => state.user.value);

  const db = getDatabase();

  let handlePost = () => {
    set(push(ref(db, "post")), {
      postCreateId: userInfo.uid,
      postby: userInfo.displayName,
      data: post,
      date: `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`,
    }).then(() => {
      setPost("");
    });
  };

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
    <div className="w-full ">
      <textarea
        value={post}
        className="w-full rounded-md resize-x dark:bg-black"
        type="text"
        onChange={(e) => setPost(e.target.value)}
      />

      {/* {!isUpdate && (
         )} */}
        <button
          onClick={handlePost}
          className="w-full px-2 py-1 mt-2 font-bold text-white bg-green-600 rounded-md "
        >
          Post
        </button>
     

      {
        // isUpdate && (
        //   <button
        //   onClick={handleUpdate}
        //   className="w-full px-2 py-1 mt-2 font-bold text-white bg-yellow-600 rounded-md "
        // >
        //   update
        // </button>
        // )
      }

      <div className="overflow-y-scroll h-[550px]">
        {showPost.map((item, i) => (
          <div key={i} className="p-5 font-sans font-semibold">
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
  );
};

export default MyPost;
