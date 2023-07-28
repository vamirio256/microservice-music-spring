import React from "react";
import TrackCard from "../../../components/trackcard/TrackCard";

const FavoriteTrackTab = ({ favorites }) => {
  return (
    <>
      {favorites ? (
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

export default FavoriteTrackTab;
