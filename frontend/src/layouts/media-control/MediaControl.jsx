import React, { useState } from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillPauseFill,
} from "react-icons/bs";
import image from "../../images/temp_track_cover.jfif"

const MediaControl = () => {
  const [isPLaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState({
    image: image,
    artist: "Related tracks",
    title: "SSK - Nhat Ky Ngoai Tu",
  });
  const toggleIsPlaying = () => {
    setIsPlaying(!isPLaying);
  };

  const style = ""
  return (
    <div className="fixed bottom-0 w-full h-[48px] z-10 bg-[#f2f2f2] border border-t text-xs">
      <div className="w-[1240px] flex flex-row justify-center items-center">
        <div className="flex flex-row">
        <BsFillSkipStartFill className={`${style}`}/>
        <BsFillPauseFill />
        <BsFillSkipEndFill />
        </div>
        <div className="flex flex-row">
            <img src={track.image} className="h-[30px] w-[30px]" />
            <div>
               <p>{track.title}</p> 
               <p>{track.artist}</p> 
            </div>
        </div>
      </div>
    </div>
  );
};

export default MediaControl;
