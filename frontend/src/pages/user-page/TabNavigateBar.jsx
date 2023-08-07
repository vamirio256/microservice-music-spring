import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom/dist";

const TabNavigateBar = ({ className, userId }) => {
  return (
    <div className={`${className}`}>
      <div className="flex flex-row text-[18px] font-normal tracking-[-0.03em]">
        <NavigateBarItem label={"Uploaded Tracks"} to={`/user/${userId}`} />
        <NavigateBarItem label={"Playlists"} to={`/user/${userId}/playlist`} />
      </div>
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
    <div >
      <Link to={to} className={`${active_style} w-full h-full mr-3 pb-2`}>
        <span>{label}</span>
      </Link>
    </div>
  );
};

export default TabNavigateBar;
