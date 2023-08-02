import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserHoverBar = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(true);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <Link
      to={`/user/${user.id}`}
      className={`text-xs font-extralight text-gray-400 truncate relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Component that triggers the dropdown on hover */}
      <a className="text-xs font-extralight text-gray-400 truncate">
        {user.username}
      </a>

      {/* Dropdown content
      {isDropdownOpen && (
        <div className="absolute flex flex-col bottom-0 left-0 h-32 z-10 bg-white border border-solid items-center justify-center">
          <img src={user.avatarUrl} className="w-[30px] h-[30px] rounded-full" />
          <p>{user.username}</p>
          <button className="bg-[#f50] px-2 py-1 block">Follow</button>
        </div>
      )} */}
    </Link>
  );
};

export default UserHoverBar;
