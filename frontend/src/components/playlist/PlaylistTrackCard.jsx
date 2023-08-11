import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

import FavoriteButton from "../buttons/FavoriteButton";
import MoreButton from "../buttons/MoreButton";
import CopyLinkButton from "../buttons/CopyLinkButton";
import ShareButton from "../buttons/ShareButton";

const PlaylistTrackCard = ({
  track,
  playTrack,
  className,
  isGradient,
  currentPlayingTrack,
}) => {
  const handlePlayTrack = () => {
    playTrack(track);
  };

  return (
    <div
      className={`
      ${currentPlayingTrack?.id === track.id && "bg-[#f2f2f2]"}
      ${
        isGradient
          ? "bg-transparent hover:bg-[hsla(0,0%,100%,.1)] text-white border-[#999]"
          : "hover:bg-[#f2f2f2]"
      }
      relative flex flex-row border-b p-[5px] justify-between group  cursor-pointer text-xs ${className}`}
      onClick={handlePlayTrack}
    >
      <div className={`flex flex-row min-h-[30px] items-center`}>
        <img src={track.coverUrl} className="h-[30px] w-[30px] mr-3" />
        <span
          className={`${
            isGradient ? "text-[#ccc]" : "text-[#999]"
          } username mr-2`}
        >
          {track.user ? track.user.username : "undefined"}
        </span>
        <span>&bull;</span>
        <span className="ml-2">{track.name}</span>
      </div>

      {/* total played time */}
      <div
        className={`${
          isGradient ? "text-white" : "text-[#999]"
        } flex flex-row items-center group-hover:invisible`}
      >
        <span>
          <BsFillPlayFill className="transform mr-1" />
        </span>
        <span>{track.listenedTime}</span>
      </div>

      {/* hovering button */}
      <div
        className="invisible absolute right-3 top-0 bottom-0 m-auto group-hover:visible flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteButton
          track={track}
          haveBorder={true}
          className={` ${isGradient && "bg-transparent text-white"} mr-2`}
        />
        <CopyLinkButton
          haveBorder={true}
          className={` ${isGradient && "!bg-transparent text-white"} mr-2`}
        />
        <ShareButton
          haveBorder={true}
          className={` ${isGradient && "!bg-transparent text-white"} mr-2`}
        />
        <MoreButton
          haveBorder={true}
          className={` ${isGradient && "!bg-transparent text-white"} mr-2`}
        />
      </div>
    </div>
  );
};

export default PlaylistTrackCard;
