import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const PlaylistTrackCard = ({
  track,
  setCurrentPlaying,
  playTrack,
  stopTrack,
}) => {
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
    setCurrentPlaying(track);
    if (isPlaying) {
      playTrack();
    } else {
      stopTrack();
    }
  }, [isPlaying]);
  useEffect(() => {
    if (!currentSong || currentSong.audioUrl != track.audioUrl) {
      setIsPlaying(false);
    } else {
      setIsPlaying(currentSong.isPlaying);
    }
  }, [currentSong]);

  return (
    <div className="flex flex-row border-solid border-b p-[5px] justify-between hover:bg-[#f2f2f2] cursor-pointer text-xs">
      <div className="flex flex-row">
        <span className="mr-3">
          <img src={track.coverUrl} className="h-[-20px] w-[20px] " />
        </span>
        <span className="mr-2 text-[#999]">{track.user.username}</span>
        <span>&bull;</span>
        <span className="ml-2">{track.name}</span>
      </div>
      <div className="flex flex-row text-[#999] items-center">
        <span>
          {!isPlaying ? (
            <BsFillPlayFill className="transform" onClick={toggleAudio} />
          ) : (
            <BsFillPauseFill
              className="transform"
              size={20}
              onClick={toggleAudio}
            />
          )}
          {/* <BsFillPlayFill className="transform" /> */}
        </span>
        <span>{track.listenedTime}</span>
      </div>
    </div>
  );
};

export default PlaylistTrackCard;
