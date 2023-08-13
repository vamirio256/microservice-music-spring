import React, { useEffect, useRef, useState } from "react";
import { BsFillEnvelopeFill } from "react-icons/bs";
import {} from "react-icons/io";

const MessageDropDown = () => {
  const [isShowed, setIsShowed] = useState(false);
  const [notification, setNotification] = useState("");
  const dropdownRef = useRef(null);

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
    <div className="flex items-center">
      <button
        className={`${isShowed && "bg-black"} px-3 hover:bg-black h-full`}
        onClick={() => setIsShowed(!isShowed)}
        ref={dropdownRef}
      >
        <BsFillEnvelopeFill className="text-white" size={20} />
      </button>
      {isShowed && (
        <div className="w-[300px] lg:w-[400px] h-fit absolute top-12 right-0 bg-white z-20 rounded-sm shadow-md">
          <div className="flex flex-row justify-between p-3">
            <h3>Notifications</h3>
            <p>Settings</p>
          </div>
          <hr />
          <div className="p-3">
            {notification ? (
              <div>This is notification</div>
            ) : (
              <p>No messages</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageDropDown;
