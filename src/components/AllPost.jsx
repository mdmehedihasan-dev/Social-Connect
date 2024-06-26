import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AllPost = () => {
  let [showPost, setShowPost] = useState([]);
  let userInfo = useSelector((state) => state.user.value);

  const db = getDatabase();

  useEffect(() => {
    const postRef = ref(db, "post");
    onValue(postRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid != item.val().postCreateId) {
          arr.push(item.val());
        }
      });
      setShowPost(arr);
    });
  }, []);
  return (
    <div className="w-full">
      <div className="h-screen overflow-y-scroll">
        {showPost.map((item, i) => (
          <div key={i} className="p-5 font-serif ">
            <h1 className="text-xl font-bold">{item.postby}</h1>
            <p>{item.date}</p>
            <p className="text-lg">{item.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
