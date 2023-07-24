import React, { useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { addFavorite } from "../../apis/user/addFavorite";
import { removeFavorite } from "../../apis/user/removeFavorite";

const Favorite = ({ trackId, className }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = () => {
    addFavorite(trackId);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(trackId);
    setIsFavorite(false);
  };

  return (
    <div className={`text-xs ${className}`}>
      {isFavorite ? (
        <button onClick={handleRemoveFavorite}>
          <BsHeartFill className="text-[#f50]" />
        </button>
      ) : (
        <button onClick={handleAddFavorite}>
          <BsHeartFill className="" />
        </button>
      )}
    </div>
  );
};

export default Favorite;
