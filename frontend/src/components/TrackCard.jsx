import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

import { MdPlaylistAdd } from "react-icons/md";

const TrackCard = ({ className, track, openModal }) => {
  return (
    <div className="flex flex-col sm:w-32 lg:w-44 mx-auto bg-white overflow-hidden text-left">
      <div className="group cursor-pointer">
        <div className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover">
          <div className="group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-transparent">
            <img
              src={track.image}
              alt={track.title}
              className="w-full h-full object-cover duration-300 ease-in-out 
            
            group-hover:scale-105 group-hover:opacity-80"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/4 h-1/4 overflow-hidden opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 flex justify-center items-center z-10">
              {/* Play button */}
              <a className="rounded-full bg-[#f30]  w-full h-full flex justify-center items-center z-20">
                <FaPlay className="text-white" />
              </a>
            </div>
          </div>
          {/* Favorite button */}
          <FaHeart className="absolute right-7 bottom-2 text-white" />
          {/* add to playlist button */}

          <MdPlaylistAdd
            className="absolute right-2 bottom-2 text-white"
            onClick={openModal}
          />
        </div>
        {/* track title */}
        <h2 className="mt-2 mb-1 text-sm font-light text-gray-800 group-hover:text-black truncate ">
          {track.title}
        </h2>
      </div>
      {/* track artist*/}
      <p className="text-xs font-extralight text-gray-400 truncatel">{track.artist}</p>
    </div>
  );
};

export default TrackCard;
