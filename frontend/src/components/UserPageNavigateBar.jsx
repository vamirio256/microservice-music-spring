import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom/dist";

const UserPageNavigateBar = () => {
  const pathname = useLocation().pathname;

  const routes = useMemo(() => [
    {
      label: "All",
      active: pathname === "/user",
      href: "/user",
    },
    {
      label: "Tracks",
      active: pathname === "/user/tracks",
      href: "/user/tracks",
    },
    {
      label: "Feed",
      active: pathname === "/user/playlists",
      href: "/user/playlists",
    },
  ]);
  return (
    <div className="px-4 pt-4">
      <div className="flex flex-row only:text-[18px] font-light">
        {routes.map((ele, index) => {
          return (
            <NavigateBarItem
              key={index}
              label={ele.label}
              href={ele.href}
              active={ele.active}
            />
          );
        })}
      </div>
      <hr className="block h-[1px] w-full mt-2" />
    </div>
  );
};

const NavigateBarItem = ({ key, label, href, active }) => {
  const active_style = active
    ? "text-[#f50] border-b-[3px] border-b-[#f50]"
    : "text-black hover:border-b-[3px] border-b-black";
  return (
    <div>
      <Link to={href} className={`${active_style} w-full h-full mr-3 pb-2`}>
        {label}
      </Link>
    </div>
  );
};

export default UserPageNavigateBar;
