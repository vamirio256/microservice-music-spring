import React, { useState } from "react";
import { BsVolumeDownFill } from "react-icons/bs";

const VolumeControl = ({ VOLUME_MAX, handleVolume }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isDisplay, setIsDisplay] = useState(false);
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div className="flex flex-row justify-center items-center relative ml-2">
      <BsVolumeDownFill
        className="h-5 w-4 text-black"
        aria-hidden="true"
        onClick={() => setIsDisplay(!isDisplay)}
      />
      <input
        type="range"
        className={`range-slider mr-2  accent-[#f50] h-[1px] focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 cursor-pointer -rotate-90 absolute bottom-[70px] ml-1 w-[100px] lg:w-full lg:rotate-0 lg:relative lg:bottom-0 ${
          isDisplay ? "block" : "hidden"
        } lg:block`}
        style={{
          background: `linear-gradient(to right, #f50 0%, #f50 ${volume}%, #ccc ${volume}%, #ccc 100%)`,
        }}
        min={0}
        max={VOLUME_MAX}
        value={volume}
        onChange={(e) => {
          handleVolume(e);
          handleVolumeChange(e);
        }}
      />
    </div>
  );
};

export default VolumeControl;
