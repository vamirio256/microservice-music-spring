import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../apis/auth/login";
import { getUserData } from "../../apis/user/getUserData";
import NotificationBar from "../notification/NotificationBar";
import { RxCross1 } from "react-icons/rx";
import { googleLogin } from "../../apis/auth/googleLogin";
import { FcGoogle } from "react-icons/fc";

import loading_gif from "../../assets/icons/loading.gif";
const LoginModal = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("user1");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const modalIsOpen = useSelector((state) => state.modalReducer.login.isShowed);

  const dispatch = useDispatch();

  function closeModal() {
    dispatch({ type: "CLOSE_MODAL_LOGIN" });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!e.target.reportValidity()) {
      // If there are validation errors, display the built-in validation message
      return;
    }
    try {
      // login
      setLoading(true);
      const response = await login(email, password);
      setLoading(false);
      const token = response.jwtToken;
      localStorage.setItem("token", token);

      // get user data
      const user = response.user;
      dispatch({ type: "SET_USER", user: user });

      //redirect
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // login
      const response = await googleLogin();
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  const style =
    "w-full h-[40px] rounded-[5px] mt-2.5 border border-solid border-[#ccc]";

  return (
    <CustomModal modalIsOpen={modalIsOpen} closeModel={closeModal}>
      <button onClick={closeModal} className="ml-auto mr-0 block">
        <RxCross1 />
      </button>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-normal">Sign in</h1>
      </div>
      <form onSubmit={handleLogin} className="w-full max-w-[350px]">
        {/* <button
          type="button"
          className={`${style} text-white bg-[#3578e5]`}
          onClick={() => {
            dispatch({ type: "SHOW_NOTIFICATION" });
          }}
        >
          Continue with Facebook
        </button> */}
        {/* <button
          type="button"
          className={`${style} text-black border-[1px] border-[#e5e5e5]`}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button> */}
        <form
          action={`${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/google`}
          method="post"
        >
          <div
            className={`flex items-center justify-center ${style} cursor-pointer hover:border-black`}
          >
            <span>
              <FcGoogle />
            </span>
            <input
              type="submit"
              value="Continue with Google"
              className="ml-2"
            />
          </div>
        </form>
        <div
          className={`w-full h-10 mt-2.5 flex flex-row items-center border-none shadow-none`}
        >
          <div className="h-[1px] bg-black w-full" />
          <p className="mx-2 font-normal">or</p>
          <div className="h-[1px] bg-black w-full" />
        </div>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          className={`${style} p-3 focus:outline-none focus:border-black`}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={`${style} p-3 focus:outline-none focus:border-black`}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button
          className={`${style} text-white bg-[#f50] border-none`}
          type="submit"
        >
          {loading ? (
            <div>
              Please wait{" "}
              <img
                src={loading_gif}
                className="inline-block"
                alt=""
                width={20}
              />
            </div>
          ) : (
            "Login"
          )}
        </button>
        <p className="mt-2.5 text-[13px]">
          {error ? (
            <i className="text-red-700">Email or password is not correct.</i>
          ) : (
            <i>The account above for demo purpose.</i>
          )}
        </p>
        <p className="text-gray-400 text-[11px] mt-2.5">
          When registering, you agree that we may use your provided data for the
          registration and to send you notifications on our products and
          services. You can unsubscribe from notifications at any time in your
          settings. For additional info please refer to our
          <span className="text-blue-700 cursor-pointer">
            <a> Privacy Policy</a>
          </span>
          .
        </p>
      </form>
    </CustomModal>
  );
};

{
  /* login modal */
}

export default LoginModal;
