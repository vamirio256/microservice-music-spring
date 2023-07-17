import React from "react";
import { BsHeart, BsPlay } from "react-icons/bs";

export const SideBarTrackCard = () => {
  return (
    <div className="flex mb-2">
      {/* image right */}
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          className="object-cover w-[50px] h-[50px] border-[0.5px] border-[#ccc]"
        />
      </div>

      {/* right information */}
      <div className="pl-2">
        <div className="text-gray-500 text-xs">Ronboogz</div>
        <div className="py-1 text-sm">Don't Côi - Ronboogz x RPT Orijinn</div>
        {/* icon infor */}
        <div className="flex text-sm">
          <BsPlay size={15} color="gray" />
          <div>9.61M</div>
          <BsHeart size={10} className="relative top-1 mx-2" />
          <div>72.6K</div>
        </div>
      </div>
    </div>
  );
};
