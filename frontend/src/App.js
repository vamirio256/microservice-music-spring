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
  
  // const App = () => {
  //   useEffect(() => {
  //     const checkTokenValidity = async () => {
  //       try {
  //         const response = await axios.get('/api/check-token', {
  //           headers: {
  //             Authorization: `Bearer ${yourToken}`,
  //           },
  //         });
  //         // Token is valid, proceed with the application logic
  //       } catch (error) {
  //         // Token is invalid, handle accordingly (e.g., redirect to login page)
  //       }
  //     };
  
  //     checkTokenValidity();
  //   }, []);
  
  //   // Rest of your React application code
  // };

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
