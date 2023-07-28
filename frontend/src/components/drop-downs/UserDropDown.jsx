import React, { useState } from "react";
import Follow from "../buttons/Follow";

const UserDropDown = ({ user }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="bg-white p-5">
      <img src={user.avatarUrl} className="w-[50px] h-[50px]" />
      <p>{user.username}</p>
      <Follow user={user} />
    </div>
  );
};

export default UserDropDown;
