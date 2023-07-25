import React, { useState } from "react";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

const Follow = ({ id }) => {
  const [isFollowed, setIsFollower] = useState(false);

  const followUser = () => {
    setIsFollower(true);
  };

  const unfollowUser = () => {
    setIsFollower(false);
  };

  return (
    <>
      {isFollowed ? (
        <button
          className="border-[#f50] border rounded-sm text-[#f50] px-2 py-1 text-[11px] flex flex-row items-center"
          onClick={unfollowUser}
        >
          <FaUserCheck />
          <span className="ml-2">Following</span>
        </button>
      ) : (
        <button
          className="border-black border rounded-sm text-black px-2 py-1 text-[11px] flex flex-row items-center"
          onClick={followUser}
        >
          <FaUserPlus />
          <span className="ml-2">Follow</span>
        </button>
      )}
    </>
  );
};

export default Follow;
