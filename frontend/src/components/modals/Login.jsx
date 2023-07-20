import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../apis/login";
import { getUserData } from "../../apis/getUserData";
import NotificationBar from "./NotificationBar";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("user1");
  const navigate = useNavigate();

  const modalIsOpen = useSelector((state) => state.modalReducer);

  const dispatch = useDispatch();
  function closeModal() {
    dispatch({ type: "CLOSE_MODAL" });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // login
      const token = await login(email, password);
      console.log(token);
      localStorage.setItem("token", JSON.stringify(token));

      // get user data
      const user = await getUserData();
      dispatch({ type: "GET_USER", user: user });

      //redirect
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const style = "w-full h-[40px] rounded-[3px] mt-2.5";

  return (
    <CustomModal modalIsOpen={modalIsOpen} closeModel={closeModal}>
      <button onClick={closeModal} className="ml-auto mr-0 block">
        x
      </button>
      <form onSubmit={handleLogin}>
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
        <div className={`${style} flex flex-row justify-center`}>
          <span>or</span>
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          className={`${style} p-3 border-black border-[1px] focus:outline-none`}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={`${style} p-3 border-[1px] border-[#e5e5e5] focus:outline-none`}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className={`${style} text-white bg-[#f50]`}
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

export default Login;
