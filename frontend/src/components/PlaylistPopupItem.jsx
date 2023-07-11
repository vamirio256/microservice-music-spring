import React from "react";
import { BsPlay, BsPlayFill } from "react-icons/bs";

export const PlaylistPopupItem = () => {
  return (
    <div className="mb-2 flex text-sm ml-3 items-center">
      <img
        src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="
        alt=""
        className="w-5 h-5"
      />

      {/* titile */}
      <div className="text-gray-500 pl-5">Ronboogz</div>
      {/* button add to playlist*/}

      <div className="ml-auto flex">
        <button className="outline-button">Add to Playlist</button>
      </div>
    </div>
  );
};
