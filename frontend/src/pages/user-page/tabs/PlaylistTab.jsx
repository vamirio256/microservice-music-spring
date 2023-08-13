import React from "react";
import Playlist from "../../../components/playlist/Playlist";
import { useSelector } from "react-redux";
import empty_playlist from "../../../assets/images/empty/empty_playlist.png"

const PlaylistTab = ({ playlists, user }) => {
  const currentUser = useSelector((state) => state.userReducer);

  return (
    <>
      {playlists.length != 0 ? (
        <div>
          {playlists.map((playlist, index) => (
            <Playlist playlist={playlist} key={index} />
          ))}
        </div>
      ) : (
        <div className="h-2/3 w-full flex justify-center items-center flex-col">
          <img src={empty_playlist} alt="empty track" className="w-[240px] " />
          {currentUser.id !== user.id ? (
            <>
              <h2 className="mt-6 text-[18px]">
                {user.username} hasn’t created any playlists yet.
              </h2>
            </>
          ) : (
            <>
              <h2 className="mt-6 mb-2 text-[18px]">
                Seem a little quiet over here
              </h2>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PlaylistTab;
