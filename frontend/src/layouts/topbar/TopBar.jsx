import React, { useMemo } from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import TopBarItem from "./TopBarItem";
import SearchBar from "./SearchBar";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";

const TopBar = () => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
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

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sticky flex w-full justify-center items-center bg-[#333] text-sm top-0 z-10">
      <div className="w-[1240px]">
        <div
          className={`container bg-red h-12 flex m-auto items-center justify-evenly`}
        >
          <TopBarItem
            icon={<BiLogoSoundcloud color="white" size={50} />}
            label={"Home"}
            to={"/home"}
          />
          <button
            onClick={() => {
              dispatch({ type: "SHOW_NOTIFICATION" });
            }}
          >
            <TopBarItem label={"Feed"} />
          </button>
          <button
            onClick={() => {
              dispatch({ type: "SHOW_NOTIFICATION" });
            }}
          >
            <TopBarItem label={"Library"} />
          </button>
          {/* search */}
          <SearchBar />
          {/* premium button */}
          <button
            onClick={() => {
              dispatch({ type: "SHOW_NOTIFICATION" });
            }}
          >
            <TopBarItem label={"Try premium pro"} />
          </button>
          <button
            onClick={() => {
              dispatch({ type: "SHOW_NOTIFICATION" });
            }}
          >
            <TopBarItem label={"For artists"} />
          </button>
          <TopBarItem
            label={"Nguyễn Quân"}
            to={"/user"}
            icon={
              <div className="bg-gradient-to-tr from-purple-500 to-pink-500 h-[30px] w-[30px] rounded-full" />
            }
          />

          <button onClick={logout}>
            <IoLogOut color="white" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
