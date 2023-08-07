import React, { useState } from "react";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { followUser } from "../../apis/user/followUser";
import { unfollowUser } from "../../apis/user/unfollowUser";

const FollowButton = ({ className, user, haveText, haveBorder }) => {
  const [isFollowed, setIsFollower] = useState(user ? user.following : false);

  const handleFollowUser = () => {
    followUser(user.id);
    setIsFollower(true);
  };

  const handleUnfollowUser = () => {
    unfollowUser(user.id);
    setIsFollower(false);
  };

  return (
    <div
      title="Follow"
      className={`
      ${haveBorder ? "border rounded-[3px]" : ""}
      ${haveText ? "px-3 py-1" : "px-1 py-0.5"}
      ${isFollowed ? "text-[#f50]" : "text-black"}
      first-letter:border-[#f50] text-[11px] flex flex-row items-center cursor-pointer h-fit bg-white
      ${className}`}
      onClick={isFollowed ? handleUnfollowUser : handleFollowUser}
    >
      {isFollowed ? (
        <FaUserCheck className="text-[15px]" />
      ) : (
        <FaUserPlus className="text-[15px]" />
      )}
      {haveText && (
        <span className="ml-2">{`${isFollowed ? "Following" : "Follow"}`}</span>
      )}
    </div>
  );
};

export default FollowButton;
