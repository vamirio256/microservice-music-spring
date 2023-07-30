import React from "react";
import TrackCard from "../../../components/trackcard/TrackCard";

const FavoriteTab = ({ favorites }) => {
  return (
    <>
      {favorites.length != 0 ? (
        <div className="flex flex-row">
          {favorites.map((favorite, index) => (
            <TrackCard track={favorite.track} key={index} />
          ))}
        </div>
      ) : (
        <div>This user do not have any favorites yet!</div>
      )}
    </>
  );
};

export default FavoriteTab;
