import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";

const More = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${className} border-[1px] border-solid px-2 py-1 text-xs rounded-sm hover:border-[#999] flex flex-row item-center mr-2`}
      onClick={() => {
        dispatch({ type: "SHOW_NOTIFICATION" });
      }}
    >
      <BsThreeDots className="text-[14px]" />
      <span className="ml-1">More</span>
    </button>
  );
};

export default More;
