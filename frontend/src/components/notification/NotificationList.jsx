import React, { useState, useEffect, useRef } from "react";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  const notification = useSelector((state) => state.notificationListReducer);
  const prevCountRef = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prevCountRef.current.length < notification.length) {
      setTimeout(() => {
        dispatch({
          type: "CLOSE_NOTIFICATION_RIGHTBAR",
        });
      }, 5000);
    }

    return () => {
      prevCountRef.current = notification;
    };
  }, [notification]);

  return (
    <>
      {notification?.map((item, key) => (
        <NotificationItem item={item} key={key} index={key} />
      ))}
    </>
  );
};

export default NotificationList;
