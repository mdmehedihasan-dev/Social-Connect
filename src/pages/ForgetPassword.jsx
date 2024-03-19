/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../components/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const auth = getAuth();

  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleSubmit = () => {
    // setValue("")
    sendPasswordResetEmail(auth, value)
      .then(() => {
        toast.success("Please check your email💌", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    //   setValue("")
  };
  return (
    <div className="flex justify-center min-h-screen ">
        <div className="flex flex-col items-center justify-center">
      <input placeholder="write your email here" className="w-full px-2 py-1 mt-2 rounded-md md:w-96 outline-blue-700 outline" type="email" onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleSubmit} btnName={"Submit"} />
    </div>
    </div>
  );
};

export default ForgetPassword;
