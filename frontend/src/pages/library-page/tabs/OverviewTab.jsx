import React from "react";
import HistoryTab from "./HistoryTab";
import { useSelector } from "react-redux";

const OverviewTab = () => {
  const history = useSelector((state) => state.historyReducer);
  const user = useSelector((state) => state.userReducer);

  return (
    <div>
      {/* history */}
      <div className="grid grid-cols-6 gap-1">
        {!history.length == 0 &&
          history.map((track, index) => (
            <TrackCard track={track} key={index} />
          ))}

        {Array.from({ length: Math.max(0, 6 - history.length) }).map(
          (_, index) => (
            <PlaceholderItem key={index} />
          )
        )}
      </div>

      {/* favorites */}
      <div className="grid grid-cols-6 gap-1">
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
    </div>
  );
};

export default OverviewTab;
