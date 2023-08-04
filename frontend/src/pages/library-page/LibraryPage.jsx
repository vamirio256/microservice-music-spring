import React, { useEffect, useState } from "react";
import TabNavigateBar from "./TabNavigateBar";
import { Route, Routes } from "react-router-dom";
import { getUserData } from "../../apis/user/getUserData";
import { useSelector } from "react-redux";
import PlaylistTab from "./tabs/PlaylistTab";
import HistoryTab from "./tabs/HistoryTab";
import FavoriteTab from "./tabs/FavoriteTab";

const LibraryPage = () => {
  const [user, setUser] = useState("");
  const userId = useSelector((state) => state.userReducer.id);
  useEffect(() => {
    const getUserDataOnInitial = async () => {
      try {
        const response = await getUserData(userId);
        const userData = await response.json();
        setUser(userData);
      } catch (e) {
        console.error(e);
      }
    };
    getUserDataOnInitial();
  }, []);

  return (
    <>
      <div className="px-8 pt-4">
        <HistoryTab />
        <TabNavigateBar />
        {user && (
          <Routes>
            <Route index element={<HistoryTab />} />
            {/* <Route
              path="/playlist"
              element={<PlaylistTab playlists={user.profile.playlists} />}
            />
            <Route
              path="/favorite"
              element={<FavoriteTab favorites={user.profile.favorites} />}
            /> */}
          </Routes>
        )}
      </div>
    </>
  );
};

export default LibraryPage;
