import React, { useEffect, useState } from "react";
import TabNavigateBar from "./TabNavigateBar";
import { Navigate, Route, Routes } from "react-router-dom/dist";
import UserPageTracks from "./tabs/UploadedTrackTab";
import UploadedTrackTab from "./tabs/UploadedTrackTab";
import PlaylistTab from "./tabs/PlaylistTab";
import FavoriteTrackTab from "./tabs/FavoriteTrackTab";
import { useSelector } from "react-redux";

const UserPage = () => {
  const profile = useSelector((state) => state.userReducer.profile);
  const playlists = profile.playlists;
  const tracks = profile.tracks;
  const favorites = profile.favoriteTracks;

  return (
    <>
      <div>
        <div className="h-64 bg-gradient-to-r from-cyan-500 to-blue-500 p-7">
          <div className="bg-gradient-to-tr from-purple-500 to-pink-500 ml-7 h-[200px] w-[200px] rounded-full" />
        </div>
      </div>
      <TabNavigateBar />
      <Routes>
        <Route
          index
          element={<UploadedTrackTab tracks={tracks} />}
        />
        <Route
          path="/playlist"
          element={<PlaylistTab playlists={playlists} />}
        />
        <Route
          path="/favorite"
          element={<FavoriteTrackTab favorites={favorites} />}
        />
      </Routes>
    </>
  );
};

export default UserPage;
