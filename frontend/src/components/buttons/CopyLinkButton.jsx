import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoLink } from "react-icons/io5";
import { useDispatch } from "react-redux";

const CopyLinkButton = ({ className, copyLink, haveBorder, haveText }) => {
  const dispatch = useDispatch();

  const handleCopyLink = () => {
    dispatch({
      type: "APPEND_NOTIFICATION",
      text: "Link has been copied to the clipboard!",
      icon: "check",
    });
  };

  return (
    <button
      className={` 
      ${haveText ? "px-3 py-1 " : "px-1 py-0.5"}
      border-[1px] border-solid text-xs rounded-[3px] hover:border-[#999] flex flex-row items-center mr-2 max-h-[26px] bg-white w-fit${className}`}
      onClick={handleCopyLink}
    >
      <IoLink className="text-[15px]" />
      {haveText && <span className="ml-2">Copy Link</span>}
    </button>
  );
};

export default CopyLinkButton;
