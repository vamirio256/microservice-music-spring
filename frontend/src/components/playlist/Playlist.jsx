import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InteractButton from "../InteractButton";
import Waveform from "../waveform/Waveform";
import PlaylistTrackCard from "./PlaylistTrackCard";

const Playlist = ({ playlist }) => {
  const [playlistPlaying, setPlaylistPlaying] = useState("");
  const playing = useSelector((state) => state.playing);
  const dispatch = useDispatch();

  const playTrack = () => {
    dispatch({
      type: "PLAY_TRACK",
      track: playlistPlaying.track,
    });
    setPlaylistPlaying({
      ...playlistPlaying,
      isPlaying: true,
    });
  };

  const pauseTrack = () => {
    setPlaylistPlaying({
      ...playlistPlaying,
      isPlaying: false,
    })
  }

  useEffect(() => {
    setPlaylistPlaying({ track: playlist.tracks[0], isPlaying: false });
  }, [playlist]);

  return (
    <div>
      {playlistPlaying ? (
        <>
          <h1 className="text-xl mb-5">{playlist.name}</h1>

          <div className="flex flex-col justify-center items-center md:flex-row md:items-start">
            <img
              src={playlist.tracks[0].coverUrl}
              className="h-[160px] w-[160px] mr-4 mb-10"
            />
            <div className="w-full flex flex-col">
              <div className="mb-3 flex flex-row justify-between ">
                <div className="flex flex-row items-center">
                  {/* play button */}
                  {playlistPlaying.isPlaying ? (
                    <BsFillPlayFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={pauseTrack}
                    />
                  ) : (
                    <BsFillPauseFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={playTrack}
                    />
                  )}
                  <div className="ml-3">
                    <h3 className="text-[#999] text-xs cursor-pointer">
                      {playlistPlaying.track.user.username}
                    </h3>
                    <h2 className="text-[14px] cursor-pointer">
                      {playlist.name}
                    </h2>
                  </div>
                </div>
                {/* <p>{playlist.</p> */}
              </div>

              {/* waveform */}
              <Waveform audioUrl={playlistPlaying.track.audioUrl} />

              {/* tracks in playlist */}
              <div className="border-[1px] border-solid mt-3 h-[100px] overflow-auto">
                {playlist.tracks.map((track, index) => (
                  <PlaylistTrackCard
                    key={index}
                    size={"small"}
                    track={track}
                    playTrack={playTrack}
                    setPlaylistPlaying={setPlaylistPlaying}
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
