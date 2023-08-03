import React, { useState } from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const TopBarItem = ({
  icon: Icon,
  label,
  to,
  children,
  classname,
  setOpenMenu,
}) => {
  const location = useLocation();
  const background_color = location.pathname === to ? "bg-black" : "bg-[#333]";

  return (
    <div className="flex flex-row">
      <Link
        to={to}
        className={`flex px-2 text-slate-300 hover:text-white ${background_color} w-full h-full justify-start lg:justify-center items-center px-5 py-3 lg:w-auto ${classname}`}
        onClick={() => setOpenMenu(false)}
      >
        <span className="mr-3 ">{Icon}</span>
        <span>{label}</span>
      </Link>
    </div>
  );
};

export default TopBarItem;
