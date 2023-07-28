import React, { useState } from "react";
import Follow from "../buttons/Follow";
import { Link } from "react-router-dom";

const SideBarUserCard = ({ className, user }) => {
  return (
    <>
      {user && (
        <div className={`w-full flex flex-row ${className}`}>
          <Link to={`/user/${user.id}`} className="min-w-fit">
            <img
              src={user.avatarUrl}
              className="h-[50px] w-[50px] rounded-full"
            />
          </Link>
          <div className="flex flex-row items-center w-full justify-between ml-3">
            <Link to={`/user/${user.id}`} className="hover:text-black">
              {user.username}
            </Link>
            <Follow user={user}/>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBarUserCard;
