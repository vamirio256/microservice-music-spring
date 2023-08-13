import React, { useEffect, useState } from "react";
import { BiLogoSoundcloud, BiMenuAltLeft } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import TopBarItem from "./TopBarItem";

import { AiOutlineClose } from "react-icons/ai";
import useScreenDimensions from "../../utils/useScreenDimensions";

import UserDropdown from "./dropdowns/UserDropdown";
import MessageDropDown from "./dropdowns/MessageDropDown";
import NotificationDropDown from "./dropdowns/NotificationDropDown";
import MoreDropDown from "./dropdowns/MoreDropDown";
const TopBar = () => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const isDesktop = useScreenDimensions();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [isDesktop]);

  return (
    <div className="sticky flex w-full justify-center items-center bg-[#333] text-sm top-0 z-10 h-11">
      <div className="max-w-[1240px] w-full max-h-11 flex justify-between">
        {/* menu icon mobile */}
        <BiMenuAltLeft
          size={40}
          color="white"
          onClick={() => setOpenMenu(true)}
          className="lg:hidden"
        />

        {/* topbar item menu */}
        <div
          className={`z-max items-center flex flex-col bg-topbar w-[300px]
          ${
            !openMenu && "ml-[-300px]"
          } absolute left-0 top-0 ease-in duration-300 h-[100vh] lg:flex-row lg:w-full lg:h-11 transition-[margin-left] lg:transition-none lg:relative lg:justify-between`}
        >
          {/* close btn */}
          <div className="lg:hidden block ml-auto">
            <AiOutlineClose
              size={30}
              color="white"
              onClick={() => setOpenMenu(false)}
            />
          </div>

          <div className="flex max-h-11 flex-col lg:flex-row w-full z-max">
            <TopBarItem
              setOpenMenu={setOpenMenu}
              icon={<BiLogoSoundcloud color="white" size={50} />}
              label={"Home"}
              to={"/home"}
            />
            <button
              onClick={() => {
                dispatch({ type: "APPEND_NOTIFICATION", icon: "warning" });
              }}
              className="w-full lg:w-auto"
            >
              <TopBarItem label={"Feed"} setOpenMenu={setOpenMenu} />
            </button>
            <TopBarItem
              label={"Library"}
              to={"/library"}
              setOpenMenu={setOpenMenu}
            />
            {/* search */}
            <SearchBar />
            <TopBarItem
              label={<span className="text-[#f50]">Premium</span>}
              setOpenMenu={setOpenMenu}
              to={"/premium"}
            />
            <TopBarItem
              label={"Upload"}
              to={"/upload"}
              setOpenMenu={setOpenMenu}
            />
          </div>
        </div>
        <div className="flex max-h-11 justify-between">
          {/* premium button */}

          <UserDropdown user={user} />
          <NotificationDropDown />
          <MessageDropDown />
          <MoreDropDown />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
