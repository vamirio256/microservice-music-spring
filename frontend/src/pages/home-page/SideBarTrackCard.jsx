import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsHeart, BsPlay } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const SideBarTrackCard = ({ data }) => {
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
          ...data,
          isPlaying: false,
        },
      });
    } else {
      dispatch({
        type: "CHANGESONG",
        song: {
          ...data,
          isPlaying: true,
        },
      });
    }
  }
  useEffect(() => {
    if (!currentSong || currentSong.audioUrl != data.audioUrl) {
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
          src={data.coverUrl}
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
        <div className="text-gray-500 text-xs">{data.artist}</div>
        <div className="py-1 text-sm line-clamp-1 text-black my-[-3px]">
          {data.title}
        </div>
        {/* icon infor */}
        <div className="flex text-xs">
          <BsPlay size={15} color="gray" />
          <div>9.61M</div>
          <BsHeart size={10} className="relative top-1 mx-2" />
          <div>72.6K</div>
        </div>
      </div>
    </div>
  );
};
