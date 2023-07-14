import React, { useState } from "react";
import { BsVolumeDownFill } from "react-icons/bs";

const VolumeControl = ({ VOLUME_MAX, handleVolume }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(100);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div className="flex flex-row justify-center items-center">
        <BsVolumeDownFill className="h-5 w-5 text-black" aria-hidden="true" />
      <input
        type="range"
        className={`mr-2 w-full accent-[#f50] h-[3px] focus:outline-none focus:ring-0 appearance-none transition-colors duration-300`}
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
