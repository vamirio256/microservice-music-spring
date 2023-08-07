import React from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useDispatch } from "react-redux";

const MoreButton = ({ className, haveBorder, haveText }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`
      ${haveText ? "px-3 py-1" : "px-1 py-0.5"}
       h-fit w-fit border-[1px] border-solid text-xs rounded-[3px] max-h-[25px] hover:border-[#999] flex flex-row item-center bg-white
      ${className}`}
      onClick={() => {
        dispatch({ type: "APPEND_NOTIFICATION" });
      }}
    >
      <PiDotsThreeOutlineFill className="text-[16px]" />
      {haveText && <span className="ml-2">More</span>}
    </button>
  );
};

export default MoreButton;
