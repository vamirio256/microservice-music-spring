import React from "react";
import { BsShareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const Share = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${className} border-[1px] border-solid px-2 py-1 text-xs rounded-sm hover:border-[#999] flex flex-row item-center mr-2`}
      onClick={() => {
        dispatch({ type: "APPEND_NOTIFICATION" });
      }}
    >
      <BsShareFill className="text-[14px]" />
      <span className="ml-1">Share</span>
    </button>
  );
};

export default Share;
