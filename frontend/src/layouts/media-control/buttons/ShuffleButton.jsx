import React, { useState } from "react";
import { BsShuffle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const ShuffleButton = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [queueBeforeShuffle, setQueueBeforeShuffle] = useState([]);

  const dispatch = useDispatch();
  const queue = useSelector((state) => state.queueReducer);
  const playingTrack = useSelector((state) => state.playingReducer.track);

  const toggleIsFocused = () => {
    if (!isFocused) {
      setQueueBeforeShuffle(queue); // Store the current queue before shuffling
      dispatch({
        type: "SHUFFLE_QUEUE",
        playingTrack: playingTrack,
      });
      setIsFocused(true);
    } else {
      dispatch({
        type: "SET_QUEUE",
        tracks: queueBeforeShuffle, // Restore the original queue
      });
      setIsFocused(false);
    }
  };

  return (
    <button onClick={toggleIsFocused}>
      <BsShuffle className={`text-xl ml-3 ${isFocused && "text-primary"}`} />
    </button>
  );
};

export default ShuffleButton;
