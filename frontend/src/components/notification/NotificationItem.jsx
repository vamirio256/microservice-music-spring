import React, { useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function NotificationItem({ item, index }) {
  const [opacity, setOpacity] = useState(false);

  const ref = useRef(null);
  function hideElement() {
    setOpacity(false);
    setTimeout(() => {
      ref.current.style.display = "none";
    }, 500);
  }
  useEffect(() => {
    setOpacity(true);

    // setTimeout(() => {
    //   setFadeOut("fade-out");
    // }, 4500);
    setTimeout(() => {
      hideElement();
    }, 3000);
  }, []);

  return (
    <div
      className={`mt-2 w-[200px] overflow-hidden g-[#fff] p-3 rounded-md shadow-md border-[1px] border-solid cursor-pointer flex flex-col z-max bg-white right-5 transition-opacity duration-500 ease-in-out relative group`}
      onClick={hideElement}
      style={{ opacity: opacity ? 1 : 0 }}
      ref={ref}
    >
      <div className="absolute top-1 right-1 group-hover:block hidden">x</div>
      <div className="flex flex-row items-center">
        <IoNotifications size={50} className="text-[#f50] mr-3" />
        <div>{item.text}</div>
      </div>
    </div>
  );
}
