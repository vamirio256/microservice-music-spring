import React, { useEffect, useState } from "react";
import TrackCard from "../../../components/track/TrackCard";
import TrackSwiper from "../../../components/track/TrackSwiper";
import { useSelector } from "react-redux";
import PlaceholderItem from "../../../components/placeholder/PlaceholderItem";

const FavoriteTab = () => {
  const favorites = useSelector((state) => state.userReducer.profile.favorites);
  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <>
      <div className="mt-8 mb-4">
        <p>Hear the tracks you've liked:</p>
      </div>
      <div className="grid grid-cols-6 gap-6">
        {!favorites.length == 0 &&
          favorites.map((fav, index) => (
            <TrackCard track={fav.track} key={index} />
          ))}

        {Array.from({
          length: Math.max(0, 6 - favorites.length),
        }).map((_, index) => (
          <PlaceholderItem key={index} />
        ))}
      </div>
    </>
  );
};

export default FavoriteTab;
