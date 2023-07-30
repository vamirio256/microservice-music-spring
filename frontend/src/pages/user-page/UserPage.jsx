import React, { useEffect, useRef, useState } from "react";
import TabNavigateBar from "./TabNavigateBar";
import { Navigate, Route, Routes, redirect, useNavigate, useParams } from "react-router-dom/dist";
import UserPageTracks from "./tabs/UploadedTrackTab";
import UploadedTrackTab from "./tabs/UploadedTrackTab";
import PlaylistTab from "./tabs/PlaylistTab";
import FavoriteTrackTab from "../library-page/tabs/FavoriteTab";
import { useSelector } from "react-redux";
import { getUserData } from "../../apis/user/getUserData";

const UserPage = () => {
  const [user, setUser] = useState("");
  const { userId } = useParams();
  const [notfound, setNotfound] = useState(false);
  const avatarInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDataOnInitial = async () => {
      try {
        const response = await getUserData(userId);

        if (response.status == 404) {
          navigate("/not-found");
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (e) {
        console.error(e);
      }
    };
    getUserDataOnInitial();
  }, []);

  const handleChangeAvatar = () => {};

  return (
    <>
      {user && (
        <>
          <div>
            <div className="h-64 bg-gradient-to-tl from-[#A19793] to-[#827A60] p-7 flex flex-row items-center">
              <div className="group relative">
                <img
                  src={user.avatarUrl}
                  className="rounded-full w-[200px] h-[200px]"
                />
                <div className="hidden group-hover:block absolute items-center justify-center w-full">
                  <label
                    htmlFor="file-input"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    Choose File
                  </label>
                  <input type="file" id="file-input" className="sr-only" />
                </div>
              </div>
              <h1 className="text-xl text-white bg-black ml-5 cursor-text">
                {user.username}
              </h1>
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
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default UserPage;
