import React from "react";

import { AiFillPlayCircle, AiOutlineMore } from "react-icons/ai";

import { BsShare } from "react-icons/bs";
export const TrackItemUser = () => {
  return (
    <div className="flex mb-2 mt-5">
      {/* image right */}
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          className="object-cover w-[120px] h-[120px]"
        />
      </div>

      {/* right information */}
      {/* tracks info */}
      <div className="pl-2 flex flex-col">
        <div className="flex mb-2">
          {/* playbtn */}
          <div>
            <AiFillPlayCircle className="text-orange text-5xl mx-2" />
          </div>
          {/* infop */}
          <div>
            <div className="text-gray-500 text-xs">Ronboogz</div>
            <div className="py-1 text-sm">
              Don't Côi - Ronboogz x RPT Orijinn
            </div>
          </div>
        </div>
        {/* list button */}
        <div className="text-sm mt-auto ml-5">
          <button className="outline-1 outline-gray-200 outline px-1">
            <BsShare className="inline" /> Share
          </button>
          <button className="outline-1 outline-gray-200 outline px-1 ml-5">
            <AiOutlineMore className="inline rotate-90" /> More
          </button>
        </div>
      </div>
    </div>
  );
};
