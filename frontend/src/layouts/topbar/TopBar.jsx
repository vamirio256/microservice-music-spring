import React, { useMemo } from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import TopBarItem from "./TopBarItem";
import SearchBar from "./SearchBar";
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

  return (
    <div className="flex w-full justify-center items-center bg-[#333] text-sm sticky top-0 z-10">
      <div className="w-[1240px]">
        <div className={`container bg-red h-12 flex m-auto items-center`}>
          {leftRoutes.map((ele, index) => {
            return (
              <TopBarItem
                key={index}
                label={ele.label}
                icon={ele.icon}
                href={ele.href}
                active={ele.active}
              />
            );
          })}
          {/* search */}
          <SearchBar />
          {/* premium button */}
          <TopBarItem label={"Try premium pro"}/>

          {rightRoutes.map((ele, index) => {
            return (
              <TopBarItem
                key={index}
                label={ele.label}
                icon={ele.icon}
                href={ele.href}
                active={ele.active}
              />
            );
          })}
          {/* login */}
          <button
            className="text-white rounded-sm border-solid border-[0.5px] border-slate-200 p-1 border-w ml-auto bg-primary"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
