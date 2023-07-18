import { Route, Routes } from "react-router-dom";

import Login from "./components/modal/Login";
import HomePage from "./pages/home-page/HomePage";

import { useEffect, useState } from "react";
import UnauthenticatedHomePage from "./pages/home-page/UnauthenticatedHomePage";
import MediaControl from "./layouts/media-control/MediaControl";
import TopBar from "./layouts/topbar/TopBar";
import { UploadPage } from "./pages/upload-page/UploadPage";
import UserPage from "./pages/user-page/UserPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <div className="flex flex-col h-[100vh]">
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<UnauthenticatedHomePage setIsAuthenticated={setIsAuthenticated}/>} />
        </Routes>
      ) : (
        <>
          <TopBar />
          <div className="flex justify-center flex-1 bg-[#F2F2F2]">
            <div className="w-[1240px] bg-white pd-8">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/user/*" element={<UserPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>
          </div>
          <MediaControl />
        </>
      )}
    </div>
  );
}

export default App;
