import React, { useState } from "react";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { followUser } from "../../apis/user/followUser";
import { unfollowUser } from "../../apis/user/unfollowUser";

const Follow = ({ user }) => {
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
    <>
      {isFollowed ? (
        <button
          className="border-[#f50] border rounded-sm text-[#f50] px-2 py-1 text-[11px] flex flex-row items-center"
          onClick={handleUnfollowUser}
        >
          <FaUserCheck />
          <span className="ml-2">Following</span>
        </button>
      ) : (
        <button
          className="border-solid hover:border-black border rounded-sm text-black px-2 py-1 text-[11px] flex flex-row items-center"
          onClick={handleFollowUser}
        >
          <FaUserPlus />
          <span className="ml-2">Follow</span>
        </button>
      )}
    </>
  );
};

export default Follow;
