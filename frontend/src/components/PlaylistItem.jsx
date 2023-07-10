import React from "react";
import { BsPlay, BsPlayFill } from "react-icons/bs";

export const PlaylistItem = () => {
  return (
    <div className="mb-2 flex text-sm ml-3 items-center cursor-pointer hover:bg-gray-400">
      <img
        src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="
        alt=""
        className="w-5 h-5"
      />
      <div className="px-1">1</div>
      {/* titile */}
      <div className="text-gray-500">Ronboogz</div>
      {/* view */}

      <div className="ml-auto flex">
        <BsPlayFill className="text-gray-500 relative items-end" />
        <div className="text-gray-500 items-end block text-xs">81.4K</div>
      </div>
    </div>
  );
};
