import React, { useState } from "react";

const Login = ({ toggleModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const style = "w-full h-[40px] rounded-[3px] mt-2.5";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
      const response = await fetch(url, {
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
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen fixed">
        <div className="bg-[hsla(0,0%,94.9%,.9)]">
          <div className="absolute top-[40%] left-[50%] transition max-h-[400px] max-w-[500px] ">
            <form>
              <button className={`${style} text-white bg-[#3578e5]`}>
                Continue with Facebook
              </button>
              <button className={`${style} text-black border-[1px] border-[#e5e5e5]`}>
                Continue with Google
              </button>
              <div className={`${style} `}>
                
                <span>or</span>::after
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
              <button className={`${style} text-white bg-[#f50]`} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
