import React from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

const Edit = ({className, handleFunc}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${className} border-[1px] border-solid px-2 py-1 text-xs rounded-sm hover:border-[#999] flex flex-row item-center mr-2`}
      onClick={() => {
        dispatch({ type: "APPEND_NOTIFICATION" });
      }}
    >
      <MdEdit className="text-[14px]" />
      <span className="ml-1">Edit</span>
    </button>
  );
};

export default Edit;
