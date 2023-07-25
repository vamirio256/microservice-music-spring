import React, { useState } from "react";

const UserHoverBar = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Component that triggers the dropdown on hover */}
      <button className="text-xs font-extralight text-gray-400 truncate">
        {user.username}
      </button>

      {/* Dropdown content */}
      {isDropdownOpen && (
        <div className="absolute block top-0 left-0 h-32 z-max bg-white border border-solid">
          <p>{user.username}</p>
          <button className="bg-[#f50] px-2 py-1 block">Follow</button>
        </div>
      )}
    </div>
  );
};

export default UserHoverBar;
