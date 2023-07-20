import React, { useState, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const NotificationBar = ({ children, message, className }) => {
  const isShowed = useSelector((state) => state.notificationReducer).isShowed;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isShowed) {
      const timeout = setTimeout(() => {
        dispatch({
          type: "CLOSE_NOTIFICATION",
        });
      }, 4800);

      return () => clearTimeout(timeout);
    }
  }, [isShowed]);

  const hideNotification = () => {
    dispatch({
      type: "CLOSE_NOTIFICATION",
    });
  };

  return (
    <>
      {isShowed && (
        <div
          className={`${className} notification-bar fixed h-[100px] w-[200px] overflow-hidden left-0 right-0 m-auto bottom-[60px] bg-[#fff] p-3 rounded-md shadow-md border-[1px] border-solid cursor-pointer flex flex-col`}
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
