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
  currentPlayingTrack,
}) => {
  const handlePlayTrack = () => {
    playTrack(track);
  };

  return (
    <div
      className={`relative flex flex-row border-solid border-b p-[5px] justify-between group hover:bg-[#f2f2f2] cursor-pointer text-xs ${className} ${
        currentPlayingTrack?.id == track.id ? "bg-[#f2f2f2]" : "bg-white"
      }`}
      onClick={handlePlayTrack}
    >
      <div className="flex flex-row min-h-[30px] items-center">
        <img src={track.coverUrl} className="h-[30px] w-[30px] mr-3" />
        <span className={`username mr-2 text-[#999]`}>
          {track.user ? track.user.username : "Undefined"}
        </span>
        <span>&bull;</span>
        <span className="ml-2">{track.name}</span>
      </div>

      {/* total played time */}
      <div
        className={`flex flex-row text-[#999] items-center group-hover:invisible ${
          currentPlayingTrack?.id == track.id && "text-white"
        }`}
      >
        <span>
          <BsFillPlayFill className="transform" />
        </span>
        <span>{track.listenedTime}</span>
      </div>

      {/* hovering button */}
      <div
        className="invisible absolute right-3 top-0 bottom-0 m-auto group-hover:visible flex items-center "
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteButton track={track} haveBorder={true} className={"mr-2"} />
        <CopyLinkButton haveBorder={true} className={"mr-2"} />
        <ShareButton haveBorder={true} />
        <MoreButton haveBorder={true} />
      </div>
    </div>
  );
};

export default PlaylistTrackCard;
