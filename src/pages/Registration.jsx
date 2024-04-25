/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { Alert } from "flowbite-react";
import { FaGoogle, FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  let [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [regErrorData, setRegErrorData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegData({ ...regData, [e.target.id]: e.target.value });

    setRegErrorData({ ...regErrorData, [e.target.id]: "" });
  };

  const handleSubmit = () => {
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regData.name) {
      setRegErrorData({ ...regErrorData, name: "Name is required😎" });
    } else if (!regData.email) {
      setRegErrorData({ ...regErrorData, email: "Email is required📧" });
    } else if (!pattern.test(regData.email)) {
      setRegErrorData({ ...regErrorData, email: "Please enter valid Email📧" });
    } else if (!regData.password) {
      setRegErrorData({ ...regErrorData, password: "Passwprd is required🥴" });
    } else if (regData.password.length < 6) {
      setRegErrorData({
        ...regErrorData,
        password: "password must be 6 characters🥴",
      });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, regData.email, regData.password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName:regData.name, photoURL: "https://firebasestorage.googleapis.com/v0/b/firechat-8d0d3.appspot.com/o/avatar%2Fimages.jpeg?alt=media&token=166d0476-e902-4ad0-91b7-d89adb051ac7&fbclid=IwZXh0bgNhZW0CMTAAAR2GrFsfmDiD2J6BMLDN27C_h1vLRkmJukexqNoCGaejzGJoLci9ynSCqEY_aem_ASMK10Mw7eyescvITtTQaBmsWmvqhtyIwK6IvFlkZHNfP48Jd3UTgiIrUqu47vdFND7lvEJ_WGmXEPmXghx0m8Eo"
          }).then(()=>{
            set(ref(db, 'users/' + userCredential.user.uid), {
              username: regData.name,
              email: regData.email,
              profile_picture : userCredential.user.photoURL
            });
          }).
          then(() => {
            setLoading(false);
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            toast.success(
              "Registration successful😊 Please check your email to verify💌",
              {
                position: "top-center",
                theme: "dark",
              }
            );
          });
          navigate("/");
          }).catch((error) => {
            setLoading(false)
            console.log(error)
          });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage.includes("email-already-in-use")) {
            setRegErrorData({
              ...regErrorData,
              email: "Email already registerd🥴",
            });
          }
        });
    }
    // setRegData({
    //   name:"",email:"",password:""
    // })
  };

  // ======================== Login with Google ===============

  const handleGSubmit = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(
          "Login SuccessFull💌",
          {
            position: "top-center",
            theme: "dark",
          }
        );
        navigate("/dashboard/home");
      })
      .catch((error) => {});
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="p-10 mt-20 shadow-xl shadow-blue-700">
        <div className="mb-5 font-mono text-base font-bold text-center text-gray ">
          <p className="text-2xl">
            Hey🙋‍♂️ Welcome to FireChat😎 <br />
          </p>
          <span>You can Free register here and enjoy it💌 </span>
        </div>

        {/*============= data input area =========== */}
        <div className="space-y-5 w-full md:w-[400px] mx-auto">
          <div className="">
            <label>Name :</label> <br />
            <input
              className="w-full px-2 py-1 rounded-md md:w-96 outline-blue-700 outline"
              placeholder="Fullname"
              type="text"
              id="name"
              onChange={handleChange}
            />
            {regErrorData.name && (
              <Alert className="w-full mt-2 md:w-96" color="failure">
                {regErrorData.name}
              </Alert>
            )}
          </div>
          <div className="">
            <label>Email :</label> <br />
            <input
              className="w-full px-2 py-1 rounded-md md:w-96 outline-blue-700 outline"
              placeholder="name@gmail.com"
              type="email"
              onChange={handleChange}
              id="email"
            />
            {regErrorData.email && (
              <Alert className="w-full mt-2 md:w-96" color="failure">
                {regErrorData.email}
              </Alert>
            )}
          </div>
          <div className="relative">
            <label>Password :</label> <br />
            <input
              className="w-full px-2 py-1 rounded-md md:w-96 outline-blue-700 outline"
              placeholder="********"
              type={!showPass ? "password" : "text"}
              id="password"
              onChange={handleChange}
            />
            {regErrorData.password && (
              <Alert className="w-full mt-2 md:w-96" color="failure">
                {regErrorData.password}
              </Alert>
            )}
            <div>
              {showPass ? (
                <FaRegEye
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-[65%] right-5"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-[65%] right-5 "
                />
              )}
            </div>
          </div>
          <div className="">
            {loading ? (
              <Bars
                height="40"
                width="80"
                color="#1a56db"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <Button onClick={handleSubmit} btnName={"Sign-Up"} />
            )}
          </div>
          <Button
            onClick={handleGSubmit}
            btnName={((<FaGoogle />), "Login With Google")}
            className={
              "bg-green-400 text-blue-900 border-2 border-solid border-yellow-200"
            }
          />
        </div>

        {/*============= data input area =========== */}
        <div className="mt-5 font-semibold text-center ">
          <Link to={"/"}>
            Already have an account ?
            <span className="font-semibold text-blue-600 underline">
              Please login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
