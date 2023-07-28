import React, { useEffect, useState } from "react";
import { BsFillPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "../buttons/Favorite";
import PlaylistPopup from "../modals/PlaylistModal";
import { Link } from "react-router-dom";
import UserHoverBar from "./UserHoverBar";
import PlaylistModal from "../modals/PlaylistModal";

const TrackCard = ({ className, track }) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const openModal = () => {
    return;
  };
  const currentSong = useSelector((state) => state.currentSongReducer);
  const queue = useSelector((state) => state.queueReducer);
  const toggleAudio = () => {
    // set music and set play
    if (isPlaying) {
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
      // add to queue if songs not include
      if (!queue.find((item) => item.audioUrl === track.audioUrl)) {
        dispatch({ type: "ADD_TO_QUEUE", songs: [track] });
      }
    }
  };

  function openPlaylistModel() {
    dispatch({ type: "OPEN_MODAL_PLAYLIST", track: track });
  }

  useEffect(() => {
    if (!currentSong || currentSong.audioUrl != track.audioUrl) {
      setIsPlaying(false);
    } else {
      setIsPlaying(currentSong.isPlaying);
    }
  }, [currentSong]);

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
              className={`w-full h-full object-cover border-[1px] border-[#ccc] duration-300 ease-in-out 
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
                onClick={toggleAudio}
              >
                {/* play btn */}

                {!isPlaying ? (
                  <FaPlay className="text-white" />
                ) : (
                  <BsFillPauseFill className="text-white" size={20} />
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
                onClick={openPlaylistModel}
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
      <Link
        to={`/user/${track.user.id}`}
        className={`text-xs font-extralight text-gray-400 truncate`}
      >
        <UserHoverBar user={track.user} />
      </Link>
    </div>
  );
};

export default TrackCard;
