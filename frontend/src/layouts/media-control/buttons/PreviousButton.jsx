import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {BsFillSkipStartFill} from "react-icons/bs"

const PreviousButton = ({className}) => {
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.queueReducer);
  const playing = useSelector((state) => state.playingReducer);

  function playPrevious() {
    let index = -1;

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].audioUrl === playing.track.audioUrl) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      return;
    }
    if (index == 0) {
      dispatch({
        type: "PLAY_TRACK",
        track: { ...queue[queue.length - 1] },
      });
    } else {
      dispatch({
        type: "PLAY_TRACK",
        track: { ...queue[index - 1] },
      });
    }
  }

  return (
    <button>
      <BsFillSkipStartFill className={`${className}`} onClick={playPrevious} />
    </button>
  );
};

export default PreviousButton;
