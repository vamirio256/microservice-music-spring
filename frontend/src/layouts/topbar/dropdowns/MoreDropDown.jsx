import React, { useEffect, useRef, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useDispatch } from "react-redux";

const MoreDropDown = ({ className }) => {
  const [isShowed, setIsShowed] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const openConfirmModal = () => {
    dispatch({
      type: "OPEN_MODAL_CONFIRM",
      onConfirm: logout,
      context:
        "Are you sure to logout right now? There are many tracks waiting you to discover.",
      title: "Logout",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsShowed(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setIsShowed(false);
      }
    };

    if (isShowed) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isShowed]);

  return (
    <div
      className={`${
        isShowed && "bg-black"
      } px-3 relative flex items-center cursor-pointer ${className}`}
      ref={dropdownRef}
    >
      <div>
        <PiDotsThreeOutlineFill
          color="white"
          size={25}
          onClick={() => setIsShowed(!isShowed)}
        />
        {isShowed && (
          <div
            className="absolute border-b border-x border-[#ccc] top-11 right-0 flex flex-col w-[100px]  bg-white rounded-b-sm font-normal text-xs shadow-sm"
            onClick={() => setIsShowed(false)}
          >
            <div
              onClick={openConfirmModal}
              className="hover:bg-hoverColor cursor-pointer flex items-center p-2"
            >
              <IoLogOut color="black" size={20} /> Sign out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreDropDown;
