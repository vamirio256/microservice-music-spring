import React, { useState, useEffect, useRef } from "react";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  const notification = useSelector((state) => state.notificationReducer);
  const prevCountRef = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.length == 0) {
      return;
    }
    const timeout = setTimeout(() => {
      dispatch({
        type: "REMOVE_ALL_NOTIFICATION",
      });
    }, 5500);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  return (
    <div className="flex flex-col fixed right-10 top-20">
      {notification?.map((item, key) => (
        <NotificationItem item={item} key={key} index={key} />
      ))}
    </div>
  );
};

export default NotificationList;
