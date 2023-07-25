import React from "react";
import { BsHeartFill, BsLink, BsShareFill, BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

const InteractButton = ({ className }) => {
  const dispatch = useDispatch();

  const buttonStyle =
    "border-[1px] border-solid px-2 py-1 text-xs rounded-sm hover:border-[#999] flex flex-row item-center mr-2";

  return (
    <>
      {/* interact button */}
      <div className={`${className} flex row mt-3`}>
        <button className={`${buttonStyle}`}>
          <BsHeartFill className="text-[14px]" />
          <span className="ml-1">Like</span>
        </button>
        <button
          className={`${buttonStyle}`}
          onClick={() => {
            dispatch({ type: "SHOW_NOTIFICATION" });
          }}
        >
          <BsShareFill className="text-[14px]" />
          <span className="ml-1">Share</span>
        </button>
        <button
          className={`${buttonStyle}`}
          onClick={() => {
            dispatch({ type: "SHOW_NOTIFICATION" });
          }}
        >
          <BsLink className="text-[14px]" />
          <span className="ml-1">Copy Link</span>
        </button>
        <button
          className={`${buttonStyle}`}
          onClick={() => {
            dispatch({ type: "SHOW_NOTIFICATION" });
          }}
        >
          <MdEdit className="text-[14px]" />
          <span className="ml-1">Edit</span>
        </button>
        <button
          className={`${buttonStyle}`}
          onClick={() => {
            dispatch({ type: "SHOW_NOTIFICATION" });
          }}
        >
          <BsThreeDots className="text-[14px]" />
          <span className="ml-1">More</span>
        </button>
      </div>
    </>
  );
};

export default InteractButton;
