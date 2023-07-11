import React from "react";
import UserPageNavigateBar from "../components/UserPageNavigateBar";
import { Route, Routes } from "react-router-dom/dist";
import UserPageTracks from "../containers/UserPageTracks";

const UserPage = () => {
  return (
    <>
      <div>
        <div className="h-64 bg-gradient-to-r from-cyan-500 to-blue-500 p-7">
            <div className="bg-gradient-to-tr from-purple-500 to-pink-500 ml-7 h-[200px] w-[200px] rounded-full"/>
        </div>
      </div>
      <UserPageNavigateBar />
      <Routes>
          <Route path="/tracks" element={<UserPageTracks />} />
      </Routes>
    </>
  );
};

const UserPageAll = () => {
    return <div>UserPage</div>
}

export default UserPage;
