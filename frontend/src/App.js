import { Route, Routes } from "react-router-dom";

import Login from "./components/modal/Login";
import HomePage from "./pages/home-page/HomePage";

import { useEffect, useState } from "react";
import UnauthenticatedHomePage from "./pages/home-page/UnauthenticatedHomePage";
import MediaControl from "./layouts/media-control/MediaControl";
import TopBar from "./layouts/topbar/TopBar";
import { UploadPage } from "./pages/upload-page/UploadPage";
import UserPage from "./pages/user-page/UserPage";
import loading from "./assets/images/soundcloud-loading.gif";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Get the token from localStorage
        const url = `${process.env.REACT_APP_API_BASE_URL}/auth/validate-token`;

        // Make a request to the server to verify the token
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token"))["jwtToken"],
          },
        });

        if (response.ok) {
          // Token is valid
          console.log("Token is valid");
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          console.log("Token is invalid");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setTokenValidated(true);
      }
    };

    checkToken();
  }, []);

  if (!tokenValidated) {
    return <div className="flex items-center justify-center bg-[#FBFBFB] h-screen w-screen">
      <img src={loading} />
    </div>;
  }

  return (
    <div className="flex flex-col h-[100vh]">
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
            <div className="w-[1240px] bg-white pb-8">
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
