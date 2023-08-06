import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Favorite from "../buttons/Favorite";
import UserHoverBar from "../trackcard/UserHoverBar";

export const SideBarTrackCard = ({ track }) => {
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.playingReducer);

  function playTrack() {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
    dispatch({
      type: "APPEND_HISTORY",
      track: track,
    });
    dispatch({
      type: "APPEND_QUEUE",
      track: track,
    });
  }

  return (
    <div className="flex mb-4 relative group">
      {/* image right */}
      <div className="cursor-pointer relative w-[50px] h-[50px] group">
        <img
          src={track.coverUrl}
          className="object-cover w-[50px] h-[50px] border-[0.5px] border-[#ccc]"
        />
        {/* play button */}
        {playing.track.id === track.id && playing.isPlaying === true ? (
          <FaPlay
            size={20}
            className="text-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 hidden group-hover:block"
            onClick={playTrack}
          />
        ) : (
          <BsFillPauseFill
            size={20}
            className="text-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 hidden group-hover:block"
            onClick={playTrack}
          />
        )}
      </div>

      {/* right information */}
      <div className="pl-2">
        <UserHoverBar user={track.user} />
        <Link
          to={`/track/${track.id}`}
          className="text-sm line-clamp-1 text-black my-[-3px]"
        >
          {track.name}
        </Link>
        {/* icon infor */}
        <div className="flex text-xs">
          <BsPlayFill size={15} color="gray" />
          <div>{track.listenedTime}</div>
          <Favorite track={track} className="relative top-1 mx-2" />
          <div>0</div>
        </div>
      </div>

      {/* hover button */}
      <div className="">
        <Favorite haveBorder={true} />
      </div>
    </div>
  );
};
