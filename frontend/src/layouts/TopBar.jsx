import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import TopBarItem from "../components/TopBarItem";
import { useLocation } from "react-router-dom";

const TopBar = () => {
  const pathname = useLocation().pathname;
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: { pathname } === "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Library",
        active: { pathname } === "/library",
        href: "/library",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: { pathname } === "/search",
        href: "/search",
      },
    ],
    []
  );

  return (
    <div className="flex w-full">
      <div className="hidden md:flex flex-row gap-x-2 bg-[#333] w-full h-[46px] p-2">
        {routes.map((item) => {
          <TopBarItem key={item.label} {...item} />;
        })}
      </div>
    </div>
  );
};

export default TopBar;
