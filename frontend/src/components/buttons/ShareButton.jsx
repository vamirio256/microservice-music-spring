import React from "react";
import { FaShare } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ShareButton = ({ className, haveText, haveBorder }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`
      ${haveText ? "px-2 py-1" : "px-1 py-0.5"}
      ${haveBorder && "border-[1px]"}
       text-xs rounded-sm hover:border-[#999] flex flex-row item-center mr-2 max-h-[26px] bg-white
      ${className}`}
      onClick={() => {
        dispatch({ type: "APPEND_NOTIFICATION" });
      }}
    >
      <FaShare className="text-[14px]" />
      {haveText && <span className="ml-2">Share</span>}
    </button>
  );
};

export default ShareButton;
