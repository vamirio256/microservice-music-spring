import React, { useEffect } from "react";
import never_stop_listening from "../../assets/images/never_stop_listening.jpg";
import { useDispatch } from "react-redux";
import LoginModal from "../../components/modals/LoginModal";
import RegisterModal from "../../components/modals/RegisterModal";
import { validateToken } from "../../apis/auth/validateToken";
import { useNavigate } from "react-router-dom";

const UnauthenticatedHomePage = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openLoginModal = () => {
    dispatch({ type: "OPEN_MODAL_LOGIN" });
  };

  const openRegisterModal = () => {
    dispatch({ type: "OPEN_MODAL_REGISTER" });
  };

  useEffect(() => {
    // Get the token from the URL query parameter
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    // Store the token in localStorage
    if (token) {
      localStorage.setItem("token", token);
    }
    const checkToken = async () => {
      try {
        const data = await validateToken();
        if (data) {
          console.log("Token is valid");
          dispatch({ type: "SET_USER", user: data });
          setIsAuthenticated(true);
          navigate("/");
        } else {
          console.log("Token is invalid");
        }
      } catch (error) {
        // console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);

  return (
    <div className="flex justify-center flex-1 bg-[#F2F2F2] m-0 p-0">
      <LoginModal setIsAuthenticated={setIsAuthenticated} />
      <RegisterModal />
      <div className="w-[1240px] bg-white">
        <div className="border-t-2 border-t-[#f50] bg-lading_web h-[450px] text-white bg-no-repeat bg-cover relative">
          {/* login and register button */}
          <div className="absolute top-5 right-8 text-sm">
            <button
              className="border-white border-[1px] bg-transparent text-white py-1 px-3 rounded-sm mr-3 "
              onClick={openLoginModal}
            >
              Sign in
            </button>
            <button
              className="bg-[#f50] py-1 px-3 rounded-sm mr-3"
              onClick={openRegisterModal}
            >
              Create account
            </button>
          </div>

          {/* middle text */}
          <div className="flex justify-center items-center h-full text-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl">Connect on SoundCloud</h1>
              <p className="w-1/2">
                Discover, stream, and share a constantly expanding mix of music
                from emerging and major artists around the world.
              </p>
              <button
                className="bg-[#f50] px-2 py-2 rounded-sm"
                onClick={openRegisterModal}
              >
                Sign up for free
              </button>
            </div>
          </div>
        </div>
        <img src={never_stop_listening} alt="never_stop_listening" />
      </div>
    </div>
  );
};

export default UnauthenticatedHomePage;
