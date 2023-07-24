import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsHeart, BsPlay, BsPlayFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "../../components/icons/Favorite";

export const SideBarTrackCard = ({ track }) => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.currentSongReducer);
  const historySongs = useSelector((state) => state.songHistoryReducer);
  const [isPlaying, setIsPlaying] = useState(false);

  function setAudioPlaying() {
    // set music and set play
    if (isPlaying) {
      // dispatch({ type: "SETPLAYING", play: false });
      dispatch({
        type: "CHANGESONG",
        song: {
          ...track,
          isPlaying: false,
        },
      });
    } else {
      dispatch({
        type: "CHANGESONG",
        song: {
          ...track,
          isPlaying: true,
        },
      });
    }
  }
  useEffect(() => {
    if (!currentSong || currentSong.audioUrl != track.audioUrl) {
      setIsPlaying(false);
    } else {
      setIsPlaying(currentSong.isPlaying);
    }
  }, [historySongs, currentSong]);

  return (
    <div className="flex mb-4">
      {/* image right */}
      <div className="cursor-pointer relative w-[50px] h-[50px] group">
        <img
          src={track.coverUrl}
          className="object-cover w-[50px] h-[50px] border-[0.5px] border-[#ccc]"
        />
        {/* play button */}
        {!isPlaying ? (
          <FaPlay
            size={20}
            className="text-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 hidden group-hover:block"
            onClick={setAudioPlaying}
          />
        ) : (
          <BsFillPauseFill
            size={20}
            className="text-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 hidden group-hover:block"
            onClick={setAudioPlaying}
          />
        )}
      </div>

      {/* right information */}
      <div className="pl-2">
        <div className="text-gray-500 text-xs">{track.user.username}</div>
        <div className="py-1 text-sm line-clamp-1 text-black my-[-3px]">
          {track.name}
        </div>
        {/* icon infor */}
        <div className="flex text-xs">
          <BsPlayFill size={15} color="gray" />
          <div>{track.listenedTime}</div>
          <Favorite track={track.id} className="relative top-1 mx-2" />
          <div>0</div>
        </div>
      </div>
    </div>
  );
};
