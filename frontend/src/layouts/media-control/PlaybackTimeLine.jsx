import React, { useState } from "react";

const PlaybackTimeLine = ({ progress = 0, handleTimeline }) => {
  // const [timeline, setTimeline] = useState(0);
  // const handleTimeline = (event) => {
  //   console.log(event.target.value);
  // };

  return (
    <div className="flex flex-row justify-center items-center w-[500px]">
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
    </div>
  );
};

export default PlaybackTimeLine;
