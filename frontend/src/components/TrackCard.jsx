import React, { useEffect, useState } from "react";
import { BsFillPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const TrackCard = ({
  className,
  title,
  coverUrl,
  artist,
  audioUrl,
  openModal,
}) => {
  const track = {
    title: title,
    coverUrl: coverUrl,
    artist: artist,
    audioUrl: audioUrl,
  };

  // const [audioSrc, setAudioSrc] = useState(audioUrl);

  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = useSelector((state) => state.currentSongReducer);

  const toggleAudio = () => {
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
      // setIsPlaying(false);
    } else {
      dispatch({
        type: "CHANGESONG",
        song: {
          ...track,
          isPlaying: true,
        },
      });
    }
  };

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
              src={coverUrl}
              alt={title}
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
            </div>
          </div>
          {/* Favorite button */}
          <FaHeart className="absolute right-7 bottom-2 text-white" />
          {/* add to playlist button */}

          <MdPlaylistAdd
            className="absolute right-2 bottom-2 text-white"
            onClick={openModal}
          />
        </div>
        {/* track title */}
        <h2
          className={`mt-2 mb-1 text-sm font-light text-gray-800 truncate ${
            isPlaying && "text-primary"
          }`}
        >
          {title}
        </h2>
      </div>
      {/* track artist*/}
      <p className={`text-xs font-extralight text-gray-400 truncate`}>
        {artist}
      </p>
    </div>
  );
};

export default TrackCard;
