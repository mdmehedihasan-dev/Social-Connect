/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useSelector } from "react-redux";
// import MsgFriend from "./MsgFriend";
import MsgGroup from "./MsgGroup";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment";
import { BsSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Friends from "../components/Friends";

const Message = () => {
  const db = getDatabase();
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const [emojishow, setEmojiShow] = useState(false);
  const [msgList, setMsgList] = useState([]);

  let active = useSelector((state) => state.activeChat.value);
  let userInfo = useSelector((state) => state.user.value);

  let handleMsgShow = ()=>{
    setShowMsg(true)
  }

  let handleChat = () => {
    if (active == null) {
      return;
    }
    set(push(ref(db, "message")), {
      whosendid: userInfo.uid,
      whosendname: userInfo.displayName,
      whoreceiveid: active.activeuserid,
      whoreceivename: active.name,
      msg: msg,
      date: `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    }).then(() => {
      console.log("Send");
      setMsg("");
    });
  };

  let handleEmoji = (e) => {
    setMsg(msg + e.emoji);
  };

  useEffect(() => {
    if (active == null) {
      return;
    }
    const msgRef = ref(db, "message");
    onValue(msgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosendid == userInfo.uid &&
            item.val().whoreceiveid == active.activeuserid) ||
          (item.val().whoreceiveid == userInfo.uid &&
            item.val().whosendid == active.activeuserid)
        ) {
          arr.push(item.val());
        }
      });
      setMsgList(arr);
    });
  }, [active?.activeuserid]);

  return (
    <div >
      <div>
        <div className="cursor-pointer" onClick={handleMsgShow}>
          <Friends/>
        {/* <AllMessage /> */}
        </div>
        <MsgGroup />
      </div>

      {
        showMsg &&
     <div className="absolute bottom-0 bg-white right-10">
       <div className="relative pt-5">
        <div className="rounded-md h-[550px] msgbox-container w-[460px]  ">
          <div>
            {/* ==============name=================== */}
            <div className="absolute top-0 flex items-center justify-between w-full px-2 py-3 font-bold text-white bg-black">
              <div>
              <h1 className="">
                {active == null ? "Please select a user" : active?.name}
              </h1>
              <p>Active</p>
              </div>
              <IoMdCloseCircleOutline className="text-xl cursor-pointer" onClick={()=>setShowMsg(false)}/>

            </div>

            {active != null &&
              msgList.map((item, i) =>
                item.whosendid == userInfo.uid &&
                item.whoreceiveid == active.activeuserid ? (
                  <div key={i} className="text-right">
                    <div className="inline-block px-2 py-1 mb-20 bg-green-500 border-2 rounded-xl">
                      <p className="text-lg text-blue-800 ">{item.msg}</p>
                      <p className="dark:text-black">
                        {" "}
                        {moment(item.date, "YYYYMMDD h:mm:ss").fromNow()}
                      </p>
                    </div>
                  </div>
                ) : (
                  active != null &&
                  item.whoreceiveid == userInfo.uid &&
                  item.whosendid == active.activeuserid && (
                    <div key={i} className="text-left">
                      <div className="inline-block px-2 py-1 bg-blue-500 border-2 rounded-xl">
                        <p className="text-lg text-gray-800 ">{item.msg}</p>
                        <p className="dark:text-black">
                          {moment(item.date, "YYYYMMDD h:mm:ss").fromNow()}
                        </p>
                      </div>
                    </div>
                  )
                )
              )}

            {/* write message ====================== */}

            <div className="absolute bottom-0 w-full p-3 bg-green-500 border-t rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center w-full gap-x-2">
                  <div className="relative w-full">
                    <input
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full p-3 rounded-xl dark:bg-black"
                      type="text"
                    />

                    {emojishow && (
                      <div className="absolute -top-[500px] right-5">
                        <EmojiPicker onEmojiClick={handleEmoji} />
                      </div>
                    )}
                    {/* emoji button ============== */}
                    <button
                      onClick={() => setEmojiShow(!emojishow)}
                      className="absolute p-2 mr-2 text-blue-800 right-5 top-1 rounded-xl"
                    >
                      😎
                    </button>
                    {/* send button ============== */}
                    <button
                      className="absolute right-0 p-3 text-blue-800 top-1 rounded-xl"
                      onClick={handleChat}
                    >
                      <BsSendFill />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>

      }

     
    </div>
  );
};

export default Message;
