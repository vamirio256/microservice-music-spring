import React, { useEffect, useRef, useState } from "react";
import {} from "react-icons/io";
import { IoNotifications } from "react-icons/io5";

const NotificationDropDown = () => {
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
    <button
      className={`${isShowed && "bg-black"} px-3 hover:bg-black`}
      onClick={() => setIsShowed(!isShowed)}
      ref={dropdownRef}
    >
      <IoNotifications className="text-white" size={20} />
      {isShowed && (
        <div className="w-[400px] h-fit absolute top-12 right-20 bg-white z-20">
          <div className="flex flex-row justify-between">
            <h3>Notifications</h3>
            <p>Settings</p>
          </div>
          <div className="">
            {notification ? (
              <div>This is notification</div>
            ) : (
              <p>No notifications</p>
            )}
          </div>
        </div>
      )}
    </button>
  );
};

export default NotificationDropDown;
