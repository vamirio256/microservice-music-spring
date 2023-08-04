import React, { useState } from "react";
import { formatDuration } from "../../utils/formatDuration";

const PlaybackTimeLine = ({
  progress = 0,
  handleTimeline,
  currentTime,
  duration,
}) => {
  // const [timeline, setTimeline] = useState(0);
  // const handleTimeline = (event) => {
  //   console.log(event.target.value);
  // };

  return (
    <div className="absolute bottom-[-15px] lg:relative lg:bottom-0 left-0 px-2 items-center flex w-full lg:w-[500px] xl:[w-600px] ">
      {/* current time */}
      <div className="text-xs mr-4 text-[#f50]">
        {formatDuration(currentTime.toFixed(0))}
      </div>
      <input
        type="range"
        className={`range-slider mr-2 w-full accent-[#f50] h-[1px] focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 cursor-pointer`}
        style={{
          background: `linear-gradient(to right, #f50 0%, #f50 ${progress}%, #ccc ${progress}%, #ccc 100%)`,
        }}
        min={0}
        max={100}
        value={progress.toString()}
        onChange={(e) => handleTimeline(e)}
      />
      {/* total duration */}
      <p>{formatDuration(duration.toFixed(0))}</p>
    </div>
  );
};

export default PlaybackTimeLine;
