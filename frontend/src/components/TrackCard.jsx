import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

import { MdPlaylistAdd } from "react-icons/md";

const TrackCard = ({ className, track, openModal }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const fetchImage = async () => {
    try {
      const response = await fetch(track.imageUrl,{
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*" 
        },
      });
      const byteArray = await response.arrayBuffer();
      const dataUrl = `data:image/jpeg;base64,${arrayBufferToBase64(
        byteArray
      )}`;
      setImageSrc(dataUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="flex flex-col sm:w-32 lg:w-44 mx-auto bg-white overflow-hidden text-left">
      <div className="group cursor-pointer">
        <div className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover">
          <div className="group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-transparent">
            <img
              src={imageSrc}
              alt={track.title}
              className="w-full h-full object-cover border-[1px] border-[#ccc] duration-300 ease-in-out 
            group-hover:scale-105 group-hover:opacity-80"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/4 h-1/4 overflow-hidden opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 flex justify-center items-center z-10">
              {/* Play button */}
              <a className="rounded-full bg-[#f30]  w-full h-full flex justify-center items-center z-20">
                <FaPlay className="text-white" />
              </a>
            </div>
          </div>
          {/* Favorite button */}
          <FaHeart className="absolute right-7 bottom-2 text-white" />
          {/* add to playlist button */}

          <MdPlaylistAdd
            className="absolute right-2 bottom-2 text-white"
            onClick={openModal}
          />
        </div>
        {/* track title */}
        <h2 className="mt-2 mb-1 text-sm font-light text-gray-800 group-hover:text-black truncate ">
          {track.title}
        </h2>
      </div>
      {/* track artist*/}
      <p className="text-xs font-extralight text-gray-400 truncatel">
        {track.artist}
      </p>
    </div>
  );
};

export default TrackCard;
