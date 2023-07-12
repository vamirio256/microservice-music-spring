import React, { useState, useEffect } from 'react';

const NotificationBar = () => {
  const [showNotification, setShowNotification] = useState(false);

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
    <div>
      <button onClick={handleShowNotification}>Show Notification</button>
      {showNotification && (
        <div className="fixed bottom-[10px] left-[10px] bg-[#f5] p-3 rounded-md shadow-md">
          {/* Notification content */}
          This is a notification message.
        </div>
      )}
    </div>
  );
};

export default NotificationBar;