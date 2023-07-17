import React, { useState, useEffect } from "react";

const NotificationBar = ({ isShow, message }) => {
  const [showNotification, setShowNotification] = useState(false);

  // const notificationTimeout = setTimeout(() => {
  //   if (document.visibilityState === "visible") {
  //     // Close the notification if the document is currently visible
  //     notification.close();
  //   }
  // }, 3000);

  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showNotification]);

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  return (
    <>
      {isShow && (
        <div className="fixed bottom-[10px] left-[10px] bg-[#f5] p-3 rounded-md shadow-md">
          {message ? message : `This service is in developing`}
          qweqweqweqwe
        </div>
      )}
    </>
  );
};

export default NotificationBar;
