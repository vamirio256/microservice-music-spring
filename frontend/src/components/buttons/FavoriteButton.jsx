import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { addFavorite } from "../../apis/user/addFavorite";
import { removeFavorite } from "../../apis/user/removeFavorite";

const FavoriteButton = ({ track, className, haveBorder, haveText }) => {
  const [isFavorite, setIsFavorite] = useState(track ? track.favorite : false);

  const handleAddFavorite = () => {
    addFavorite(track.id);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(track.id);
    setIsFavorite(false);
  };

  return (
    <div
      title="Like"
      className={`
    ${haveText ? "px-3 py-1" : "px-1 py-0.5"}
    ${haveBorder ? "border-[1px] hover:border-[#f50]" : ""}
    ${isFavorite ? "text-[#f50] border-[#f50]" : ""}
      h-fit w-fit text-xs rounded-[3px] flex flex-row justify-center  items-center max-h-[26px] min-h-[20px] cursor-pointer
      ${className}`}
    >
      {isFavorite ? (
        <button onClick={handleRemoveFavorite} className="flex">
          <GoHeartFill className="text-[#f50] text-[14px]" />
          {haveText && <div className="ml-2">Liked</div>}
        </button>
      ) : (
        <button onClick={handleAddFavorite} className="flex">
          <GoHeartFill className="text-[14px]" />
          {haveText && <div className="ml-2">Like</div>}
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;
