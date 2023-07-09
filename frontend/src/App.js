import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./containers/Login";
import UserPage from "./pages/UserPage";
import PlayControl from "./layouts/PlayControl";
import TopBar from "./layouts/TopBar";
import { UploadPage } from "./pages/UploadPage";

function App({ children }) {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col align-middle items-stretch justify-center">
      <TopBar />
      {/* <PlayControl/> */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadPage />} />

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
