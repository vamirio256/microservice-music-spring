import React, { useEffect, useRef, useState } from "react";
import { AiTwotoneSwitcher } from "react-icons/ai";
import {
  BsFillPeopleFill,
  BsFillPersonFill,
  BsSoundwave,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const UserDropdown = ({ className, user }) => {
  const itemStyle = "flex items-center py-2 pl-2 pr-4 hover:bg-hoverColor";
  const [isShowed, setIsShowed] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsShowed(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setIsShowed(false);
      }
    };

    if (isShowed) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isShowed]);

  return (
    <div
      className={`${
        isShowed && "bg-black"
      } pl-3 relative flex items-center ${className}`}
      ref={dropdownRef}
    >
      <div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsShowed(!isShowed)}
        >
          <img
            src={user.avatarUrl}
            className="rounded-full w-[26px] h-[26px] mr-2"
          />
          <RiArrowDropDownLine color="white" size={25} />
        </div>
        {isShowed && (
          <div
            className="absolute border-b border-x border-[#ccc] top-11 left-0 flex flex-col w-[135px]  bg-white rounded-b-sm font-normal text-xs"
            onClick={() => setIsShowed(false)}
          >
            <Link className={itemStyle} to={`/user/${user.id}`}>
              <BsFillPersonFill className="text-sm mr-2" />
              <span>Profiles</span>
            </Link>
            <Link className={itemStyle} to={"/library/favorite"}>
              <FaHeart className="text-sm mr-2" />
              <span>Likes</span>
            </Link>
            <Link className={itemStyle} to={"/library/playlist"}>
              <AiTwotoneSwitcher className="text-sm mr-2" />
              <span>PlayLists</span>
            </Link>
            <Link className={itemStyle}>
              <BsFillPeopleFill className="text-sm mr-2" />
              <span>Following</span>
            </Link>
            <Link className={itemStyle} to={`/user/${user.id}`}>
              <BsSoundwave className="text-[15px] mr-2" />
              <span>Tracks</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
