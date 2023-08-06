import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const PlayButton = () => {
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
        <BsFillPlayFill className="text-xl ml-3" />
      ) : (
        <BsFillPauseFill className="text-xl ml-3" />
      )}
    </button>
  );
};

export default PlayButton;
