import React, { useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { addFavorite } from "../../apis/user/addFavorite";
import { removeFavorite } from "../../apis/user/removeFavorite";

const Favorite = ({ track, className }) => {
  const [isFavorite, setIsFavorite] = useState(
    track ? track.favorite : false
  );
  
  const handleAddFavorite = () => {
    addFavorite(track.id);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(track.id);
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
