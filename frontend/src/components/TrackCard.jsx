import React from "react";

const TrackCard = ({ className, track }) => {
  return (
    <div className="flex flex-col sm:w-32 lg:w-44 mx-auto bg-white overflow-hidden text-left">
      <div className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover">
        <img
          src={track.image}
          alt={track.title}
          className="w-full h-auto object-contain hover:scale-110"
        />
        <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-indigo-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
      </div>
      <h2 className="mt-2 mb-1 text-sm font-medium text-gray-800">
        {track.title}
      </h2>
      <p className="text-xs text-gray-400">{track.artist}</p>
    </div>
  );
};

export default TrackCard;
