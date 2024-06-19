/* eslint-disable no-undef */
import { useSelector } from "react-redux";
import MsgFriend from "./MsgFriend";
import MsgGroup from "./MsgGroup";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment";

const Message = () => {
  const db = getDatabase();
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  let active = useSelector((state) => state.activeChat.value);
  let userInfo = useSelector((state) => state.user.value);

  let handleChat = () => {
    set(push(ref(db, "message")), {
      whosendid: userInfo.uid,
      whosendname: userInfo.displayName,
      whoreceiveid: active.activeuserid,
      whoreceivename: active.name,
      msg: msg,
      date:`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${ new Date().getDay()}`
    }).then(() => {
      console.log("Send");
    });
  };

  useEffect(() => {
    const msgRef = ref(db, "message");
    onValue(msgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosendid == userInfo.uid && item.val().whoreceiveid == active.activeuserid) ||
          (item.val().whoreceiveid == userInfo.uid && item.val().whosendid == active.activeuserid)
        ) {
          arr.push(item.val());
        }
      });
      setMsgList(arr);
    });
  }, [active.activeuserid]);

  return (
    <div className="flex justify-between">
      <div className="w-2/5 ">
        <MsgFriend />
        <MsgGroup />
      </div>

      <div className="relative w-3/5 pt-5">
        <div className=" rounded-md h-[660px] box-container w-small lg:w-[850px]">
          <div>
            {/* ==============name=================== */}
            <div className="px-2 py-3 font-bold text-white bg-blue-500">
              <h1 className="">{active?.name}</h1>
              <p>Active</p>
            </div>

            {msgList.map((item,i) =>
              item.whosendid == userInfo.uid &&
              item.whoreceiveid == active.activeuserid ? (
                <div key={i} className="text-right">
                  <div className="inline-block px-2 py-1 my-5 bg-blue-200 border-2 rounded-xl">
                    <p className="text-lg text-blue-800 ">{item.msg}</p>
                    <p>{moment(item.date,"20111031", "YYYYMMDD").fromNow()}</p>
                  </div>
                </div>
              ) : (
                item.whoreceiveid == userInfo.uid &&
                item.whosendid == active.activeuserid && (
                  <div key={i} className="text-left">
                    <div className="inline-block px-2 py-1 bg-green-300 border-2 rounded-xl">
                      <p className="text-lg text-gray-800 ">{item.msg}</p>
                      <p>{moment(item.date,"20111031", "YYYYMMDD").fromNow()}</p>

                    </div>
                  </div>
                )
              )
            )}

            {/* receive message=================== */}

            {/* send message =============================== */}

            {/* write message ====================== */}

            <div className="absolute rounded-bl-md rounded-br-md  bottom-0  w-[848px] border-t p-3 bg-green-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center w-4/5 gap-x-2">
                  <div className="w-4/5">
                    <input
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full p-3 rounded-xl"
                      type="text"
                    />
                    <button
                      className="px-3 py-1 text-white bg-red-900 rounded-md"
                      onClick={handleChat}
                    >
                      send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
