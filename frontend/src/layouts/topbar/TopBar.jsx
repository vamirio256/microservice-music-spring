import React, { useMemo } from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import TopBarItem from "./TopBarItem";
import SearchBar from "./SearchBar";
import { IoLogOut } from "react-icons/io5";

const TopBar = () => {
  const pathname = useLocation().pathname;

  const leftRoutes = useMemo(() => [
    {
      icon: BiLogoSoundcloud,
      active: pathname === "/",
      href: "/",
    },
    {
      label: "Home",
      active: pathname === "/",
      href: "/",
    },
    {
      label: "Feed",
      active: pathname === "/feed",
      href: "/feed",
    },
    {
      label: "Library",
      active: pathname === "/library",
      href: "/library",
    },
  ]);

  const rightRoutes = useMemo(() => [
    {
      label: "For artists",
      active: pathname === "/artist",
      href: "/artist",
    },
    {
      label: "Upload",
      active: pathname === "/upload",
      href: "/upload",
    },
  ]);

  const logout = () =>{
    
    localStorage.removeItem("token");
    window.location.href = '/';
  }

  return (
    <div className="sticky flex w-full justify-center items-center bg-[#333] text-sm top-0 z-10">
      <div className="w-[1240px]">
        <div className={`container bg-red h-12 flex m-auto items-center`}>
          <TopBarItem
            icon={<BiLogoSoundcloud color="white" size={50} />}
            label={"Home"}
          />
          <TopBarItem label={"Feed"} />
          <TopBarItem label={"Library"} />
          {/* search */}
          <SearchBar />
          {/* premium button */}
          <TopBarItem label={"Try premium pro"} />

          <button onClick={logout}>
            <IoLogOut color="white" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
