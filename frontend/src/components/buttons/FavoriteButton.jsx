import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { addFavorite } from "../../apis/user/addFavorite";
import { removeFavorite } from "../../apis/user/removeFavorite";
import { useDispatch, useSelector } from "react-redux";

const FavoriteButton = ({ track, className, haveBorder, haveText }) => {
  const [isFavorite, setIsFavorite] = useState(track ? track.favorite : false);
  const favoriteList = useSelector(
    (state) => state.userReducer.profile.favorites
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(
      favoriteList.findIndex(
        (favoriteTrack) => favoriteTrack.track.id == track.id
      )
    );
  }, [favoriteList]);

  const handleAddFavorite = () => {
    addFavorite(track.id);
    // setIsFavorite(true);
    dispatch({
      type: "ADD_FAVORITE",
      track: track,
    });
    dispatch({
      type: "APPEND_NOTIFICATION",
      name: track.name,
      text: "was saved to your Favorites",
      image: track.coverUrl,
    });
  };

  const handleRemoveFavorite = () => {
    removeFavorite(track.id);
    // setIsFavorite(false);
    dispatch({
      type: "REMOVE_FAVORITE",
      id: track.id,
    });
    dispatch({
      type: "APPEND_NOTIFICATION",
      name: track.name,
      text: "was removed from Favorites",
      image: track.coverUrl,
    });
  };

  return (
    <div
      title="Like"
      className={`${className}
    ${haveText ? "px-3 py-1" : "px-1 py-0.5"}
    ${haveBorder ? "border-[1px] hover:border-[#f50]" : ""}
    ${
      favoriteList.find(
        (favoriteTrack) => favoriteTrack.track.id == track.id
      ) && "text-[#f50] border-[#f50]"
    }
      h-fit w-fit text-xs rounded-[3px] flex flex-row justify-center  items-center max-h-[26px] min-h-[20px] cursor-pointer bg-[#fff] `}
    >
      {favoriteList.find(
        (favoriteTrack) => favoriteTrack.track.id == track.id
      ) ? (
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
