import React, { useMemo, useState } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import TopBarItem from "../components/TopBarItem";
import { useLocation } from "react-router-dom";
import Login from "../containers/Login";

const TopBar = () => {
  const [loginModal, setLoginModal] = useState(false);

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

  const toggleModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <div className="flex w-full flex-row">
      {/* <div className="hidden md:flex flex-row gap-x-2 bg-[#333] w-full h-[46px] p-2">
        {routes.map((item) => {
          <TopBarItem key={item.label} {...item} />;
        })}
      </div> */}
      <button className="h-full w-30" onClick={toggleModal}>Login</button>
      {loginModal && <Login toggleModal={toggleModal} />}
    </div>
  );
};

export default TopBar;
