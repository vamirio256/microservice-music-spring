import React, { useEffect, useState } from "react";
import TabNavigateBar from "./TabNavigateBar";
import { Navigate, Route, Routes, useParams } from "react-router-dom/dist";
import UserPageTracks from "./tabs/UploadedTrackTab";
import UploadedTrackTab from "./tabs/UploadedTrackTab";
import PlaylistTab from "./tabs/PlaylistTab";
import FavoriteTrackTab from "./tabs/FavoriteTrackTab";
import { useSelector } from "react-redux";
import { getUserData } from "../../apis/user/getUserData";

const UserPage = () => {
  const [user, setUser] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const getUserDataOnInitial = async () => {
      try {
        const userData = await getUserData(userId);
        setUser(userData);
      } catch (e) {
        console.error(e);
      }
    };
    getUserDataOnInitial();
  }, []);

  return (
    <>
      {user && (
        <>
          <div>
            <div className="h-64 bg-gradient-to-tl from-[#A19793] to-[#827A60] p-7 flex flex-row items-center">
              <img
                src={user.avatarUrl}
                className="rounded-full w-[200px] h-[200px]"
              />
              <h1 className="text-xl text-white bg-black ml-5 cursor-text">{user.username}</h1>
            </div>
          </div>
          <TabNavigateBar userId={userId} className={"px-8 pt-4"} />
          <div className="px-8 pt-4">
          <Routes>
            <Route
              index
              element={<UploadedTrackTab tracks={user.profile.tracks} />}
            />
            <Route
              path="/playlist"
              element={<PlaylistTab playlists={user.profile.playlists} />}
            />
            <Route
              path="/favorite"
              element={<FavoriteTrackTab favorites={user.profile.favorites} />}
            />
          </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default UserPage;
