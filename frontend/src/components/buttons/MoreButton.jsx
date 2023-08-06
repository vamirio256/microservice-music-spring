import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";

const MoreButton = ({ className, haveBorder, haveText }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`
      ${haveText ? "px-2 py-1" : "px-1 py-0.5"}
       h-fit border-[1px] border-solid text-xs rounded-sm hover:border-[#999] flex flex-row item-center
      ${className}`}
      onClick={() => {
        dispatch({ type: "APPEND_NOTIFICATION" });
      }}
    >
      <BsThreeDots className="text-[14px]" />
      {haveText && <span className="ml-1">More</span>}
    </button>
  );
};

export default MoreButton;
