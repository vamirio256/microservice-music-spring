import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InteractButton from "../InteractButton";
import Waveform from "../Waveform";
import PlaylistTrackCard from "./PlaylistTrackCard";

const Playlist = ({ playlist }) => {
  // const [playlist, setPlaylist] = useState();
  const [shouldUpdateCurrentPlaying, setShouldUpdateCurrentPlaying] =
    useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState();
  const currentSong = useSelector((state) => state.currentSongReducer);
  const dispatch = useDispatch();

  const playTrack = () => {
    setIsPlaying(true);
  };

  const stopTrack = () => {
    setIsPlaying(false);
  };

  function setQueue() {
    dispatch({ type: "ADD_TO_QUEUE", songs: playlist.tracks });
  }

  function toggleTrack() {
    dispatch({
      type: "CHANGESONG",
      song: {
        ...currentPlaying,
        isPlaying: !isPlaying,
      },
    });
    setQueue();
  }
  useEffect(() => {
    if (
      !currentPlaying ||
      !currentSong ||
      currentPlaying.audioUrl !== currentSong.audioUrl
    ) {
      setIsPlaying(false);
    }
  }, [currentSong]);
  useEffect(() => {
    setCurrentPlaying(playlist.tracks[0]);
  }, [playlist]);

  return (
    <div>
      {playlist && currentPlaying ? (
        <>
          <h1 className="text-xl mb-5">{playlist.name}</h1>

          <div className="flex flex-col justify-center items-center md:flex-row md:items-start">
            <img
              src={currentPlaying.coverUrl}
              className="h-[160px] w-[160px] mr-4 mb-10"
            />
            <div className="w-full flex flex-col">
              <div className="mb-3 flex flex-row justify-between ">
                <div className="flex flex-row items-center">
                  {/* play button */}
                  {!isPlaying ? (
                    <BsFillPlayFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={toggleTrack}
                    />
                  ) : (
                    <BsFillPauseFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={toggleTrack}
                    />
                  )}
                  <div className="ml-3">
                    <h3 className="text-[#999] text-xs cursor-pointer">
                      {currentPlaying.user.username}
                    </h3>
                    <h2 className="text-[14px] cursor-pointer">
                      {playlist.name}
                    </h2>
                  </div>
                </div>
                {/* <p>{playlist.</p> */}
              </div>

              {/* waveform */}
              <Waveform audioUrl={currentPlaying.audioUrl} />

              {/* tracks in playlist */}
              <div className="border-[1px] border-solid mt-3">
                {playlist.tracks.map((track, index) => (
                  <PlaylistTrackCard
                    key={index}
                    track={track}
                    setCurrentPlaying={setCurrentPlaying}
                    playTrack={playTrack}
                    stopTrack={stopTrack}
                    setQueue={setQueue}
                  />
                ))}
              </div>

              <InteractButton />
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
