import React, { useEffect, useState } from "react";
import PlaylistTrackCard from "./PlaylistTrackCard";

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];
        const url = `${process.env.REACT_APP_API_BASE_URL}/playlists/6`;
        console.log(url);
        console.log(token);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        const playlistData = await response.json();
        setPlaylist(playlistData);
        console.log(playlistData);
        console.log(playlist);
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
          <h1>Playlist: {playlist.name}</h1>
          <ul>
            {playlist.tracks.map((track, index) => (
              <PlaylistTrackCard
                key={index}
                coverUrl={track.coverUrl}
                title={track.name}
                artist={track.user.username}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>Loading playlist...</p>
      )}
    </div>
  );
};

export default Playlist;
