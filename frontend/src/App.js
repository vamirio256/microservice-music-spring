import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home-page/HomePage";

import { useEffect, useState } from "react";
import UnauthenticatedHomePage from "./pages/home-page/UnauthenticatedHomePage";
import MediaControl from "./layouts/media-control/MediaControl";
import TopBar from "./layouts/topbar/TopBar";
import { UploadPage } from "./pages/upload-page/UploadPage";
import UserPage from "./pages/user-page/UserPage";
import loading from "./assets/images/soundcloud-loading.gif";
import { useDispatch } from "react-redux";
import { validateToken } from "./apis/auth/validateToken";
import TrackPage from "./pages/track-page/TrackPage";
import LoginModal from "./components/modals/LoginModal";
import PlaylistModal from "./components/modals/PlaylistModal";
import LibraryPage from "./pages/library-page/LibraryPage";
import NotFoundPage from "./pages/notfound-page/NotFoundPage";
import NotificationList from "./components/notification/NotificationList";
import EditPlaylistModal from "./components/modals/EditPlaylistModal";
import ConfirmModal from "./components/modals/ConfirmModal";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const data = await validateToken();
        if (data) {
          console.log("Token is valid");
          dispatch({ type: "SET_USER", user: data });
          setIsAuthenticated(true);
        } else {
          console.log("Token is invalid");
        }
      } catch (error) {
        // console.error("Error checking token:", error);
      } finally {
        setTokenValidated(true);
      }
    };

    checkToken();
  }, []);

  if (!tokenValidated) {
    return (
      <div className="flex items-center justify-center bg-[#FBFBFB] h-screen w-screen">
        <img src={loading} />
      </div>
    );
  }

  return (
    // <div className="flex flex-col h-[100vh] relative overflow-x-hidden">
    <div
      className="flex flex-col h-full min-h-screen relative"
      id="container_all_page"
    >
      {!isAuthenticated ? (
        <Routes>
          <Route
            path="*"
            element={
              <UnauthenticatedHomePage
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
        </Routes>
      ) : (
        <>
          <TopBar />
          <div className="flex justify-center flex-1 bg-[#F2F2F2]">
            <div className="max-w-[1240px] bg-white pb-8 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/user/:userId/*" element={<UserPage />} />
                <Route path="/library/*" element={<LibraryPage />} />
                <Route path="/track/:trackId" element={<TrackPage />} />
                <Route path="/login" element={<LoginModal />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
          <NotificationList />
          <PlaylistModal />
          <MediaControl />
          <EditPlaylistModal />
          <ConfirmModal />
        </>
      )}
    </div>
  );
}

export default App;
