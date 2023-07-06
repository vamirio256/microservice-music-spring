import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const TopBarItem = ({ icon: Icon, label, active, href }) => {
  return (
    <Link
      href={href}
      classname={twMerge(
        `
    flex
    flex-row
    w-auto
    items-center
    h-full
    gap-x-4
    text-md
    font-medium
    cursor-pointer
    hover:text-white
    transition
    text-neutral-400
    px-1
  `,
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default TopBarItem;
