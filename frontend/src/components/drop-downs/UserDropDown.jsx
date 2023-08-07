import React, { useState } from "react";
import FollowButton from "../buttons/FollowButton";

const UserDropDown = ({ user }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="bg-white p-5">
      <img src={user.avatarUrl} className="username w-[50px] h-[50px]" />
      <p>{user.username}</p>
      <FollowButton user={user} />
    </div>
  );
};

export default UserDropDown;
