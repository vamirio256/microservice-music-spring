import React from "react";
import TrackCard from "../../../components/trackcard/TrackCard";

const FavoriteTrackTab = ({ favorites }) => {
  return (
    <>
      {favorites && (
        <div className="flex flex-row">
          {favorites.map((track, index) => (
            <TrackCard track={track} key={index}/>
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteTrackTab;
