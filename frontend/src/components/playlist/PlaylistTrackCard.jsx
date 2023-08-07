import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "../buttons/FavoriteButton";
import FavoriteButton from "../buttons/FavoriteButton";
import MoreButton from "../buttons/MoreButton";
import CopyLinkButton from "../buttons/CopyLinkButton";
import ShareButton from "../buttons/ShareButton";

const PlaylistTrackCard = ({
  track,
  setTrack,
  setIsPlaying,
  playTrack,
  className,
}) => {
  const handlePlayTrack = () => {
    setTrack(track);
    setIsPlaying(true);
    playTrack(track);
  };

  return (
    <div
      className={`relative flex flex-row border-solid border-b p-[5px] bg-white justify-between group hover:bg-[#f2f2f2] cursor-pointer text-xs ${className}`}
      onClick={handlePlayTrack}
    >
      <div className="flex flex-row min-h-[30px] items-center">
        <img src={track.coverUrl} className="h-[30px] w-[30px] mr-3" />
        <span className="username mr-2 text-[#999]">
          {track.user ? track.user.username : "Undefined"}
        </span>
        <span>&bull;</span>
        <span className="ml-2">{track.name}</span>
      </div>

      {/* total played time */}
      <div
        className={`flex flex-row text-[#999] items-center group-hover:invisible`}
      >
        <span>
          <BsFillPlayFill className="transform" />
        </span>
        <span>{track.listenedTime}</span>
      </div>

      {/* hovering button */}
      <div className="invisible absolute right-3 top-0 bottom-0 m-auto group-hover:visible flex items-center ">
        <FavoriteButton track={track} haveBorder={true} className={"mr-2"} />
        <CopyLinkButton haveBorder={true} className={"mr-2"} />
        <ShareButton haveBorder={true} />
        <MoreButton haveBorder={true} />
      </div>
    </div>
  );
};

export default PlaylistTrackCard;
