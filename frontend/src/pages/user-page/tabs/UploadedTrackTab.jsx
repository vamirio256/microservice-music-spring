import React from "react";
import TrackCard from "../../../components/trackcard/TrackCard";

const UploadedTrackTab = ({ tracks }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tracks.map((track, index) => (
        <TrackCard track={track} key={index} />
      ))}
    </div>
  );
};

export default UploadedTrackTab;
