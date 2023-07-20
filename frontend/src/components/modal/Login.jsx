import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/authenticate`;
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const token = await response.json();
      localStorage.setItem("token", JSON.stringify(token));
      console.log(token);

      // get user data
      const url = `${process.env.REACT_APP_API_BASE_URL}/user/1`;
      const userResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token"))["jwtToken"],
        },
      });
      const user = await userResponse.json();
      console.log(userResponse);
      console.log(user);

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
        <button className={`${style} text-white bg-[#3578e5]`}>
          Continue with Facebook
        </button>
        <button className={`${style} text-black border-[1px] border-[#e5e5e5]`}>
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
      </form>
    </CustomModal>
  );
};

{
  /* login modal */
}

export default Login;
