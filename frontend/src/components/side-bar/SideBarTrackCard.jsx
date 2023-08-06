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
import UserHoverBar from "../trackcard/UserHoverBar";

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
      type: "APPEND_QUEUE",
      track: track,
    });
  }

  useEffect(() => {
    if (!playing) {
      return;
    }
    if (playing.track.id === track.id && playing.isPlaying === true)
      setIsPlaying(true);
    else setIsPlaying(false);
  }, [playing]);

  return (
    <div className="flex mb-4 relative group w-full">
      {/* image right */}
      <div className="cursor-pointer relative min-w-[50px] h-[50px] group">
        <img
          src={track.coverUrl}
          className="object-cover w-[50px] h-[50px] border-[0.5px] border-[#ccc]"
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
      <div className="pl-2 w-full">
        <UserHoverBar user={track.user} />
        <Link
          to={`/track/${track.id}`}
          className="text-sm line-clamp-1 text-black my-[-3px]"
        >
          {track.name}
        </Link>
        {/* icon infor */}
        <div className="grid grid-cols-3 gap-1 items-center w-fit">
          <div className="grid grid-cols-2 items-center">
            <IoIosPlay color="#999"/>
            <p>{track.listenedTime}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <GoHeartFill color="#999" />
            <p>0</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <BiSolidComment color="#999" />
            <p>0</p>
          </div>
        </div>
      </div>

      {/* hover button */}
      <div
        className={`
        ${isPlaying ? "visible" : "invisible group-hover:visible"}
        flex flex-row items-center justify-end`}
      >
        <FavoriteButton haveBorder={true} />
        <MoreButton haveBorder={true} />
      </div>
    </div>
  );
};
