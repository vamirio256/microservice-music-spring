import React, { useState, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";

const NotificationBar = ({ children, message }) => {
  const [isShowed, setIsShowed] = useState(true);

  useEffect(() => {
    if (isShowed) {
      const timeout = setTimeout(() => {
        setIsShowed(false);
      }, 4800);

      return () => clearTimeout(timeout);
    }
  }, [isShowed]);

  const showNotification = () => {
    setIsShowed(true);
  };

  const hideNotification = () => {
    setIsShowed(false);
  };

  return (
    <>
      {isShowed && (
        <div
          className="notification-bar fixed h-[100px] w-[200px] overflow-hidden left-0 right-0 m-auto bottom-[60px] bg-[#fff] p-3 rounded-md shadow-md border-[1px] border-solid cursor-pointer flex flex-col"
          onClick={hideNotification}
        >
          <div className="flex flex-row">
            <IoNotifications />
            {message ? message : `This service is under development.`}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationBar;
