import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

const PlaylistTrackCard = ({ track }) => {
  return (
    <div className="flex flex-row border-solid border-b p-[5px] justify-between hover:bg-[#f2f2f2] cursor-pointer text-xs">
      <div className="flex flex-row">
        <span className="mr-3">
          <img src={track.coverUrl} className="h-[-20px] w-[20px] " />
        </span>
        <span className="mr-2 text-[#999]">{track.user.username}</span>
        <span>&bull;</span>
        <span className="ml-2">{track.name}</span>
      </div>
      <div className="flex flex-row text-[#999] items-center">
        <span>
          <BsFillPlayFill className="transform" />
        </span>
        <span>{track.listenedTime}</span>
      </div>
    </div>
  );
};

export default PlaylistTrackCard;
