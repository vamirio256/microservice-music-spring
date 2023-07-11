import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./containers/Login";

import TopBar from "./layouts/TopBar";
import { UploadPage } from "./pages/UploadPage";
import MediaControl from "./layouts/MediaControl";
import UserPage from "./pages/UserPage";
import UserPageOld from "./pages/UserPageOld";

function App({ children }) {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col h-[100vh]">
      <TopBar />
        <div className="flex justify-center flex-1 bg-[#F2F2F2]">
          <div className="w-[1240px] bg-white pd-8">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/user/*" element={<UserPage />} />

            {/* {accessToken ? (
          <Route path="/user" element={<UserPage />} />
        ) : (
          <Route index element={<Navigate to="/login" replace />} />
        )} */}
            <Route path="*" element={<HomePage />} />
          </Routes>
          </div>
        </div>
      <MediaControl />s
    </div>
  );
}

export default App;
