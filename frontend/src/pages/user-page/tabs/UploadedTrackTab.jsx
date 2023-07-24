import React from "react";
import TrackCard from "../../../components/TrackCard";

const UploadedTrackTab = ({ tracks }) => {
  return (
    <div className="flex flex-row">
      {tracks.map((track, index) => (
        <TrackCard track={track} />
      ))}
    </div>
  );
};

export default UploadedTrackTab;
