import React from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const TopBarItem = ({ icon: Icon, label, active, href }) => {
  const background_color = !active ? "bg-[#333]" : "bg-black";

  return (
    <div className="flex flex-row h-full">
      <Link
        to={href}
        className={`flex px-2 text-slate-300 hover:text-white ${background_color} w-full h-full justify-center items-center px-5`}
      >
        {Icon ? <BiLogoSoundcloud color="white" size={50} /> : label}
      </Link>
    </div>
  );
};

export default TopBarItem;
