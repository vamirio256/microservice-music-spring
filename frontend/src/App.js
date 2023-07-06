import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./containers/Login";
import UserPage from "./pages/UserPage";
import PlayControl from "./layouts/PlayControl";
import TopBar from "./layouts/TopBar";

function App({children}) {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className="flex flex-col align-middle justify-center">
      <TopBar>{children}</TopBar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        {accessToken ? (
          <Route path="/user" element={<UserPage />} />
        ) : (
          <Route index element={<Navigate to="/login" replace />} />
        )}
        <Route path="*" element={<div>No match</div>} />
      </Routes>
    </div>
  );
}

export default App;
