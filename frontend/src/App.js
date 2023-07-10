import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./containers/Login";
import UserPage from "./pages/UserPage";

import TopBar from "./layouts/TopBar";
import { UploadPage } from "./pages/UploadPage";
import MediaControl from "./layouts/MediaControl";

function App({ children }) {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col align-middle items-stretch justify-center">
      <TopBar />
      {/* <PlayControl/> */}
      <MediaControl />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/user" element={<UserPage />} />

        {/* {accessToken ? (
          <Route path="/user" element={<UserPage />} />
        ) : (
          <Route index element={<Navigate to="/login" replace />} />
        )} */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
