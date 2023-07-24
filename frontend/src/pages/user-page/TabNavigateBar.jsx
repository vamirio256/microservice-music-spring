import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom/dist";

const TabNavigateBar = () => {
  return (
    <div className="px-4 pt-4">
      <div className="flex flex-row only:text-[18px] font-light">
        <NavigateBarItem label={"Uploaded Tracks"} to={"/user"} />
        <NavigateBarItem label={"Playlists"} to={"/user/playlist"} />
        <NavigateBarItem label={"Favorites"} to={"/user/favorite"} />
      </div>
      <hr className="block h-[1px] w-full mt-2" />
    </div>
  );
};

const NavigateBarItem = ({ label, to }) => {
  const location = useLocation();
  const active_style =
    location.pathname === to
      ? "text-[#f50] border-b-[3px] border-b-[#f50]"
      : "text-black hover:border-b-[3px] border-b-black";

  return (
    <div>
      <Link to={to} className={`${active_style} w-full h-full mr-3 pb-2`}>
        <span>{label}</span>
      </Link>
    </div>
  );
};

export default TabNavigateBar;
