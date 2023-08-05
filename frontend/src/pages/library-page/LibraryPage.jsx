import React, { useEffect, useState } from "react";
import TabNavigateBar from "./TabNavigateBar";
import { Route, Routes } from "react-router-dom";
import { getUserData } from "../../apis/user/getUserData";
import { useSelector } from "react-redux";
import PlaylistTab from "./tabs/PlaylistTab";
import HistoryTab from "./tabs/HistoryTab";
import FavoriteTab from "./tabs/FavoriteTab";
import loading_gif from "../../assets/icons/loading.gif";
const LibraryPage = () => {
  const [user, setUser] = useState("");
  const userId = useSelector((state) => state.userReducer.id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserDataOnInitial = async () => {
      try {
        const response = await getUserData(userId);
        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    getUserDataOnInitial();
  }, []);

  return (
    <>
      {loading ? (
        <img src={loading_gif} alt="" className="block m-auto" /> // Show a loading indicator when loading is true
      ) : (
        <div className="px-8 pt-4">
          <TabNavigateBar />
          {user && (
            <Routes>
              <Route index element={<HistoryTab />} />
              <Route
                path="/playlist"
                element={<PlaylistTab playlists={user.profile.playlists} />}
              />
              <Route
                path="/favorite"
                element={<FavoriteTab favorites={user.profile.favorites} />}
              />
            </Routes>
          )}
        </div>
      )}
    </>
  );
};

export default LibraryPage;
