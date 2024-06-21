/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slice/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  let data = useSelector((state) => state?.user?.value);

  useEffect(() => {
    if (data?.email) {
      navigate("/dashboard/home");
    }
  });

  let [regData, setRegData] = useState({
    email: "",
    password: "",
  });

  const [regErrorData, setRegErrorData] = useState({
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

    if (!regData.email) {
      setRegErrorData({ ...regErrorData, name: "Email is required😎" });
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
      signInWithEmailAndPassword(auth, regData.email, regData.password)
        .then((userCredential) => {
          setLoading(false);
          if (!userCredential.user.emailVerified) {
            toast.warning("Please varify your email first", {
              position: "top-center",
              theme: "dark",
            });
          } else {
            toast.success("Login successful🙋‍♂️💌", {
              position: "top-center",
              theme: "dark",
            });
            localStorage.setItem("user", JSON.stringify(userCredential.user));
            dispatch(activeUser(userCredential.user));
            navigate("/dashboard/home");
          }

          // console.log("User Created:", userCredential);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage.includes("auth/invalid-credential")) {
            toast.warning(
              "Invalid Credential 👎! Try again with correct Email & Password!",
              { position: "top-center", theme: "dark" }
            );
          }
        });
    }
   
  };

  return (
    <div className="px-5 mx-auto max-w-screen-2xl">
      <div className="items-center block min-h-screen lg:flex gap-x-20 ">
        <div className="w-full p-2 mx-auto lg:px-28 ">
          <h2 className="font-mono text-4xl font-bold text-blue-700">
          Social Connect
          </h2>
          <p className="mt-5 font-sans text-xl ">
            Hey! Social Connect helps you connect with people and share your messages & post🙋‍♂️
          </p>
          <br />
          <p className="font-serif text-xl text-red-600 ">
          Social Contact is Still under development in some feature but you can use it to send messages to your friends and create a Post.
          </p>
        </div>

        {/* Login input fields here  */}
        <div className="w-full mx-auto">
          <div className="p-10 border-2 border-solid shadow-2xl shadow-red-800">
            <p className="mb-2 font-mono text-lg font-bold text-center ">
              Get started with Login!👍 <br />
            </p>

            <div className="flex flex-col md:items-center gap-y-5">
              <div>
                <label>Email :</label> <br />
                <input
                  className="w-full px-2 py-1 mt-2 rounded-md md:w-96 outline-blue-700 outline"
                  placeholder="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="relative">
                  <label>Password :</label> <br />
                  <input
                    className="w-full px-2 py-1 mt-2 rounded-md md:w-96 outline-blue-700 outline"
                    placeholder="Password"
                    type={!showPass ? "password" : "text"}
                    id="password"
                    onChange={handleChange}
                  />
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
              </div>
              <div>
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
                  <Button onClick={handleSubmit} btnName={"Login"} />
                )}
              </div>

              <Link to={"/forgetpassword"}>
                <Button
                  btnName={"Forget Password"}
                  className="mt-0 bg-red-500"
                />
              </Link>
              <Link
                className="text-base text-center border-t-2"
                to={"/sign-up"}
              >
                <span className="font-semibold text-blue-600 underline">
                  Create New Account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
