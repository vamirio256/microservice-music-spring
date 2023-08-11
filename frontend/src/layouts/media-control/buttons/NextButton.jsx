import React, { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillSkipEndFill } from "react-icons/bs";

const NextButton = forwardRef((props, ref, className) => {
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.queueReducer);
  const playing = useSelector((state) => state.playingReducer);

  useImperativeHandle(ref, () => ({
    playNext() {
      playNext();
    },
  }));
  function playNext() {
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
    if (index == queue.length - 1) {
      if (props.loop !== 2) {
        return;
      }
      dispatch({
        type: "PLAY_TRACK",
        track: { ...queue[0] },
      });
    } else {
      dispatch({
        type: "PLAY_TRACK",
        track: { ...queue[index + 1] },
      });
    }
  }

  return (
    <button>
      <BsFillSkipEndFill className={"text-xl ml-5"} onClick={playNext} />
    </button>
  );
});

export default NextButton;
