import React, { useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { addFavorite } from "../../apis/user/addFavorite";
import { removeFavorite } from "../../apis/user/removeFavorite";
import { AiOutlineHeart } from "react-icons/ai";

const Favorite = ({ track, className, haveBorder, haveText }) => {
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
    <div title="Like" className={`text-xs ${className}`}>
      {isFavorite ? (
        <button
          onClick={handleRemoveFavorite}
          className={haveBorder && `border border-solid border-[#f50]`}
        >
          <BsHeartFill className="text-[#f50]" />
          {haveText && <div> Like</div>}
        </button>
      ) : (
        <button
          onClick={handleAddFavorite}
          className={haveBorder && `border border-solid`}
        >
          <AiOutlineHeart />

          {haveText && <div> Like</div>}
        </button>
      )}
    </div>
  );
};

export default Favorite;
