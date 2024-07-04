import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./pages/ForgetPassword";
import Message from "./pages/Message";
import Setting from "./pages/Setting";
import DashBoard from "./pages/DashBoard";
import MyPost from "./components/MyPost";
import UserList from "./components/UserList";
import FriendRequest from "./components/FriendRequest";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<DashBoard />}>
        <Route path="home" element={<Home/>} />
          <Route path="message" element={<Message/>} />
          <Route path="allusers" element={<UserList/>} />
          <Route path="friendrequest" element={<FriendRequest/>} />
          <Route path="mypost" element={<MyPost/>} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
