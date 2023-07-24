import React from "react";
import TrackCard from "../../../components/TrackCard";

const FavoriteTrackTab = ({ favorites }) => {
  return (
    <div className="flex flex-row">
      {favorites.map((track, index) => (
        <TrackCard track={track} />
      ))}
    </div>
  );
};

export default FavoriteTrackTab;
