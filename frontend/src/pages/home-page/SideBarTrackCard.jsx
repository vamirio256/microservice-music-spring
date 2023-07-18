import React from "react";
import { BsHeart, BsPlay } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

export const SideBarTrackCard = () => {
  return (
    <div className="flex mb-4">
      {/* image right */}
      <div className="cursor-pointer relative w-[50px] h-[50px] group">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          className="object-cover w-[50px] h-[50px] border-[0.5px] border-[#ccc]"
        />
        {/* play button */}
        <FaPlay
          size={20}
          className="text-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 hidden group-hover:block"
        />
      </div>

      {/* right information */}
      <div className="pl-2">
        <div className="text-gray-500 text-xs">Ronboogz</div>
        <div className="py-1 text-sm line-clamp-1 text-black my-[-3px]">
          Don't Côi - Ronboogz x RPT Orijinn
        </div>
        {/* icon infor */}
        <div className="flex text-xs">
          <BsPlay size={15} color="gray" />
          <div>9.61M</div>
          <BsHeart size={10} className="relative top-1 mx-2" />
          <div>72.6K</div>
        </div>
      </div>
    </div>
  );
};
