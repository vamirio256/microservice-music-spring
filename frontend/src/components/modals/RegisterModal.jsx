import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../apis/auth/login";
import { getUserData } from "../../apis/user/getUserData";
import NotificationBar from "./NotificationBar";
import { RxCross1 } from "react-icons/rx";
import { register } from "../../apis/auth/register";
import gifLoading from "../../assets/icons/loading.gif";
const RegisterModal = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);
  const [existedEmailAlert, setExistedEmailAlert] = useState(false);
  const [passwordMatchAlert, setPasswordMatchAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [registerAlert, setRegisterAlert] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);

  const [loaddingGif, setLoaddingGif] = useState(false);
  const navigate = useNavigate();

  const modalIsOpen = useSelector(
    (state) => state.modalReducer.register.isShowed
  );

  const dispatch = useDispatch();
  function closeModal() {
    dispatch({ type: "CLOSE_MODAL_REGISTER" });
    setConfirmEmail(false);
  }

  useEffect(() => {
    if (password.length >= 6) {
      setPasswordAlert(false);
    }
    const comparePasswords = () => {
      if (password.length < 6 && password.length != 0) {
        setPasswordAlert(true);
        return;
      }
      if (password === confirmPassword || confirmPassword === "") {
        setPasswordMatchAlert(false);
      } else {
        setPasswordMatchAlert(true);
        console.log("alert");
      }
    };
    const debounceTimeout = setTimeout(comparePasswords, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [password, confirmPassword]);

  useEffect(() => {
    const isGmailAddressValid = () => {
      const gmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (gmailRegex.test(email) || email == "") {
        setEmailAlert(false);
      } else {
        setEmailAlert(true);
      }
    };
    const debounceTimeout = setTimeout(isGmailAddressValid, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [email]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!e.target.reportValidity()) {
      // If there are validation errors, display the built-in validation message
      return;
    }
    if (passwordMatchAlert || passwordAlert) {
      setRegisterAlert(true);
      return;
    }

    try {
      setLoaddingGif(true);
      const response = await register(username, email, password);
      if (response.status == 409) {
        setExistedEmailAlert(true);
      }
      if (response.status == 200) {
        setConfirmEmail(true);
        setRegisterAlert(false);
      }
      setLoaddingGif(false);
    } catch (err) {
      console.error(err);
    }
  };

  const style =
    "w-full h-[40px] rounded-[9px] mt-2.5 border border-solid shadow-sm";
  const confirmPasswordStyle = passwordMatchAlert && "border-red-500";

  return (
    <CustomModal modalIsOpen={modalIsOpen} closeModel={closeModal}>
      {!confirmEmail ? (
        <>
          <button onClick={closeModal} className="ml-auto mr-0 block">
            <RxCross1 />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-normal">Sign up</h1>
            <div className="flex flex-row items-center w-full">
              <div className="h-[1px] bg-[#e5e5e5] w-full" />
              <p className="mx-2">with</p>
              <div className="h-[1px] bg-[#e5e5e5] w-full" />
            </div>
          </div>
          <form onSubmit={handleSignUp} className="w-[600px]">
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
              type="email"
              placeholder="Email"
              value={email}
              className={`${style} p-3 focus:outline-none `}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailAlert && (
              <p className="text-red-500">Email is not in right pattern</p>
            )}
            {existedEmailAlert && (
              <p className="text-red-500">Email already exist</p>
            )}
            <input
              type="text"
              placeholder="Display Name"
              value={username}
              className={`${style} p-3 focus:outline-none `}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className={`${style} p-3 border-[#e5e5e5] focus:outline-none`}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>

            {passwordAlert && (
              <p className="text-red-500">
                Password must have at least 6 characters
              </p>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              className={`${style} p-3 border-[#e5e5e5] focus:outline-none ${confirmPasswordStyle}`}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordMatchAlert && (
              <p className="text-red-500">
                Confirm password not match with password
              </p>
            )}
            <button
              className={`${style} text-white bg-[#f50] border-none`}
              type="submit"
            >
              {loaddingGif ? (
                <div>
                  Please Wait{" "}
                  <img
                    className="inline-block w-[30px]"
                    src={gifLoading}
                    alt=""
                  />
                </div>
              ) : (
                "Submit"
              )}
            </button>
            {registerAlert && (
              <p className="text-red-500">There's some error above</p>
            )}
            <NotificationBar />
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p>
            Successfully sign up, please verify by checking the link we sent to
            your email
          </p>
          <button
            className="px-2 py-1 bg-[#f50] w-fit rounded-md  mt-3"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
    </CustomModal>
  );
};

export default RegisterModal;
