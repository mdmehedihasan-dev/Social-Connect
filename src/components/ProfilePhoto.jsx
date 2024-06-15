/* eslint-disable react/prop-types */

import { getDownloadURL, getStorage,ref } from "firebase/storage";
import { useEffect, useState } from "react";

const ProfilePhoto = ({imgId}) => {
    let [profilPhoto, setProfilePhoto]= useState("");
    const storage = getStorage();
    const photoRef = ref(storage,imgId);

    useEffect(()=>{
      getDownloadURL(photoRef)
      .then((url)=>{
        setProfilePhoto(url)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])
  return (
    <div>
         <img className='w-10 h-10 rounded-full' src={profilPhoto} alt="" />
    </div>
  )
}

export default ProfilePhoto