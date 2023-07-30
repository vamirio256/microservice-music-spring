import React, { useState } from "react";
import {} from "react-icons/io";
import { IoNotifications } from "react-icons/io5";

const MessageDropDown = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [notification, setNotification] = useState("");

  const style = isFocused && `bg-black`;

  const openDropDown = () => {
    setIsFocused(true);
  };

  const toggleDropDown = () => {
    setIsFocused(!isFocused);
  };

  return (
    <button className={`${style} hover:bg-black`} onClick={toggleDropDown}>
      <IoNotifications className="text-white" />
      {isFocused && (
        <div className="w-[400px] h-fit absolute top-12 right-20 bg-white z-20">
          <div className="flex flex-row justify-between">
            <h3>Notifications</h3>
            <p>Settings</p>
          </div>
          <div className="">
            {notification ? (
              <div>This is notification</div>
            ) : (
              <p>No messages</p>
            )}
          </div>
        </div>
      )}
    </button>
  );
};

export default MessageDropDown;
