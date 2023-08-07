import React, { useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function NotificationItem({ item, index }) {
  const [opacity, setOpacity] = useState(false);
  const notificationReducer = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();
  const ref = useRef(null);

  function hideElement() {
    setOpacity(false);
    setTimeout(() => {
      ref.current.style.display = "none";
    }, 500);
  }

  useEffect(() => {
    setOpacity(true);
    setTimeout(() => {
      hideElement();
    }, 5000);
  }, []);

  const renderIcon = () => {
    switch (item.icon) {
      case "check":
        return (
          <div className="w-[40px] h-[40px] bg-[#f50] rounded-l-[3px] border border-[#a73a04] flex justify-center">
            <BsCheckLg className="text-[25px] text-white drop-shadow-md m-auto" />
          </div>
        );
      case "alert":
        return (
          <div className="w-[40px] h-[40px] bg-[#f50]">
            <BsCheckLg className="text-[40px] text-white" />
          </div>
        );
    }
  };

  return (
    // <div
    //   className={`mt-2 w-[200px] overflow-hidden g-[#fff] p-3 rounded-md shadow-md border-[1px] border-solid cursor-pointer flex flex-col z-max bg-white right-5 transition-opacity duration-500 ease-in-out relative group`}
    <div
      className={`rounded-[3px] drop-shadow-md bg-white mb-4 relative group cursor-pointer flex h-fit transition-opacity duration-500 ease-in-out w-[280px]`}
      onClick={hideElement}
      style={{ opacity: opacity ? 1 : 0 }}
      ref={ref}
    >
      {item.image && (
        <img src={item.image} alt="" className="w-[40px] h-[40px]" />
      )}
      {renderIcon()}  
      <div className="flex h-full flex-col justify-start ml-3 m-auto">
        {item.name && <p className="font-normal truncate">{item.name}</p>}
        {item.text && <p className="text-xs">{item.text}</p>}
      </div>
    </div>
  );
}
