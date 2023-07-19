import React, { useEffect, useState } from "react";
import PlaylistTrackCard from "./PlaylistTrackCard";
import Waveform from "../Waveform";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsHeartFill,
  BsLink,
  BsShareFill,
  BsThreeDots,
} from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const Playlist = ({title}) => {
  const [playlist, setPlaylist] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const buttonStyle =
    "border-[1px] border-solid px-2 py-1 text-xs rounded-sm hover:border-[#999] flex flex-row item-center mr-2";

  const playTrack = () => {
    setIsPlaying(true);
  };

  const stopTrack = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];
        const url = `${process.env.REACT_APP_API_BASE_URL}/playlists/6`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const playlistData = await response.json();
        setPlaylist(playlistData);
      } catch (error) {
        console.error(
          "An error occurred while retrieving the playlist:",
          error
        );
        // Handle network or other errors
      }
    };
    getPlaylist();
  }, []);

  return (
    <div>
      {playlist ? (
        <>
          <h1 className="text-xl mb-5">{title}</h1>
          <div className="flex flex-row">
            <img
              src={playlist.tracks[0].coverUrl}
              className="h-[160px] w-[160px] mr-4"
            />
            <div className="w-full flex flex-col">
              <div className="mb-3 flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  {/* play button */}
                  {!isPlaying ? (
                    <BsFillPlayFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={playTrack}
                    />
                  ) : (
                    <BsFillPauseFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={stopTrack}
                    />
                  )}
                  <div className="ml-3">
                    <h3 className="text-[#999] text-xs cursor-pointer">
                      {playlist.tracks[0].user.username}
                    </h3>
                    <h2 className="text-[14px] cursor-pointer">
                      {playlist.name}
                    </h2>
                  </div>
                </div>
                {/* <p>{playlist.</p> */}
              </div>

              {/* waveform */}
              <Waveform audioUrl={playlist.tracks[0].audioUrl} />

              {/* tracks in playlist */}
              <div className="border-[1px] border-solid mt-3">
                {playlist.tracks.map((track, index) => (
                  <PlaylistTrackCard key={index} track={track} />
                ))}
              </div>

              {/* interact button */}
              <div className="flex flex row mt-3">
                <button className={`${buttonStyle}`}>
                  <BsHeartFill className="text-[14px]" />
                  <span className="ml-1">Like</span>
                </button>
                <button className={`${buttonStyle}`}>
                  <BsShareFill className="text-[14px]" />
                  <span className="ml-1">Share</span>
                </button>
                <button className={`${buttonStyle}`}>
                  <BsLink className="text-[14px]" />
                  <span className="ml-1">Copy Link</span>
                </button>
                <button className={`${buttonStyle}`}>
                  <MdEdit className="text-[14px]" />
                  <span className="ml-1">Edit</span>
                </button>
                <button className={`${buttonStyle}`}>
                  <BsThreeDots className="text-[14px]" />
                  <span className="ml-1">More</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Playlist;
