import React from "react";
import Playlist from "../../../components/playlist/Playlist";

const PlaylistTab = ({ playlists }) => {
  console.log("playlist tab", playlists);
  return (
    <>
      {playlists ? (
        <div>
          {playlists.map((playlist, index) => (
            <Playlist playlist={playlist} key={index} />
          ))}
        </div>
      ) : (
        <div>
          <p>No playlists available, please add more playlists</p>
        </div>
      )}
    </>
  );
};

export default PlaylistTab;
