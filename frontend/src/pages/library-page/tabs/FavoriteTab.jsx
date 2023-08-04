import React from "react";
import TrackCard from "../../../components/trackcard/TrackCard";
import TrackSwiper from "../../../components/trackcard/TrackSwiper";

const FavoriteTab = ({ favorites }) => {
  const favoritePlaylist = {
    name: "Favorite",
    tracks: getTrackFavorites(favorites),
  };
  console.log(favorites);
  function getTrackFavorites(favorites) {
    var arr = [];
    for (const item of favorites) {
      arr.push(item.track);
    }
    return arr;
  }
  return (
    <>
      {favorites.length != 0 ? (
        <TrackSwiper playlist={favoritePlaylist} />
      ) : (
        <div>This user do not have any favorites yet!</div>
      )}
    </>
  );
};

export default FavoriteTab;
