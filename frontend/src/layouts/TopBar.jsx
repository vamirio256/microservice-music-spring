import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiLogoSoundcloud, BiSearch, BiSolidSearch } from "react-icons/bi";
import TopBarItem from "../components/TopBarItem";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
const TopBar = () => {
  const pathname = useLocation().pathname;

  const routes = useMemo(() => [
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
      label: "Library",
      active: pathname === "/library",
      href: "/library",
    },
  ]);
  const hr = "w-[0.4px] bg-black h-full";
  return (
    <div className="flex w-full justify-content bg-[#333]">
      <div className={`container bg-red h-12 flex m-auto items-center`}>
        {routes.map((ele, index) => {
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
        <input
          type="text"
          placeholder="Search"
          className="px-2 py-1 w-96 ml-5 h-8 rounded-md focus:outline-none"
        />
        <AiOutlineSearch className="right-6 relative" color="gray" size={20} />
        <button className="text-white rounded-sm border-solid border-[0.5px] border-slate-200 p-1 border-w ml-auto">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default TopBar;
