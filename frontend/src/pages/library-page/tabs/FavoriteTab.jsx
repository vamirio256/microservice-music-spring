import React from "react";
import TrackCard from "../../../components/track/TrackCard";
import TrackSwiper from "../../../components/track/TrackSwiper";
import { useSelector } from "react-redux";
import PlaceholderItem from "../../../components/placeholder/PlaceholderItem";

const FavoriteTab = () => {
  const user = useSelector((state) => state.userReducer);

  return (
    <>
      <div className="grid grid-cols-6 gap-6">
        {!user.profile.favorites.length == 0 &&
          user.profile.favorites.map((fav, index) => (
            <TrackCard track={fav.track} key={index} />
          ))}

        {Array.from({
          length: Math.max(0, 6 - user.profile.favorites.length),
        }).map((_, index) => (
          <PlaceholderItem key={index} />
        ))}
      </div>
    </>
  );
};

export default FavoriteTab;
