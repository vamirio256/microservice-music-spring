import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../apis/auth/login";
import { getUserData } from "../../apis/user/getUserData";
import NotificationBar from "./NotificationBar";
import { RxCross1 } from "react-icons/rx";

const LoginModal = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("user1");
  const navigate = useNavigate();

  const modalIsOpen = useSelector((state) => state.modalReducer.login.isShowed);

  const dispatch = useDispatch();

  function closeModal() {
    dispatch({ type: "CLOSE_MODAL_LOGIN" });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // login
      const response = await login(email, password);
      const token = response.jwtToken;
      localStorage.setItem("token", token);

      // get user data
      const user = response.user;
      dispatch({ type: "SET_USER", user: user });

      //redirect
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const style =
    "w-full h-[40px] rounded-[9px] mt-2.5 border border-solid shadow-sm";

  return (
    <CustomModal modalIsOpen={modalIsOpen} closeModel={closeModal}>
      <button onClick={closeModal} className="ml-auto mr-0 block">
        <RxCross1 />
      </button>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-normal">Sign in</h1>
        <div className="flex flex-row items-center w-full">
          <div className="h-[1px] bg-[#e5e5e5] w-full" />
          <p className="mx-2">with</p>
          <div className="h-[1px] bg-[#e5e5e5] w-full" />
        </div>
      </div>
      <form onSubmit={handleLogin} className="w-[600px]">
        <button
          type="button"
          className={`${style} text-white bg-[#3578e5]`}
          onClick={() => {
            dispatch({ type: "SHOW_NOTIFICATION" });
          }}
        >
          Continue with Facebook
        </button>
        <button
          type="button"
          className={`${style} text-black border-[1px] border-[#e5e5e5]`}
          onClick={() => {
            dispatch({ type: "SHOW_NOTIFICATION" });
          }}
        >
          Continue with Google
        </button>
        <div
          className={`${style} flex flex-row items-center border-none shadow-none`}
        >
          <div className="h-[1px] bg-[#e5e5e5] w-full" />
          <p className="mx-2">or</p>
          <div className="h-[1px] bg-[#e5e5e5] w-full" />
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          className={`${style} p-3 focus:outline-none `}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={`${style} p-3 border-[#e5e5e5] focus:outline-none`}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className={`${style} text-white bg-[#f50] border-none`}
          type="submit"
          onClick={handleLogin}
        >
          Submit
        </button>
        <p>
          <i>The account above for demo purpose.</i>
        </p>
        <NotificationBar />
      </form>
    </CustomModal>
  );
};

{
  /* login modal */
}

export default LoginModal;
