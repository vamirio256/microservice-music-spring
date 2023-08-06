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
    ${haveText ? "px-2 py-1" : "px-1 py-0.5"}
    ${haveBorder ? "border-[1px] hover:border-[#f50]" : ""}
      h-fit text-xs rounded-sm flex flex-row justify-center item-center 
      ${className}`}
    >
      {isFavorite ? (
        <button onClick={handleRemoveFavorite}>
          <GoHeartFill className="text-[#f50]" />
          {haveText && <div> Like</div>}
        </button>
      ) : (
        <button onClick={handleAddFavorite}>
          <GoHeart />
          {haveText && <div> Like</div>}
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;
