import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";

export default function NotificationItem({ item, index }) {
  const [opacity, setOpacity] = useState(false);
  const [fadeOut, setFadeOut] = useState("");
  const timeOutFadeOut = () => {
    setTimeout(() => {
      setFadeOut("fade-out");
    }, 4500);
  };

  useEffect(() => {
    setOpacity(true);
    timeOutFadeOut();
  }, []);

  return (
    <div
      className={`${fadeOut} fixed h-fit w-[200px] overflow-hidden g-[#fff] p-3 rounded-md shadow-md border-[1px] border-solid cursor-pointer flex flex-col z-max bg-white right-5 transition-opacity duration-500 ease-in-out`}
      style={{ top: 50 + index * 100 }}
    >
      <div className="flex flex-row items-center">
        <IoNotifications size={50} className="text-[#f50] mr-3" />
        <div>{item.text}</div>
      </div>
    </div>
  );
}
