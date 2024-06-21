import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const MyPost = () => {

  let [showPost, setShowPost] = useState([]);
  let userInfo = useSelector((state) => state.user.value);



  const db = getDatabase();

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



  return (
    <div className="w-full">
      <div className="overflow-scroll h-svh">
        {showPost.map((item, i) => (
          <div key={i} className="p-5 font-sans font-semibold">
            <h1 className="text-lg">{item.postby}</h1>
            <p className="text-base">{item.date}</p>
            <p>{item.data}</p>
            
              
              <MdAutoDelete
                onClick={() => handleDelete(item)}
                className="text-red-500 cursor-pointer"
              />
           
          </div>
        ))}
      </div>

   


    </div>
  );
};

export default MyPost;
