import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const PlayButton = ({className}) => {
  const playing = useSelector((state) => state.playingReducer);
  const dispatch = useDispatch();

  const playTrack = () => {
    dispatch({
      type: "PLAY_TRACK",
      track: playing.track,
    });
  };

  return (
    <button onClick={playTrack}>
      {!playing.isPlaying ? (
        <BsFillPlayFill className={`${className}`} />
      ) : (
        <BsFillPauseFill className={`${className}`} />
      )}
    </button>
  );
};

export default PlayButton;
