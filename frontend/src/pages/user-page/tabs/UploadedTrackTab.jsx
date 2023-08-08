import React from "react";
import TrackCard from "../../../components/track/TrackCard";

const UploadedTrackTab = ({ tracks }) => {
  return (
    <>
      {tracks.length != 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {tracks.map((track, index) => (
            <TrackCard track={track} key={index} />
          ))}
        </div>
      ) : (
        <div>This user haven't upload any track yet</div>
      )}
    </>
  );
};

export default UploadedTrackTab;
