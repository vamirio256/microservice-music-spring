import React, { useState } from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { Link } from "react-router-dom";

const TopBarItem = ({ icon: Icon, label, to, children }) => {
  const [isActive, setIsActive] = useState(false);
  const background_color = !isActive ? "bg-[#333]" : "bg-black";

  return (
    <div className="flex flex-row h-full">
      <Link
        to={to}
        className={`flex px-2 text-slate-300 hover:text-white ${background_color} w-full h-full justify-center items-center px-5`}
      >
        <span className="mr-3">{Icon}</span><span>{label}</span>
      </Link>
    </div>
  );
};

export default TopBarItem;
