import React from "react";

const TrackCard = ({ className, track }) => {
  return (
    <div className="flex flex-col sm:w-32 lg:w-44 mx-auto bg-white overflow-hidden text-left">
      {/* Track image */}
      <img src={track.image} alt={track.title} className="w-full h-auto object-contain" />
      {/* Track title */}
      <h2 className="mt-2 mb-1 text-sm font-medium text-gray-800">{track.title}</h2>
      {/* Track artist */}
      <p className="text-xs text-gray-400">{track.artist}</p>
    </div>
  );
};

export default TrackCard;
