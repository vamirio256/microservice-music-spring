import React, { useEffect, useState } from "react";
import { BiSolidComment } from "react-icons/bi";
import { BsFillPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { IoIosPlay } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteButton from "../buttons/FavoriteButton";
import MoreButton from "../buttons/MoreButton";
import UserHoverBar from "../track/UserHoverBar";
import ShareButton from "../buttons/ShareButton";
import CopyLinkButton from "../buttons/CopyLinkButton";

export const SideBarTrackCard = ({ track }) => {
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.playingReducer);
  const [isPlaying, setIsPlaying] = useState(false);

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
      type: "SET_QUEUE",
      tracks: [track],
    });
  }

  useEffect(() => {
    if (!playing || playing === undefined) return;
    if (playing.track.id === track.id && playing.isPlaying === true)
      setIsPlaying(true);
    else setIsPlaying(false);
  }, [playing.track, playing.isPlaying]);

  return (
    <>
      <div className="flex mb-4 relative group w-full">
        {/* image right */}
        <div className="cursor-pointer w-[50px] relative group mt-1">
          <img
            src={track.coverUrl}
            className="object-cover min-w-[50px] h-[50px] border-[0.5px] border-[#ccc]"
          />
          {/* play button */}
          {isPlaying ? (
            <BsFillPauseFill
              size={20}
              className="text-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 hidden group-hover:block"
              onClick={playTrack}
            />
          ) : (
            <FaPlay
              size={20}
              className="text-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 hidden group-hover:block"
              onClick={playTrack}
            />
          )}
        </div>

        {/* right information */}
        <div className="pl-2 w-full flex flex-col justify-between">
          {track.user && (
            <Link
              to={`/user/${track.user.id}`}
              className={`username text-[11px] font-extralight line-clamp-1 ${
                isPlaying ? "text-[#f50]" : "text-[#999]"
              }`}
            >
              {track.user.username}
            </Link>
          )}
          <Link
            to={`/track/${track.id}`}
            className={`text-[13px] line-clamp-1 mt-[-2px] ${
              isPlaying ? "text-[#f50]" : "text-black"
            }`}
          >
            {track.name}
          </Link>
          {/* icon infor */}
          <div className="grid grid-cols-3 gap-3 mt-1 items-center text-xs  w-fit">
            <div className="grid grid-cols-2 gap-0.5 items-center ">
              <IoIosPlay color="#999" />
              <p>{track.listenedTime}</p>
            </div>
            <div className="grid grid-cols-2 gap-0.5 items-center">
              <GoHeartFill color="#999" className="text-[10px]" />
              <p>11</p>
            </div>
            <div className="grid grid-cols-2 gap-0.5 items-center">
              <BiSolidComment color="#999" className="text-[10px]" />
              <p>12</p>
            </div>
          </div>
        </div>

        {/* hover button */}
        <div
          className={`
        ${isPlaying ? "visible" : "invisible group-hover:visible"}
        flex flex-row items-center justify-end text-black`}
        >
          <FavoriteButton track={track} haveBorder={true} className={"mr-2"} />
          <MoreButton haveBorder={true} />
        </div>
      </div>
    </>
  );
};
