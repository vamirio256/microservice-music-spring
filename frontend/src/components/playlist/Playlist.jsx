import React, { useEffect, useState } from "react";
import PlaylistTrackCard from "./PlaylistTrackCard";
import Waveform from "../Waveform";
import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

const Playlist = () => {
  const [playlist, setPlaylist] = useState();

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
          <h1>Playlist Component</h1>
          <h1>Playlist: {playlist.name}</h1>
          <div className="flex flex-row">
            <img
              src={playlist.tracks[0].coverUrl}
              className="h-[160px] w-[160px] mr-4"
            />
            <div className="w-full">
              <Waveform audioUrl={playlist.tracks[0].audioUrl} />
              <div className="border-[1px] border-solid">
                {playlist.tracks.map((track, index) => (
                  <PlaylistTrackCard
                    key={index}
                    track={track}
                  />
                ))}
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
