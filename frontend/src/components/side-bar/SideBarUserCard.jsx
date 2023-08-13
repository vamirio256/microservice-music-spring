import React, { useState } from "react";
import FollowButton from "../buttons/FollowButton";
import { Link } from "react-router-dom";
import Avatar from "../image/Avatar";

const SideBarUserCard = ({ className, user }) => {
  return (
    <>
      {user && (
        <div className={`w-full flex flex-row ${className}`}>
          <Link to={`/user/${user.id}`} className="min-w-fit">
            <Avatar
              src={user.avatarUrl}
              className="h-[50px] w-[50px] rounded-full"
            />
          </Link>
          <div className="flex flex-row items-center w-full justify-between ml-3">
            <Link to={`/user/${user.id}`} className="username hover:text-black">
              {user.username}
            </Link>
            <FollowButton user={user} haveBorder={true} haveText={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBarUserCard;
