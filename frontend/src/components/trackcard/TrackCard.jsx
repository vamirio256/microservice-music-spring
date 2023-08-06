import React, { useState, useEffect } from "react";
import { BsFillPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Favorite from "../buttons/FavoriteButton";
import UserHoverBar from "./UserHoverBar";

const TrackCard = ({ className, track }) => {
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.playingReducer);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = () => {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
    dispatch({
      type: "APPEND_QUEUE",
      track: track,
    });
    dispatch({
      type: "APPEND_HISTORY",
      track: track,
    });
  };

  useEffect(() => {
    if (!playing) {
      return;
    }
    if (playing.track.id === track.id && playing.isPlaying === true)
      setIsPlaying(true);
    else setIsPlaying(false);
  }, [playing]);

  function openPlaylistModal() {
    dispatch({ type: "OPEN_MODAL_PLAYLIST", track: track });
  }

  // useEffect(() => {
  //   if (!currentSong || currentSong.audioUrl != track.audioUrl) {
  //     setIsPlaying(false);
  //   } else {
  //     setIsPlaying(currentSong.isPlaying);
  //   }
  // }, [currentSong, historySongs]);

  return (
    <div className="flex flex-col sm:w-32 lg:w-44 mx-auto bg-white overflow-hidden text-left">
      <div className="group cursor-pointer">
        <div className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover">
          <div
            className={`group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-transparent ${
              isPlaying && "bg-gradient-to-t from-black to-transparent"
            }`}
          >
            <img
              src={track.coverUrl}
              alt={track.name}
              className={`w-[176px] h-[176px] object-contain  border-[1px] border-[#ccc] duration-300 ease-in-out 
            group-hover:scale-105 group-hover:opacity-80 ${
              isPlaying && "scale-105 opacity-80"
            }`}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-1/4 h-1/4 overflow-hidden opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 flex justify-center items-center z-10 ${
                isPlaying && "opacity-100"
              }`}
            >
              {/* Play button */}
              <a
                className="rounded-full bg-[#f30]  w-full h-full flex justify-center items-center z-20"
                onClick={playTrack}
              >
                {/* play btn */}

                {isPlaying ? (
                  <BsFillPauseFill className="text-white" size={20} />
                ) : (
                  <FaPlay className="text-white" />
                )}

                {/* <FaPlay className="text-white" /> */}
              </a>
              {/* Favorite button */}
              <Favorite
                track={track}
                className="absolute right-7 bottom-2 text-white"
              />
              {/* add to playlist button */}

              <MdPlaylistAdd
                className="absolute right-2 bottom-2 text-white"
                onClick={openPlaylistModal}
              />
            </div>
          </div>
        </div>
      </div>
      {/* track title */}
      <Link
        to={`/track/${track.id}`}
        className={`mt-2 mb-1 text-sm font-light text-gray-800 truncate ${
          isPlaying && "text-primary"
        }`}
      >
        {track.name}
      </Link>
      {/* track artist*/}

      <UserHoverBar user={track.user} />
    </div>
  );
};

export default TrackCard;
